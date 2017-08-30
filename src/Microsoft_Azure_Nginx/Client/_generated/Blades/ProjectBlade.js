define(["require", "exports", "../../_generated/adapters/blade/ProjectBladeAdapter"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "hasOnPinMethod": true,
            "name": "ProjectBlade",
            "inputs": [
                "id"
            ],
            "templateKeyInputs": [
                "id"
            ],
            "viewModelName": "Project$ProjectBladeAdapter",
            "lenses": [],
            "assetType": "Project",
            "assetIdInputProperty": "id",
            "pinnable": true,
            "initialDisplayState": 2,
            "style": 8,
            "toolbar": {
                "source": {
                    "valuesFrom": [
                        {
                            "referenceType": 0,
                            "property": "content.commandBar"
                        }
                    ]
                }
            },
            "templateBlade": {
                "htmlTemplate": null,
                "partSize": 9,
                "htmlTemplateInline": {
                    "file": "Client\\_generated\\Project.pdl",
                    "content": "<div data-bind=\"pcControl: essentials\"></div> <div style=\"margin: 25px\"> <div class=\"msportalfx-text-header\" data-bind=\"text: serviceListSectionTitle\"></div> <div data-bind=\"pcControl: gridVM\"></div> </div>"
                },
                "partState": {
                    "inputIdentityProperties": [
                        "content.essentialsExpanded",
                        "content.servicesSortColumn",
                        "content.servicesSortAscending"
                    ],
                    "sharedProperties": [
                        {
                            "property": "content.timespan",
                            "key": "Azure_Project_Service_Timespan"
                        }
                    ]
                },
                "styleSheets": [],
                "isV2": true
            },
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
