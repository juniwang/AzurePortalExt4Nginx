define(["require", "exports", "../../Project/Properties/ViewModels/PropertiesBladeViewModel", "../../Project/Properties/ViewModels/PropertiesPartViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "name": "PropertiesBlade",
            "inputs": [
                "id"
            ],
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
            "viewModelInputs": [
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
            "width": 0,
            "locked": true,
            "style": 6,
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
