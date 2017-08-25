define(["require", "exports", "../../Deployments/ViewModels/DeploymentInfoPart"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "name": "DeploymentsBlade",
            "inputs": [
                "id"
            ],
            "viewModelName": "Deployments$DeploymentInfoPart",
            "lenses": [],
            "width": 2,
            "pinnable": false,
            "style": 1,
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
                    "file": "DeploymentInfoPart.html",
                    "content": ""
                },
                "styleSheets": []
            },
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
