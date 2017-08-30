﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../TypeReferences.d.ts" />

import Svg = require ("_generated/Svg");
import ProjectStrings = require ("ProjectStrings");
import EntryPointModule = require ("Program");
export = ExtensionDefinition;
module ExtensionDefinition {
    "use strict";
    var untypedManifest: any = {
  "name": null,
  "version": null,
  "schemaVersion": null,
  "sdkVersion": null,
  "notifications": [],
  "assetTypes": [
    {
      "name": "Project",
      "singularDisplayName": ProjectStrings.AssetTypeNames.Project.singular,
      "pluralDisplayName": ProjectStrings.AssetTypeNames.Project.plural,
      "lowerSingularDisplayName": ProjectStrings.AssetTypeNames.Project.lowerSingular,
      "lowerPluralDisplayName": ProjectStrings.AssetTypeNames.Project.lowerPlural,
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
      "singularDisplayName": ProjectStrings.AssetTypeNames.Service.singular,
      "pluralDisplayName": ProjectStrings.AssetTypeNames.Service.plural,
      "lowerSingularDisplayName": ProjectStrings.AssetTypeNames.Service.lowerSingular,
      "lowerPluralDisplayName": ProjectStrings.AssetTypeNames.Service.lowerPlural,
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
    export var manifest: MsPortalFx.Extension.Manifest = untypedManifest;
    MsPortalFx.Extension.registerAmd<typeof EntryPointModule>(manifest, "Program", require, "../_generated/Blades/", "../_generated/Parts", "../_generated/Controls");
}
