var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Constants", "ProjectStrings", "_generated/Svg", "Shared/PCV3Form", "Shared/ARMRest", "Fx/Controls/SubscriptionDropDown", "Fx/Controls/ResourceGroupDropDown", "Fx/Controls/LocationDropDown"], function (require, exports, Constants, Strings, Svg_1, PCV3Form_1, ARMRest_1, SubscriptionDropDown, ResourceGroupDropDown, LocationDropDown) {
    "use strict";
    var FxAzure = MsPortalFx.Azure;
    var FxVm = MsPortalFx.ViewModels;
    var Arm = FxAzure.ResourceManager;
    var Forms = FxVm.Forms;
    var log = Logger("CreateProjectBlade");
    var CreateBladeViewModel = (function (_super) {
        __extends(CreateBladeViewModel, _super);
        function CreateBladeViewModel(container, initialState, dataContext) {
            var _this = _super.call(this, container, function (_) { return function (incoming) {
                var config = _this.armProvisioner.armProvisioningConfig;
                log.debug(incoming, config);
                _this._initialSubscriptionId(config.galleryCreateOptions.subscriptionId);
                _this._initialLocation(config.galleryCreateOptions.resourceGroupLocation);
                var model = {
                    name: ko.observable(),
                    subscription: ko.observable({
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
                        mode: (config.galleryCreateOptions.resourceGroupName ? 1 : 0),
                    }),
                    location: ko.observable({
                        name: config.galleryCreateOptions.resourceGroupLocation,
                        displayName: config.galleryCreateOptions.resourceGroupLocationDisplayName,
                        latitude: null,
                        longitude: null,
                    }),
                };
                return model;
            }; }, function (_) { return function (outgoing) {
                return outgoing;
            }; }, new FxVm.ActionBars.CreateActionBar.ViewModel(container, { hideActionBar: false })) || this;
            _this._subscriptionId = ko.observable();
            _this._initialSubscriptionId = ko.observable();
            _this._initialLocation = ko.observable();
            _this.title(Strings.AssetTypeNames.Project.singular);
            _this.subtitle(Strings.AssetTypeNames.Project.singular);
            _this.icon(Svg_1.Content.SVG.project);
            _this.armProvisioner = new Arm.Provisioner(container, initialState, {
                supplyTemplateDeploymentOptions: _this._supplyProvisioningPromise.bind(_this),
                actionBar: _this.actionBar,
                parameterProvider: _this.parameterProvider
            });
            _this._initializeFormFields(container, initialState);
            return _this;
        }
        CreateBladeViewModel.prototype._initializeFormFields = function (container, initialState) {
            var _this = this;
            this._nameTextBox = new Forms.TextBox.ViewModel(container, this, this.createEditScopeAccessor(function (p) { return p.name; }), {
                label: ko.observable(Strings.projectName),
                emptyValueText: ko.observable(Strings.enterTheName),
                validations: ko.observableArray([
                    new FxVm.RequiredValidation(Strings.projectNameRequired),
                    new FxVm.LengthRangeValidation(5, 60),
                    new FxVm.RegExMatchValidation("^[a-zA-Z0-9]+-*[a-zA-Z0-9]+$", Strings.projectNameAlphaNumeric),
                    new FxVm.CustomValidation("NAME VALIDATION BROKEN", function (name) { return _this._isProjectNameAvailable(name); }),
                ]),
            });
            this._nameTextBox.delayValidationTimeout(500);
            this._nameTextBox.valueUpdateTrigger = 3;
            this._subscriptionsDropDown = SubscriptionDropDown.create(container, {
                initialSubscriptionId: this._initialSubscriptionId,
                resourceProviders: Constants.resourceProviderDependencies,
                validations: ko.observableArray([
                    new FxVm.RequiredValidation(Strings.selectSubscription),
                ]),
                value: this.createEditScopeAccessor(function (d) { return d.subscription; }).getEditableObservable(container),
            });
            ko.pureComputed(function () {
                var val = _this._subscriptionsDropDown.value();
                return val && val.subscriptionId;
            }).subscribeAndRun(container, function (nv) { return _this._subscriptionId(nv); });
            var armPermissionValidation = new FxAzure.RequiredPermissionsValidator(function (value) {
                var resourceGroupFromDropDown = _this._resourceGroupDropDown && _this._resourceGroupDropDown.value();
                var resourceGroup = resourceGroupFromDropDown && resourceGroupFromDropDown.value;
                if (!resourceGroup || !resourceGroup.name) {
                    return Q(undefined);
                }
                var resourceId = "/subscriptions/" + _this._subscriptionId() + "/resourceGroups/" + resourceGroup.name;
                return Q({
                    entityId: resourceId,
                    actions: [],
                });
            });
            this._resourceGroupDropDown = ResourceGroupDropDown.create(container, {
                subscriptionId: this._subscriptionId,
                validations: ko.observableArray([
                    new FxVm.RequiredValidation(Strings.selectResourceGroup),
                    armPermissionValidation,
                ]),
                value: this.createEditScopeAccessor(function (d) { return d.resourceGroup; }).getEditableObservable(container),
            });
            this._resourceGroupDropDown.value.subscribe(container, function (resourceGroup) {
                if (_this._locationsDropDown) {
                    var resourceGroupLocation_1 = resourceGroup && resourceGroup.value && resourceGroup.value.location;
                    var location_1 = _this._locationsDropDown.fetchedValues().first(function (item) {
                        return item.name === resourceGroupLocation_1;
                    });
                    if (location_1) {
                        _this._locationsDropDown.value(location_1);
                    }
                }
            });
            this._locationsDropDown = LocationDropDown.create(container, {
                initialLocationName: this._initialLocation,
                value: this.createEditScopeAccessor(function (d) { return d.location; }).getEditableObservable(container),
                subscriptionId: this._subscriptionId,
                validations: ko.observableArray([
                    new FxVm.RequiredValidation(Strings.selectLocation),
                ]),
                resourceTypes: [Constants.projectResourceType],
            });
            this.formElements([
                this._nameTextBox,
                this._subscriptionsDropDown,
                this._resourceGroupDropDown,
                this._locationsDropDown,
            ]);
        };
        CreateBladeViewModel.prototype._supplyProvisioningPromise = function (data) {
            var name = data.name();
            if (!name) {
                return Q.reject("Project name not specified");
            }
            var galleryCreateOptions = this.armProvisioner.armProvisioningConfig && this.armProvisioner.armProvisioningConfig.galleryCreateOptions;
            var subscriptionId = data.subscription().subscriptionId;
            var resourceGroupName = this._resourceGroupDropDown.value().value.name;
            var location = data.location().name;
            var parameters = {
                projectName: name,
                location: location,
            };
            return Q({
                subscriptionId: subscriptionId,
                resourceGroupName: resourceGroupName,
                resourceGroupLocation: this._resourceGroupDropDown.value().mode === 1 ? location : this._resourceGroupDropDown.value().value.location,
                parameters: parameters,
                deploymentName: galleryCreateOptions.deploymentName,
                resourceProviders: Constants.resourceProviderDependencies,
                resourceId: "/subscriptions/" + subscriptionId + "/resourcegroups/" + resourceGroupName + "/providers/" + Constants.projectResourceType + "/" + name,
                templateJson: this._getResourceTemplateJson(),
            });
        };
        CreateBladeViewModel.prototype._getResourceTemplateJson = function () {
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
        };
        CreateBladeViewModel.prototype._isProjectNameAvailable = function (name) {
            var deferred = Q.defer();
            ARMRest_1.checkNameAvailability(this._subscriptionId(), Constants.resourceProvider, Constants.projectType, Constants.apiVersion, name).then(function () { return deferred.resolve({
                valid: true,
                message: undefined,
            }); }, function (error) { return deferred.resolve({
                valid: false,
                message: (typeof error === stringType ? error : JSON.stringify(error)) || Strings.projectNameNotAvailable,
            }); });
            return deferred.promise;
        };
        return CreateBladeViewModel;
    }(PCV3Form_1.SymmetricForm));
    exports.CreateBladeViewModel = CreateBladeViewModel;
});
