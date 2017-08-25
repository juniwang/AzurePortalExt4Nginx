"use strict"

import Logger = require("Shared/LogHelper");

let init = function (global: Magic): void {
    if (!global.__mindaroInit) {
        global.__mindaroInit = true;
        global.Environment = <Magic>window.fx.environment;

        let noop = function () { };

        global.stringType = typeof "str";
        global.boolType = typeof true;
        global.numberType = typeof 1;
        global.undefinedType = typeof undefined;
        global.objectType = typeof {};
        global.functionType = typeof noop;
        global.noop = noop;

        let changes: Magic[] = [];

        for (let name in window.fx.environment) {
            let newVal = MsPortalFx.getFeatureValue("override_" + name);
            if (newVal) {
                let escaped = decodeURIComponent(newVal);
                let oldVal = global.Environment[name];
                let replaceWith = typeof oldVal !== stringType ? JSON.parse(escaped) : escaped;
                global.Environment[name] = replaceWith;
                changes.push({ key: name, old: oldVal, new: replaceWith });
            }
        }

        let localLogger = Logger("Init");
        localLogger.debug("Initializing Extension");
        if (changes.length > 0) localLogger.logWarning("Overriden values: ", changes);

        global.Logger = Logger;

        localLogger.debug("Init script finished");
    }
};

init(window);

export = Logger("PostInit");