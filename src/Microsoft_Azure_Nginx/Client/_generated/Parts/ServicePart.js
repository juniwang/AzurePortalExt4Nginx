define(["require", "exports", "Project/Services/ViewModels/ServicePartViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.part = {
            "styleSheets": [],
            "name": "ServicePart",
            "viewModel": "Project$ServicePartViewModel",
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
                    "blade": "ServiceBlade",
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
            "assetType": "Service",
            "assetIdInputProperty": "id"
        };
    })(Main || (Main = {}));
    return Main;
});
