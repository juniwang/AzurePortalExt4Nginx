define(["require", "exports", "../../_generated/adapters/blade/ServiceBladeAdapter"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "hasOnPinMethod": true,
            "name": "ServiceBlade",
            "inputs": [
                "id"
            ],
            "templateKeyInputs": [
                "id"
            ],
            "viewModelName": "Project$ServiceBladeAdapter",
            "lenses": [],
            "assetType": "Service",
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
                    "content": "<div data-bind='pcControl: essentials'></div>"
                },
                "partState": {
                    "inputIdentityProperties": [
                        "content.essentialsExpanded"
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
