define(["require", "exports", "_generated/Svg", "NginxStrings"], function (require, exports, Svg, NginxStrings) {
    "use strict";
    var ExtensionDefinition;
    (function (ExtensionDefinition) {
        "use strict";
        var untypedManifest = {
            "name": "Microsoft_Azure_Nginx",
            "version": "1.0",
            "schemaVersion": "1.0.0.2",
            "sdkVersion": "5.0.302.813 (production_sdk#17c60b9.170725-1209)",
            "isPreview": true,
            "notifications": [],
            "assetTypes": [
                {
                    "name": "Project",
                    "singularDisplayName": NginxStrings.AssetTypeNames.Project.singular,
                    "pluralDisplayName": NginxStrings.AssetTypeNames.Project.plural,
                    "lowerSingularDisplayName": NginxStrings.AssetTypeNames.Project.lowerSingular,
                    "lowerPluralDisplayName": NginxStrings.AssetTypeNames.Project.lowerPlural,
                    "viewModel": "Project$ProjectAssetTypeViewModel",
                    "contracts": 40,
                    "partName": "ProjectPart",
                    "bladeName": "ProjectBlade",
                    "browseType": 1,
                    "privateBrowse": true,
                    "resourceType": {
                        "resourceTypeName": "Microsoft.Nginx/Nginx",
                        "apiVersion": "2014-04-01-preview"
                    },
                    "icon": Svg.Content.SVG.project
                },
                {
                    "name": "Service",
                    "singularDisplayName": NginxStrings.AssetTypeNames.Service.singular,
                    "pluralDisplayName": NginxStrings.AssetTypeNames.Service.plural,
                    "lowerSingularDisplayName": NginxStrings.AssetTypeNames.Service.lowerSingular,
                    "lowerPluralDisplayName": NginxStrings.AssetTypeNames.Service.lowerPlural,
                    "viewModel": "Project$ServiceAssetTypeViewModel",
                    "contracts": 1,
                    "partName": "ServicePart",
                    "bladeName": "ServiceBlade",
                    "icon": Svg.Content.SVG.service
                }
            ],
            "notifications2": [],
            "startBoardParts": [],
            "blades": [],
            "galleryParts": [],
            "redirects": []
        };
        untypedManifest.pageVersion = window.fx.environment.pageVersion;
        ExtensionDefinition.manifest = untypedManifest;
        MsPortalFx.Extension.registerAmd(ExtensionDefinition.manifest, "Program", require, "../_generated/Blades/", "../_generated/Parts", "../_generated/Controls");
    })(ExtensionDefinition || (ExtensionDefinition = {}));
    return ExtensionDefinition;
});
