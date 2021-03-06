﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../../TypeReferences.d.ts" />
/// <amd-dependency path="Project/Browse/ViewModels/ProjectPartViewModel" />

export = Main;
module Main {
    "use strict";
    export var part: MsPortalFx.Extension.PartTypeDefinition = {
  "styleSheets": [],
  "name": "ProjectPart",
  "viewModel": "Project$ProjectPartViewModel",
  "partKind": 22,
  "canUseOldInputVersions": false,
  "inputs": [
    "id"
  ],
  "bindings": [
    {
      "property": "id",
      "valuesFrom": [
        {
          "referenceType": 1,
          "property": "id"
        }
      ]
    }
  ],
  "details": [
    {
      "blade": "ProjectBlade",
      "selectableBindings": [
        {
          "property": "id",
          "valuesFrom": [
            {
              "referenceType": 0,
              "property": "content.assetId"
            }
          ]
        }
      ]
    }
  ],
  "assetType": "Project",
  "assetIdInputProperty": "id"
};
}
