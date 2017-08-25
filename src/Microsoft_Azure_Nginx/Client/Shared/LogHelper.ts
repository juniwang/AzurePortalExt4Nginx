// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

"use strict"

import Diagnostics = MsPortalFx.Base.Diagnostics;

let debugMode = MsPortalFx.isFeatureEnabled("debug");
let loudList: string[] = JSON.parse(MsPortalFx.getFeatureValue("loud_list") || "[]") || [];
let quietByDefault = MsPortalFx.isFeatureEnabled("quiet") || (loudList.length > 0);
const logHelperLoggerName = "__logHelper";
const extensionName = "Microsoft_Azure_Nginx";

if (!debugMode && !quietByDefault) {
    MsPortalFx.Base.Diagnostics.Telemetry.initialize(extensionName);
}

let safeKoToJS = (() => {
    let lastRoot: Untyped = undefined;
    let count = 0;

    return (root: Untyped): Untyped => {
        if (typeof root === boolType) return root;
        if (root) {
            try {
                let ret = ko.toJS(root);
                count = 0;
                return ret;
            } catch (ex) {
                if (lastRoot === root)++count;
                if (count > 5) throw ex;
            }
            return {};
        }
        return undefined;
    };
})();


// The net result of this is if you call Logger("<area>") from any one of our IFrames
// Then you get a logger that will either output to console or MDS depending on your environment

let shouldLogFor = (area: string, type: string): boolean => {
    if (area === logHelperLoggerName) return true;
    if (quietByDefault) {
        return [area, type, area + "_" + type].some(extra => MsPortalFx.isFeatureEnabled("loud_" + extra) || (loudList.indexOf(extra) >= 0));
    }
    return [area, type, area + "_" + type].every(extra => !MsPortalFx.isFeatureEnabled("quiet_" + extra));
}

// Log to console
// Unless you have a flag like: Microsoft_Azure_Nginx_quiet_<area>=true or Microsoft_Azure_Nginx_quiet_<type>=true or Microsoft_Azure_Nginx_quiet_<area>_<type>=true 
// in which case it is a noop
let lastLog = Date.now();
let consoleLog: (area: string, type: string) => LogCall = (area, type) =>
    shouldLogFor(area, type) ?
        (...args) =>
            ko.ignoreDependencies(() => {
                let now = Date.now();
                console.log(area + ":", type, now, now - lastLog, ...(args.map(safeKoToJS)));
                console.groupCollapsed(area + ": " + type + " " + now);
                console.trace();
                console.groupEnd();
                lastLog = now;
            })
        : noop;

// Log to MDS
// TODO: figure out a better way to log ...args
let traceLog: (area: string, level: Diagnostics.LogEntryLevel) => LogCall = (area, level) => (...args) =>
    ko.ignoreDependencies(() =>
        Diagnostics.Log.writeEntry(level, area, [new Error().stack, ...args].map(obj => JSON.stringify(safeKoToJS(obj), null, "\t")).join("\r\n<:::>\r\n")));

let telemetryLog: (area: string) => TelemetryCall = (area) => {
    let name = "Extension/" + extensionName + "/Area/" + area;
    return (action, ...args) =>
        ko.ignoreDependencies(() => Diagnostics.Telemetry.trace({
            extension: extensionName,
            source: "Telemetry",
            action: action,
            name: name,
            data: args.map(safeKoToJS),
        }));
};

// Trying to keep if statements out of our 'final' logging functions for "perf" 
// An object is returned with functions that always do the same thing with no extra branching (varargs will always give us branches :[ )
// The debug function should only ever log to console, so it is safe to leave it in code in terms of log spew

let makeAreaLogger = (area: string): LogUtility => {
    let isInternal = area === logHelperLoggerName;
    let logToConsole = quietByDefault || debugMode || (!isInternal && Environment.isDevelopmentMode); // Environment may not be defined yet if we're logging from this file
    let internalLogLevel = isInternal ? Diagnostics.LogEntryLevel.Error : 0;
    let internalNoop = isInternal ? traceLog(area, internalLogLevel) : noop;
    return {
        logError: logToConsole ? consoleLog(area, "Error")     : traceLog(area, internalLogLevel || Diagnostics.LogEntryLevel.Error),
        logWarning: logToConsole ? consoleLog(area, "Warning") : traceLog(area, internalLogLevel || Diagnostics.LogEntryLevel.Warning),
        debug: logToConsole ? consoleLog(area, "Debug")        : internalNoop,
        console: logToConsole ? (...args) => console.log(area + ":", "Console", ...args) : internalNoop,
        telemetry: logToConsole ? consoleLog(area, "Telemetry") : telemetryLog(area),
    };
};

// The real fun:
// This adds the "Logger" function to our global scope
// It should be run once when our extension is loaded/initialized
// Caches the created loggers
let instances: StringMap<LogUtility> = {};
let cachedLogger = function (area: string): LogUtility {
    let instance = instances[area];
    if (instance) return instance;
    if (area === "list") _logHelperLogger.logWarning("Using 'list' as the area may break client side logging");
    return instances[area] = makeAreaLogger(area);
}

let _logHelperLogger = cachedLogger(logHelperLoggerName);

export = cachedLogger;