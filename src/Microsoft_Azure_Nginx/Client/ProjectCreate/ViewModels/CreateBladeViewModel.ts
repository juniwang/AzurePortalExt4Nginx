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
import * as DropDown from "Fx/Controls/DropDown";

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
    private _nginxVersionDropDown: DropDown.Contract<string>;
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
                    nginxVersion: ko.observable<string>(),
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
                console.log("incoming");
                console.log(model);
                return model;
            },
            _ => outgoing => {
                console.log("outgoing");
                console.log(outgoing);
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
                    //new FxVm.CustomValidation("NAME VALIDATION BROKEN", name => this._isProjectNameAvailable(name)),
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

        this._nginxVersionDropDown = DropDown.create<string>(container,
            <DropDown.Options<string>>{
                label: "Nginx Version",
                items: ko.observableArray([
                    { text: "1.13.4", value: "1.13.4" },
                    { text: "1.12.1", value: "1.12.1" },
                    { text: "1.10.3", value: "1.10.3" },
                    { text: "1.8.1", value: "1.8.1" },
                ]),
                validations: ko.observableArray([
                    new FxVm.RequiredValidation("Must choose a Nginx version"),
                ]),
                value: this.createEditScopeAccessor(d => d.nginxVersion).getEditableObservable(container),
            });

        this.formElements([
            this._nameTextBox,
            // Also add the selector fields for the pickers.
            this._subscriptionsDropDown as Magic,
            this._resourceGroupDropDown,
            this._locationsDropDown,
            this._nginxVersionDropDown,
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
        const nginxVersion = data.nginxVersion();

        const parameters: StringMap<string> = {
            name: name,
            location: location,
            nginxVersion: nginxVersion,
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
                name: {
                    type: "string"
                },
                location: {
                    type: "string"
                },
                nginxVersion: {
                    type: "string"
                },
            },
            resources: [
                {
                    type: "Microsoft.Nginx/nginx",
                    name: "[parameters('name')]",
                    apiVersion: "2014-04-01-preview",
                    location: "[parameters('location')]",
                    properties: {
                        nginxVersion: "[parameters('nginxVersion')]",
                    },
                    tags: {
                        "CreatedBy": "Junbo"
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
