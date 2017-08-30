﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../../TypeReferences.d.ts" />
/// <amd-dependency path="../../Project/Properties/ViewModels/PropertiesBladeViewModel" />
/// <amd-dependency path="../../Project/Properties/ViewModels/PropertiesPartViewModel" />

export = Main;
module Main {
    "use strict";
    export var blade: MsPortalFx.Extension.BladeDefinition = {
  "name": "PropertiesBlade",
  "viewModelName": "Project$PropertiesBladeViewModel",
  "lenses": [
    {
      "name": "PropertiesBlade_lens1",
      "partInstances": [
        {
          "name": "PropertiesPart",
          "inline": {
            "styleSheets": [],
            "viewModel": "Project$PropertiesPartViewModel",
            "partKind": 24,
            "inputs": [],
            "bindings": [],
            "details": [
              {
                "invocationInputArguments": [
                  {
                    "valuesFrom": [
                      {
                        "referenceType": 0,
                        "property": "content.selection"
                      }
                    ]
                  }
                ]
              },
              {
                "invocationInputArguments": [
                  {
                    "valuesFrom": [
                      {
                        "referenceType": 0,
                        "property": "content.moveResourceSelection"
                      }
                    ]
                  }
                ],
                "outputArguments": [
                  {
                    "property": "actionBarOutput",
                    "valuesFrom": [
                      {
                        "referenceType": 1,
                        "property": "actionBarOutput"
                      }
                    ]
                  }
                ]
              }
            ],
            "initialSize": 8
          }
        }
      ]
    }
  ],
  "width": 0,
  "locked": true,
  "style": 6,
  "attributes": 0
};
}
