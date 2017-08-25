var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Fx/Composition/Selectable"], function (require, exports, FxSelectable2) {
    "use strict";
    var BladeDefinitions;
    (function (BladeDefinitions) {
        var extensionName = "HubsExtension";
        function createOptions(onClosed, parameters, callbacks) {
            return {
                onClosed: onClosed,
                parameters: parameters,
                callbacks: callbacks
            };
        }
        var UnauthorizedAssetBladeReference = (function (_super) {
            __extends(UnauthorizedAssetBladeReference, _super);
            function UnauthorizedAssetBladeReference(onClosed) {
                return _super.call(this, "UnauthorizedAssetBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return UnauthorizedAssetBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.UnauthorizedAssetBladeReference = UnauthorizedAssetBladeReference;
        var NotFoundAssetBladeReference = (function (_super) {
            __extends(NotFoundAssetBladeReference, _super);
            function NotFoundAssetBladeReference(onClosed) {
                return _super.call(this, "NotFoundAssetBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return NotFoundAssetBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.NotFoundAssetBladeReference = NotFoundAssetBladeReference;
        var UnavailableAssetBladeReference = (function (_super) {
            __extends(UnavailableAssetBladeReference, _super);
            function UnavailableAssetBladeReference(onClosed) {
                return _super.call(this, "UnavailableAssetBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return UnavailableAssetBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.UnavailableAssetBladeReference = UnavailableAssetBladeReference;
        var ResourcesReference = (function (_super) {
            __extends(ResourcesReference, _super);
            function ResourcesReference(parameters, onClosed) {
                return _super.call(this, "Resources", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return ResourcesReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ResourcesReference = ResourcesReference;
        var BrowseAllResourcesBladeReference = (function (_super) {
            __extends(BrowseAllResourcesBladeReference, _super);
            function BrowseAllResourcesBladeReference(parameters, onClosed) {
                return _super.call(this, "BrowseAllResourcesBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return BrowseAllResourcesBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.BrowseAllResourcesBladeReference = BrowseAllResourcesBladeReference;
        var BrowseResourceBladeReference = (function (_super) {
            __extends(BrowseResourceBladeReference, _super);
            function BrowseResourceBladeReference(parameters, onClosed) {
                return _super.call(this, "BrowseResourceBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return BrowseResourceBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.BrowseResourceBladeReference = BrowseResourceBladeReference;
        var BrowseInstanceLinkBladeReference = (function (_super) {
            __extends(BrowseInstanceLinkBladeReference, _super);
            function BrowseInstanceLinkBladeReference(parameters, onClosed) {
                return _super.call(this, "BrowseInstanceLinkBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return BrowseInstanceLinkBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.BrowseInstanceLinkBladeReference = BrowseInstanceLinkBladeReference;
        var BrowseResourceGroupBladeReference = (function (_super) {
            __extends(BrowseResourceGroupBladeReference, _super);
            function BrowseResourceGroupBladeReference(parameters, onClosed) {
                return _super.call(this, "BrowseResourceGroupBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return BrowseResourceGroupBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.BrowseResourceGroupBladeReference = BrowseResourceGroupBladeReference;
        var MapResourceGroupBladeReference = (function (_super) {
            __extends(MapResourceGroupBladeReference, _super);
            function MapResourceGroupBladeReference(parameters, onClosed) {
                return _super.call(this, "MapResourceGroupBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return MapResourceGroupBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.MapResourceGroupBladeReference = MapResourceGroupBladeReference;
        var ResourceGroupPickerV3BladeReference = (function (_super) {
            __extends(ResourceGroupPickerV3BladeReference, _super);
            function ResourceGroupPickerV3BladeReference(options) {
                return _super.call(this, "ResourceGroupPickerV3Blade", extensionName, options) || this;
            }
            return ResourceGroupPickerV3BladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.ResourceGroupPickerV3BladeReference = ResourceGroupPickerV3BladeReference;
        var DeployFromTemplateBladeReference = (function (_super) {
            __extends(DeployFromTemplateBladeReference, _super);
            function DeployFromTemplateBladeReference(options) {
                return _super.call(this, "DeployFromTemplateBlade", extensionName, options) || this;
            }
            return DeployFromTemplateBladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.DeployFromTemplateBladeReference = DeployFromTemplateBladeReference;
        var ParametersEditorBladeReference = (function (_super) {
            __extends(ParametersEditorBladeReference, _super);
            function ParametersEditorBladeReference(options) {
                return _super.call(this, "ParametersEditorBlade", extensionName, options) || this;
            }
            return ParametersEditorBladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.ParametersEditorBladeReference = ParametersEditorBladeReference;
        var ParametersFileEditorBladeReference = (function (_super) {
            __extends(ParametersFileEditorBladeReference, _super);
            function ParametersFileEditorBladeReference(options) {
                return _super.call(this, "ParametersFileEditorBlade", extensionName, options) || this;
            }
            return ParametersFileEditorBladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.ParametersFileEditorBladeReference = ParametersFileEditorBladeReference;
        var TemplateEditorBladeReference = (function (_super) {
            __extends(TemplateEditorBladeReference, _super);
            function TemplateEditorBladeReference(options) {
                return _super.call(this, "TemplateEditorBlade", extensionName, options) || this;
            }
            return TemplateEditorBladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.TemplateEditorBladeReference = TemplateEditorBladeReference;
        var LocationPickerV3BladeReference = (function (_super) {
            __extends(LocationPickerV3BladeReference, _super);
            function LocationPickerV3BladeReference(options) {
                return _super.call(this, "LocationPickerV3Blade", extensionName, options) || this;
            }
            return LocationPickerV3BladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.LocationPickerV3BladeReference = LocationPickerV3BladeReference;
        var DeploymentDetailsBladeReference = (function (_super) {
            __extends(DeploymentDetailsBladeReference, _super);
            function DeploymentDetailsBladeReference(parameters, onClosed) {
                return _super.call(this, "DeploymentDetailsBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return DeploymentDetailsBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.DeploymentDetailsBladeReference = DeploymentDetailsBladeReference;
        var ResourceGroupMapBladeReference = (function (_super) {
            __extends(ResourceGroupMapBladeReference, _super);
            function ResourceGroupMapBladeReference(parameters, onClosed) {
                return _super.call(this, "ResourceGroupMapBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return ResourceGroupMapBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ResourceGroupMapBladeReference = ResourceGroupMapBladeReference;
        var ResourceMenuBladeReference = (function (_super) {
            __extends(ResourceMenuBladeReference, _super);
            function ResourceMenuBladeReference(parameters, onClosed) {
                return _super.call(this, "ResourceMenuBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return ResourceMenuBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ResourceMenuBladeReference = ResourceMenuBladeReference;
        var ServicesHealthBladeReference = (function (_super) {
            __extends(ServicesHealthBladeReference, _super);
            function ServicesHealthBladeReference(onClosed) {
                return _super.call(this, "ServicesHealthBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return ServicesHealthBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ServicesHealthBladeReference = ServicesHealthBladeReference;
        var SettingsBladeReference = (function (_super) {
            __extends(SettingsBladeReference, _super);
            function SettingsBladeReference(onClosed) {
                return _super.call(this, "SettingsBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return SettingsBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.SettingsBladeReference = SettingsBladeReference;
        var SubscriptionPickerV3BladeReference = (function (_super) {
            __extends(SubscriptionPickerV3BladeReference, _super);
            function SubscriptionPickerV3BladeReference(options) {
                return _super.call(this, "SubscriptionPickerV3Blade", extensionName, options) || this;
            }
            return SubscriptionPickerV3BladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.SubscriptionPickerV3BladeReference = SubscriptionPickerV3BladeReference;
        var DeployToAzureReference = (function (_super) {
            __extends(DeployToAzureReference, _super);
            function DeployToAzureReference(options) {
                return _super.call(this, "DeployToAzure", extensionName, options) || this;
            }
            return DeployToAzureReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.DeployToAzureReference = DeployToAzureReference;
    })(BladeDefinitions || (BladeDefinitions = {}));
    return BladeDefinitions;
});
