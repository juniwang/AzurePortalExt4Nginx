define(["require", "exports", "../../NginxCreate/ViewModels/CreateBladeViewModel"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        "use strict";
        Main.blade = {
            "name": "CreateBlade",
            "viewModelName": "NginxCreate$CreateBladeViewModel",
            "lenses": [],
            "width": 0,
            "style": 3,
            "actionBar": {
                "name": "",
                "actionBarKind": 1,
                "bindings": []
            },
            "templateBlade": {
                "htmlTemplate": null,
                "parameterProvider": true,
                "partSize": 0,
                "htmlTemplateInline": {
                    "file": "PCV3Form.html",
                    "content": "<div class=\"msportalfx-form\"> <div data-bind=\"foreach: formElements\"> <div data-bind=\"formElement: $data\"></div> </div> </div>"
                },
                "styleSheets": []
            },
            "attributes": 0
        };
    })(Main || (Main = {}));
    return Main;
});
