define(["require", "exports", "Shared/LogHelper"], function (require, exports, Logger) {
    "use strict";
    var init = function (global) {
        if (!global.__mindaroInit) {
            global.__mindaroInit = true;
            global.Environment = window.fx.environment;
            var noop_1 = function () { };
            global.stringType = typeof "str";
            global.boolType = typeof true;
            global.numberType = typeof 1;
            global.undefinedType = typeof undefined;
            global.objectType = typeof {};
            global.functionType = typeof noop_1;
            global.noop = noop_1;
            var changes = [];
            for (var name_1 in window.fx.environment) {
                var newVal = MsPortalFx.getFeatureValue("override_" + name_1);
                if (newVal) {
                    var escaped = decodeURIComponent(newVal);
                    var oldVal = global.Environment[name_1];
                    var replaceWith = typeof oldVal !== stringType ? JSON.parse(escaped) : escaped;
                    global.Environment[name_1] = replaceWith;
                    changes.push({ key: name_1, old: oldVal, new: replaceWith });
                }
            }
            var localLogger = Logger("Init");
            localLogger.debug("Initializing Extension");
            if (changes.length > 0)
                localLogger.logWarning("Overriden values: ", changes);
            global.Logger = Logger;
            localLogger.debug("Init script finished");
        }
    };
    init(window);
    return Logger("PostInit");
});
