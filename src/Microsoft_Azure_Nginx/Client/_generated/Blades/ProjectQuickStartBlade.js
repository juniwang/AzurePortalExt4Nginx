define(["require", "exports", "Project/QuickStart/ViewModels/ProjectQuickStartBladeViewModel", "Project/QuickStart/ViewModels/ProjectQuickStartInfoListViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "name": "ProjectQuickStartBlade",
            "viewModelName": "Project$ProjectQuickStartBladeViewModel",
            "lenses": [
                {
                    "name": "ProjectQuickStartBlade_lens1",
                    "partInstances": [
                        {
                            "name": "QuickStartPart",
                            "inline": {
                                "styleSheets": [],
                                "viewModel": "Project$ProjectQuickStartInfoListViewModel",
                                "partKind": 23,
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
                                    }
                                ],
                                "initialSize": 8
                            }
                        }
                    ]
                }
            ],
            "width": 1,
            "locked": true,
            "style": 5,
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
