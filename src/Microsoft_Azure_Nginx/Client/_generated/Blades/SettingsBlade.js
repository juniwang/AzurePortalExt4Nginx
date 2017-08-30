define(["require", "exports", "../../Project/Settings/ViewModels/SettingsBladeViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "name": "SettingsBlade",
            "inputs": [
                "id"
            ],
            "viewModelName": "Project$SettingsBladeViewModel",
            "lenses": [],
            "initialDisplayState": 2,
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
                "partSize": 0,
                "htmlTemplateInline": {
                    "file": "SettingsTemplateBlade.html",
                    "content": "<div>This is an example template blade that shows a link.</div> <div data-bind=\"pcControl:infoBox\"></div> "
                },
                "styleSheets": []
            },
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
