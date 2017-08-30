define(["require", "exports", "Project/Browse/ViewModels/ProjectPartViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.part = {
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
    })(Main || (Main = {}));
    return Main;
});
