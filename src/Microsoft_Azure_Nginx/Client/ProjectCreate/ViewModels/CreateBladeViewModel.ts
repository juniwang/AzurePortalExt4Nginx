// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import { Container } from "Fx/Composition/Pdl/Blade";
import * as Constants from "Constants";
import * as ProjectCreateArea from "ProjectCreate/ProjectCreateArea";
import * as Strings from "ProjectStrings";
import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import { Content } from "_generated/Svg";
import { SymmetricForm } from "Shared/PCV3Form";
import { checkNameAvailability } from "Shared/ARMRest";
import * as SubscriptionDropDown from "Fx/Controls/SubscriptionDropDown";
import * as ResourceGroupDropDown from "Fx/Controls/ResourceGroupDropDown";
import * as LocationDropDown from "Fx/Controls/LocationDropDown";

import FxAzure = MsPortalFx.Azure;
import FxVm = MsPortalFx.ViewModels;
import Def = ExtensionDefinition.ViewModels.ProjectCreate.CreateBladeViewModel;
import Arm = FxAzure.ResourceManager;
import Forms = FxVm.Forms;

import CreateModel = ProjectCreate.DataModels.Create;

const log = Logger("CreateProjectBlade");

export class CreateBladeViewModel
    extends SymmetricForm<CreateModel, Untyped>
    implements Def.Contract {

    public armProvisioner: Arm.Provisioner<CreateModel>;

    private readonly _subscriptionId = ko.observable<string>();
    private readonly _initialSubscriptionId = ko.observable<string>();
    private readonly _initialLocation = ko.observable<string>();

    private _nameTextBox: Forms.TextBox.ViewModel;
    private _subscriptionsDropDown: SubscriptionDropDown.Contract;
    private _resourceGroupDropDown: ResourceGroupDropDown.Contract;
    private _locationsDropDown: LocationDropDown.Contract;

    constructor(container: Container, initialState: Untyped, dataContext: ProjectCreateArea.DataContext) {
        super(container,
            _ => (incoming) => {
                const config = this.armProvisioner.armProvisioningConfig;
                log.debug(incoming, config);
                this._initialSubscriptionId(config.galleryCreateOptions.subscriptionId);
                this._initialLocation(config.galleryCreateOptions.resourceGroupLocation);
                const model: CreateModel = {
                    name: ko.observable<string>(),
                    subscription: ko.observable<SubscriptionDropDown.Subscription>({
                        authorizationSource: null,
                        displayName: config.galleryCreateOptions.subscriptionId,
                        state: null,
                        subscriptionId: config.galleryCreateOptions.subscriptionId,
                        subscriptionPolicies: null,
                        tenantId: null,
                        uniqueDisplayName: null,
                    }),
                    resourceGroup: ko.observable({
                        value: {
                            name: config.galleryCreateOptions.resourceGroupName,
                            location: config.galleryCreateOptions.resourceGroupLocation,
                            provisioningState: null,
                        },
                        mode: (config.galleryCreateOptions.resourceGroupName ? 1 : 0) as ProjectCreate.DataModels.ResourceGroupMode, // TODO: WTF???
                    }),
                    location: ko.observable<FxAzure.Location>({
                        name: config.galleryCreateOptions.resourceGroupLocation,
                        displayName: config.galleryCreateOptions.resourceGroupLocationDisplayName,
                        latitude: null,
                        longitude: null,
                    }),
                };
                return model;
            },
            _ => outgoing => {
                return outgoing;
            },
            new FxVm.ActionBars.CreateActionBar.ViewModel(container, { hideActionBar: false }));
        //set blade titles and icons
        this.title(Strings.AssetTypeNames.Project.singular);
        this.subtitle(Strings.AssetTypeNames.Project.singular);
        this.icon(Content.SVG.project);

        this.armProvisioner = new Arm.Provisioner<CreateModel>(container, initialState, {
            // This is where we supply the ARM provisioner with the template deployment options
            // required by the deployment operation.
            supplyTemplateDeploymentOptions: this._supplyProvisioningPromise.bind(this),

            // Supplying an action bar and a parameter provider allows for automatic provisioning.
            actionBar: this.actionBar,
            parameterProvider: this.parameterProvider
        });

        // Initialize the form fields.
        this._initializeFormFields(container, initialState);
    }

    private _initializeFormFields(container: Container, initialState?: Untyped): void {
        this._nameTextBox = new Forms.TextBox.ViewModel(
            container,
            this,
            this.createEditScopeAccessor(p => p.name),
            {
                label: ko.observable(Strings.projectName),
                emptyValueText: ko.observable(Strings.enterTheName),
                validations: ko.observableArray([
                    new FxVm.RequiredValidation(Strings.projectNameRequired),
                    new FxVm.LengthRangeValidation(5, 60),
                    new FxVm.RegExMatchValidation("^[a-zA-Z0-9]+-*[a-zA-Z0-9]+$", Strings.projectNameAlphaNumeric),
                    new FxVm.CustomValidation("NAME VALIDATION BROKEN", name => this._isProjectNameAvailable(name)),
                ]),
            });

        this._nameTextBox.delayValidationTimeout(500);
        this._nameTextBox.valueUpdateTrigger = FxVm.Controls.ValueUpdateTrigger.Blur;

        // The subscription drop down.
        this._subscriptionsDropDown = SubscriptionDropDown.create(container, {
            initialSubscriptionId: this._initialSubscriptionId,
            resourceProviders: Constants.resourceProviderDependencies,
            validations: ko.observableArray([
                new FxVm.RequiredValidation(Strings.selectSubscription),
            ]),
            value: this.createEditScopeAccessor(d => d.subscription).getEditableObservable(container),
        });
        ko.pureComputed(() => {
            const val = this._subscriptionsDropDown.value();
            return val && val.subscriptionId;
        }).subscribeAndRun(container, nv => this._subscriptionId(nv));

        const armPermissionValidation = new FxAzure.RequiredPermissionsValidator(value => {
            const resourceGroupFromDropDown = this._resourceGroupDropDown && this._resourceGroupDropDown.value();
            const resourceGroup = resourceGroupFromDropDown && resourceGroupFromDropDown.value;

            if (!resourceGroup || !resourceGroup.name) {
                return Q(undefined);
            }

            const resourceId = `/subscriptions/${this._subscriptionId()}/resourceGroups/${resourceGroup.name}`;
            return Q({
                entityId: resourceId,
                actions: [], // TODO: add some actions
            });
        });

        // The resource group drop down.
        this._resourceGroupDropDown = ResourceGroupDropDown.create(container, {
            subscriptionId: this._subscriptionId,
            validations: ko.observableArray([
                new FxVm.RequiredValidation(Strings.selectResourceGroup),
                armPermissionValidation,
            ]),
            value: this.createEditScopeAccessor(d => d.resourceGroup).getEditableObservable(container),
        });

        // Subscribe to resource group changes to update the location drop down with the resource group location.
        this._resourceGroupDropDown.value.subscribe(container, (resourceGroup) => {
            if (this._locationsDropDown) { // Make sure it's initialized.
                const resourceGroupLocation = resourceGroup && resourceGroup.value && resourceGroup.value.location;

                // Try to find the resource group location in the locations list.
                const location = this._locationsDropDown.fetchedValues().first(item => {
                    return item.name === resourceGroupLocation;
                });

                // Since the location dropdown is filtering locations based on subscription and resource type,
                // the list will only contain allowed locations. If the resource group location doesn't exist
                // in the list, then it is not an allowed location, hence shouldn’t be selected. So set the
                // new location only if it's allowed.
                if (location) {
                    this._locationsDropDown.value(location);
                }
            }
        });

        // The locations drop down.
        this._locationsDropDown = LocationDropDown.create(container, {
            initialLocationName: this._initialLocation,
            value: this.createEditScopeAccessor(d => d.location).getEditableObservable(container),
            subscriptionId: this._subscriptionId,
            validations: ko.observableArray([
                new FxVm.RequiredValidation(Strings.selectLocation),
            ]),
            resourceTypes: [Constants.projectResourceType],
        });

        this.formElements([
            this._nameTextBox,
            // Also add the selector fields for the pickers.
            this._subscriptionsDropDown as Magic,
            this._resourceGroupDropDown,
            this._locationsDropDown,
        ]);
    }

    // This is where we supply the ARM provisioner with the template deployment options required
    // by the deployment operation.
    private _supplyProvisioningPromise(data: CreateModel): PromiseV<Arm.TemplateDeploymentOptions> {
        const name = data.name();
        if (!name) {
            return Q.reject("Project name not specified"); // This should never happen, unless client-side validation of project name is broken
        }

        const galleryCreateOptions = this.armProvisioner.armProvisioningConfig && this.armProvisioner.armProvisioningConfig.galleryCreateOptions;
        const subscriptionId = data.subscription().subscriptionId;
        const resourceGroupName = this._resourceGroupDropDown.value().value.name;
        const location = data.location().name;

        const parameters: StringMap<string> = {
            projectName: name,
            location: location,
        };

        // Fill out the template deployment options.
        return Q({
            subscriptionId: subscriptionId,
            resourceGroupName: resourceGroupName,
            resourceGroupLocation: this._resourceGroupDropDown.value().mode === ResourceGroupDropDown.Mode.CreateNew ? location : this._resourceGroupDropDown.value().value.location,
            parameters: parameters,
            deploymentName: galleryCreateOptions.deploymentName,
            resourceProviders: Constants.resourceProviderDependencies,
            resourceId: `/subscriptions/${subscriptionId}/resourcegroups/${resourceGroupName}/providers/${Constants.projectResourceType}/${name}`,
            templateJson: this._getResourceTemplateJson(),
            //templateLinkUri: galleryCreateOptions.deploymentTemplateFileUris["ProjectTemplate"], // doesn't work for localhost
        });
    }

    private _getResourceTemplateJson(): string {
        return JSON.stringify({
            $schema: "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            contentVersion: "1.0.0.0",
            parameters: {
                projectName: {
                    type: "string"
                },
                location: {
                    type: "string"
                }
            },
            variables: {
                registryName: "[concat('acr', uniqueString(parameters('projectName'), resourceGroup().id))]",
                storageAccountName: "[concat('acrstorage', uniqueString(parameters('projectName'), resourceGroup().id))]"
            },
            resources: [
                {
                    type: "Microsoft.Storage/storageAccounts",
                    name: "[variables('storageAccountName')]",
                    apiVersion: "2016-01-01",
                    location: "[parameters('location')]",
                    tags: {
                        displayName: "[concat('Container registry storage for ', parameters('projectName'))]",
                        "container.registry": "[variables('registryName')]",
                        project: "[parameters('projectName')]"
                    },
                    sku: {
                        name: "Standard_LRS"
                    },
                    kind: "Storage"
                },
                {
                    type: "Microsoft.ContainerRegistry/registries",
                    name: "[variables('registryName')]",
                    apiVersion: "2017-03-01",
                    location: "[parameters('location')]",
                    sku: {
                        name: "Basic"
                    },
                    dependsOn: [
                        "[resourceId('Microsoft.Storage/storageAccounts', variables('storageAccountName'))]"
                    ],
                    tags: {
                        displayName: "[concat('Container registry for ', parameters('projectName'))]",
                        "container.registry": "[variables('registryName')]",
                        project: "[parameters('projectName')]"
                    },
                    properties: {
                        adminUserEnabled: true,
                        storageAccount: {
                            accessKey: "[listKeys(variables('storageAccountName'), '2016-01-01').keys[0].value]",
                            name: "[variables('storageAccountName')]"
                        }
                    }
                },
                {
                    type: "Microsoft.Nginx/nginx",
                    name: "[parameters('projectName')]",
                    apiVersion: "2014-04-01-preview",
                    location: "[parameters('location')]",
                    properties: {
                        containerRegistryId: "[resourceId('Microsoft.ContainerRegistry/registries', variables('registryName'))]",
                        containerRegistryUrl: "[reference(variables('registryName'), '2017-03-01').loginServer]",
                        containerRegistryLocation: "[parameters('location')]",
                        containerRegistryUsername: "[listCredentials(variables('registryName'), '2017-03-01').username]",
                        containerRegistryPassword: "[listCredentials(variables('registryName'), '2017-03-01').passwords[0].value]"
                    },
                    sku: {
                        name: "Basic",
                        tier: "Basic"
                    }
                }
            ]
        });
    }

    private _isProjectNameAvailable(name: string): PromiseV<FxVm.ValidationResult> {
        const deferred = Q.defer<FxVm.ValidationResult>();
        checkNameAvailability(this._subscriptionId(), Constants.resourceProvider, Constants.projectType, Constants.apiVersion, name).then(
            () => deferred.resolve({
                valid: true,
                message: undefined,
            }),
            (error: Untyped) => deferred.resolve({
                valid: false,
                message: (typeof error === stringType ? error as string : JSON.stringify(error)) || Strings.projectNameNotAvailable,
            }));
        return deferred.promise;
    }
}
