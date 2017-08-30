define(["require", "exports"], function (require, exports) {
    "use strict";
    var ExtensionDefinition;
    (function (ExtensionDefinition) {
        var Internal;
        (function (Internal) {
            var untypedDefinition = {
                "commandsCatalog": [],
                "name": "Microsoft_Azure_Nginx",
                "version": "1.0",
                "hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                "schemaVersion": "1.0.0.2",
                "sdkVersion": "5.0.302.813 (production_sdk#17c60b9.170725-1209)",
                "isPreview": true,
                "commandGroups": [],
                "htmlTemplates": {}
            };
            Internal.definition = untypedDefinition;
        })(Internal || (Internal = {}));
        ExtensionDefinition.definitionName = "Microsoft_Azure_Nginx";
        function getDefinition() {
            if (Internal.definition) {
                var def = Internal.definition;
                Internal.definition = null;
                return def;
            }
            throw new Error("Extension definition is no longer available.");
        }
        ExtensionDefinition.getDefinition = getDefinition;
        var External;
        (function (External) {
            var HubsExtension;
            (function (HubsExtension) {
                HubsExtension.name = "HubsExtension";
                var Blades;
                (function (Blades) {
                    var UnauthorizedAssetBlade;
                    (function (UnauthorizedAssetBlade) {
                        UnauthorizedAssetBlade.name = "UnauthorizedAssetBlade";
                    })(UnauthorizedAssetBlade = Blades.UnauthorizedAssetBlade || (Blades.UnauthorizedAssetBlade = {}));
                    var NotFoundAssetBlade;
                    (function (NotFoundAssetBlade) {
                        NotFoundAssetBlade.name = "NotFoundAssetBlade";
                    })(NotFoundAssetBlade = Blades.NotFoundAssetBlade || (Blades.NotFoundAssetBlade = {}));
                    var UnavailableAssetBlade;
                    (function (UnavailableAssetBlade) {
                        UnavailableAssetBlade.name = "UnavailableAssetBlade";
                    })(UnavailableAssetBlade = Blades.UnavailableAssetBlade || (Blades.UnavailableAssetBlade = {}));
                    var Resources;
                    (function (Resources) {
                        Resources.name = "Resources";
                    })(Resources = Blades.Resources || (Blades.Resources = {}));
                    var BrowseAllResourcesBlade;
                    (function (BrowseAllResourcesBlade) {
                        BrowseAllResourcesBlade.name = "BrowseAllResourcesBlade";
                    })(BrowseAllResourcesBlade = Blades.BrowseAllResourcesBlade || (Blades.BrowseAllResourcesBlade = {}));
                    var BrowseResourceBlade;
                    (function (BrowseResourceBlade) {
                        BrowseResourceBlade.name = "BrowseResourceBlade";
                    })(BrowseResourceBlade = Blades.BrowseResourceBlade || (Blades.BrowseResourceBlade = {}));
                    var BrowseInstanceLinkBlade;
                    (function (BrowseInstanceLinkBlade) {
                        BrowseInstanceLinkBlade.name = "BrowseInstanceLinkBlade";
                    })(BrowseInstanceLinkBlade = Blades.BrowseInstanceLinkBlade || (Blades.BrowseInstanceLinkBlade = {}));
                    var BrowseResourceGroupBlade;
                    (function (BrowseResourceGroupBlade) {
                        BrowseResourceGroupBlade.name = "BrowseResourceGroupBlade";
                    })(BrowseResourceGroupBlade = Blades.BrowseResourceGroupBlade || (Blades.BrowseResourceGroupBlade = {}));
                    var MapResourceGroupBlade;
                    (function (MapResourceGroupBlade) {
                        MapResourceGroupBlade.name = "MapResourceGroupBlade";
                        var Inputs;
                        (function (Inputs) {
                            Inputs.id = "id";
                        })(Inputs = MapResourceGroupBlade.Inputs || (MapResourceGroupBlade.Inputs = {}));
                    })(MapResourceGroupBlade = Blades.MapResourceGroupBlade || (Blades.MapResourceGroupBlade = {}));
                    var ResourceGroupPickerV3Blade;
                    (function (ResourceGroupPickerV3Blade) {
                        ResourceGroupPickerV3Blade.name = "ResourceGroupPickerV3Blade";
                    })(ResourceGroupPickerV3Blade = Blades.ResourceGroupPickerV3Blade || (Blades.ResourceGroupPickerV3Blade = {}));
                    var DeployFromTemplateBlade;
                    (function (DeployFromTemplateBlade) {
                        DeployFromTemplateBlade.name = "DeployFromTemplateBlade";
                        var Inputs;
                        (function (Inputs) {
                            Inputs.internal_bladeCallerParams = "internal_bladeCallerParams";
                        })(Inputs = DeployFromTemplateBlade.Inputs || (DeployFromTemplateBlade.Inputs = {}));
                    })(DeployFromTemplateBlade = Blades.DeployFromTemplateBlade || (Blades.DeployFromTemplateBlade = {}));
                    var ParametersEditorBlade;
                    (function (ParametersEditorBlade) {
                        ParametersEditorBlade.name = "ParametersEditorBlade";
                    })(ParametersEditorBlade = Blades.ParametersEditorBlade || (Blades.ParametersEditorBlade = {}));
                    var ParametersFileEditorBlade;
                    (function (ParametersFileEditorBlade) {
                        ParametersFileEditorBlade.name = "ParametersFileEditorBlade";
                    })(ParametersFileEditorBlade = Blades.ParametersFileEditorBlade || (Blades.ParametersFileEditorBlade = {}));
                    var TemplateEditorBlade;
                    (function (TemplateEditorBlade) {
                        TemplateEditorBlade.name = "TemplateEditorBlade";
                    })(TemplateEditorBlade = Blades.TemplateEditorBlade || (Blades.TemplateEditorBlade = {}));
                    var LocationPickerV3Blade;
                    (function (LocationPickerV3Blade) {
                        LocationPickerV3Blade.name = "LocationPickerV3Blade";
                    })(LocationPickerV3Blade = Blades.LocationPickerV3Blade || (Blades.LocationPickerV3Blade = {}));
                    var DeploymentDetailsBlade;
                    (function (DeploymentDetailsBlade) {
                        DeploymentDetailsBlade.name = "DeploymentDetailsBlade";
                        var Inputs;
                        (function (Inputs) {
                            Inputs.id = "id";
                        })(Inputs = DeploymentDetailsBlade.Inputs || (DeploymentDetailsBlade.Inputs = {}));
                    })(DeploymentDetailsBlade = Blades.DeploymentDetailsBlade || (Blades.DeploymentDetailsBlade = {}));
                    var ResourceGroupMapBlade;
                    (function (ResourceGroupMapBlade) {
                        ResourceGroupMapBlade.name = "ResourceGroupMapBlade";
                        var Inputs;
                        (function (Inputs) {
                            Inputs.id = "id";
                        })(Inputs = ResourceGroupMapBlade.Inputs || (ResourceGroupMapBlade.Inputs = {}));
                    })(ResourceGroupMapBlade = Blades.ResourceGroupMapBlade || (Blades.ResourceGroupMapBlade = {}));
                    var ResourceMenuBlade;
                    (function (ResourceMenuBlade) {
                        ResourceMenuBlade.name = "ResourceMenuBlade";
                        var Inputs;
                        (function (Inputs) {
                            Inputs.id = "id";
                        })(Inputs = ResourceMenuBlade.Inputs || (ResourceMenuBlade.Inputs = {}));
                    })(ResourceMenuBlade = Blades.ResourceMenuBlade || (Blades.ResourceMenuBlade = {}));
                    var ServicesHealthBlade;
                    (function (ServicesHealthBlade) {
                        ServicesHealthBlade.name = "ServicesHealthBlade";
                    })(ServicesHealthBlade = Blades.ServicesHealthBlade || (Blades.ServicesHealthBlade = {}));
                    var SettingsBlade;
                    (function (SettingsBlade) {
                        SettingsBlade.name = "SettingsBlade";
                    })(SettingsBlade = Blades.SettingsBlade || (Blades.SettingsBlade = {}));
                    var SubscriptionPickerV3Blade;
                    (function (SubscriptionPickerV3Blade) {
                        SubscriptionPickerV3Blade.name = "SubscriptionPickerV3Blade";
                    })(SubscriptionPickerV3Blade = Blades.SubscriptionPickerV3Blade || (Blades.SubscriptionPickerV3Blade = {}));
                    var DeployToAzure;
                    (function (DeployToAzure) {
                        DeployToAzure.name = "DeployToAzure";
                    })(DeployToAzure = Blades.DeployToAzure || (Blades.DeployToAzure = {}));
                })(Blades = HubsExtension.Blades || (HubsExtension.Blades = {}));
            })(HubsExtension = External.HubsExtension || (External.HubsExtension = {}));
        })(External = ExtensionDefinition.External || (ExtensionDefinition.External = {}));
        var AssetTypes;
        (function (AssetTypes) {
            var Project;
            (function (Project) {
                Project.name = "Project";
            })(Project = AssetTypes.Project || (AssetTypes.Project = {}));
            var Service;
            (function (Service) {
                Service.name = "Service";
            })(Service = AssetTypes.Service || (AssetTypes.Service = {}));
        })(AssetTypes = ExtensionDefinition.AssetTypes || (ExtensionDefinition.AssetTypes = {}));
        var AssetTypeNames;
        (function (AssetTypeNames) {
            AssetTypeNames.project = AssetTypes.Project.name;
            AssetTypeNames.service = AssetTypes.Service.name;
        })(AssetTypeNames = ExtensionDefinition.AssetTypeNames || (ExtensionDefinition.AssetTypeNames = {}));
        var BladeNames;
        (function (BladeNames) {
            BladeNames.deploymentsBlade = "DeploymentsBlade";
            BladeNames.settingsBlade = "SettingsBlade";
            BladeNames.nginxPropertiesBlade = "NginxPropertiesBlade";
            BladeNames.projectQuickStartBlade = "ProjectQuickStartBlade";
            BladeNames.createBlade = "CreateBlade";
            BladeNames.serviceBlade = "ServiceBlade";
            BladeNames.projectBlade = "ProjectBlade";
        })(BladeNames = ExtensionDefinition.BladeNames || (ExtensionDefinition.BladeNames = {}));
    })(ExtensionDefinition || (ExtensionDefinition = {}));
    return ExtensionDefinition;
});
