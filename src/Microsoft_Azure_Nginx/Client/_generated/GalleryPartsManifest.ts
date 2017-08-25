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
  "assetTypes": [],
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