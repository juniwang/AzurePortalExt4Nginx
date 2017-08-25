define(["require", "exports"], function (require, exports) {
    "use strict";
    var Diagnostics = MsPortalFx.Base.Diagnostics;
    var debugMode = MsPortalFx.isFeatureEnabled("debug");
    var loudList = JSON.parse(MsPortalFx.getFeatureValue("loud_list") || "[]") || [];
    var quietByDefault = MsPortalFx.isFeatureEnabled("quiet") || (loudList.length > 0);
    var logHelperLoggerName = "__logHelper";
    var extensionName = "Microsoft_Azure_Nginx";
    if (!debugMode && !quietByDefault) {
        MsPortalFx.Base.Diagnostics.Telemetry.initialize(extensionName);
    }
    var safeKoToJS = (function () {
        var lastRoot = undefined;
        var count = 0;
        return function (root) {
            if (typeof root === boolType)
                return root;
            if (root) {
                try {
                    var ret = ko.toJS(root);
                    count = 0;
                    return ret;
                }
                catch (ex) {
                    if (lastRoot === root)
                        ++count;
                    if (count > 5)
                        throw ex;
                }
                return {};
            }
            return undefined;
        };
    })();
    var shouldLogFor = function (area, type) {
        if (area === logHelperLoggerName)
            return true;
        if (quietByDefault) {
            return [area, type, area + "_" + type].some(function (extra) { return MsPortalFx.isFeatureEnabled("loud_" + extra) || (loudList.indexOf(extra) >= 0); });
        }
        return [area, type, area + "_" + type].every(function (extra) { return !MsPortalFx.isFeatureEnabled("quiet_" + extra); });
    };
    var lastLog = Date.now();
    var consoleLog = function (area, type) {
        return shouldLogFor(area, type) ?
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return ko.ignoreDependencies(function () {
                    var now = Date.now();
                    console.log.apply(console, [area + ":", type, now, now - lastLog].concat((args.map(safeKoToJS))));
                    console.groupCollapsed(area + ": " + type + " " + now);
                    console.trace();
                    console.groupEnd();
                    lastLog = now;
                });
            }
            : noop;
    };
    var traceLog = function (area, level) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ko.ignoreDependencies(function () {
            return Diagnostics.Log.writeEntry(level, area, [new Error().stack].concat(args).map(function (obj) { return JSON.stringify(safeKoToJS(obj), null, "\t"); }).join("\r\n<:::>\r\n"));
        });
    }; };
    var telemetryLog = function (area) {
        var name = "Extension/" + extensionName + "/Area/" + area;
        return function (action) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return ko.ignoreDependencies(function () { return Diagnostics.Telemetry.trace({
                extension: extensionName,
                source: "Telemetry",
                action: action,
                name: name,
                data: args.map(safeKoToJS),
            }); });
        };
    };
    var makeAreaLogger = function (area) {
        var isInternal = area === logHelperLoggerName;
        var logToConsole = quietByDefault || debugMode || (!isInternal && Environment.isDevelopmentMode);
        var internalLogLevel = isInternal ? 2 : 0;
        var internalNoop = isInternal ? traceLog(area, internalLogLevel) : noop;
        return {
            logError: logToConsole ? consoleLog(area, "Error") : traceLog(area, internalLogLevel || 2),
            logWarning: logToConsole ? consoleLog(area, "Warning") : traceLog(area, internalLogLevel || 1),
            debug: logToConsole ? consoleLog(area, "Debug") : internalNoop,
            console: logToConsole ? function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return console.log.apply(console, [area + ":", "Console"].concat(args));
            } : internalNoop,
            telemetry: logToConsole ? consoleLog(area, "Telemetry") : telemetryLog(area),
        };
    };
    var instances = {};
    var cachedLogger = function (area) {
        var instance = instances[area];
        if (instance)
            return instance;
        if (area === "list")
            _logHelperLogger.logWarning("Using 'list' as the area may break client side logging");
        return instances[area] = makeAreaLogger(area);
    };
    var _logHelperLogger = cachedLogger(logHelperLoggerName);
    return cachedLogger;
});
