/// <reference path="Html5.d.ts" />
/// <reference path="require.d.ts" />

interface Action {
    (): void;
}

interface Action1<T> {
    (arg: T): void;
}

interface Action2<T1, T2> {
    (arg1: T1, arg2: T2): void;
}

interface Action3<T1, T2, T3> {
    (arg1: T1, arg2: T2, arg3: T3): void;
}

interface Func<R> {
    (): R;
}

interface Func1<T, R> {
    (arg: T): R;
}

declare type Primitive = number | string | Date | boolean;

interface StringMapPrimitive extends StringMap<StringMapRecursive | Primitive | Array<Primitive | StringMapRecursive>> { }

declare type StringMapRecursive = StringMapPrimitive;

// Intended to break compilation
/**
 * Obsolete
 */
interface Obsolete {
    /**
     * Obsolete
     */
    Obsolete: "true";
}

interface CdnConfig {
    disableParameter: string;
    enabled: boolean;
    errorPageUri: string;
    forceDisable: boolean;
    index: number;
    indexParameter: string;
    forceIndex?: string;
    bundling: string;
}

/**
 * Configuration options for tracing onInputsSet calls.
 */
interface InputsSetTraceConfig {
    /**
     * Partial name of target composition or view model to log when onInputsSet gets called.
     */
    log?: StringMap<boolean>;

    /**
     * Partial name of target composition or view model to break into debugger before calling onInputsSet.
     */
    debug?: StringMap<boolean>;

    /**
     * Partial name of target compositon or view model to log verbose statements for each evaluation that
     *  checks if onInputsSet should be called.
     */
    verbose?: StringMap<boolean>;
}

interface TraceConfig {
    assert?: boolean;
    diagnostics?: boolean;
    po?: boolean;
    rpc?: boolean;
    novirt?: boolean;
    debuglog?: boolean;
    debugtests?: boolean;
    lifetime?: boolean;
    nocallstacks?: boolean;
    nonsecure?: boolean;
    desktop?: boolean;
    router?: boolean;
    bladerebind?: boolean;
    extensionmanager?: boolean;
    partsettings?: StringMap<boolean>;
    lenssettings?: StringMap<boolean>;
    poarraymutation?: boolean;
    poarraymutation2?: boolean;
    potrackobservable?: boolean;

    /**
     * Configures onInputsSet traces for extension frames.
     */
    inputsset?: InputsSetTraceConfig;

    /**
     * Configures onInputsSet traces for shell's frame.
     */
    shellinputsset?: InputsSetTraceConfig;

    /**
     * Configures traces for action bar validation.
     */
    actionbar?: boolean;
}

interface FeatureConfig {

    /**
     * A value indicating whether or not the user can modify extension metadata.
     */
    canmodifyextensions?: string;

    /**
     * If true, scripts will be loaded such that the unhandled-error handler can obtain details also for scripts from another origin.
     */
    crossorigintraces?: string;

    /**
     * A value indicating whether to show monitoring group in resource menu or not.
     */
    enablemonitoringgroup?: string;

    /**
    * If true, all the audit logs will open new audit logs blade from azure monitoroing extension.
    */
    newauditlogs?: string;

    /**
     * If true, Quotas blade will be opened from Settings blade.
     */
    showquotas?: string;

    /**
     * If true, will emit telemetry to track the time for fetchData to complete
     */
    tracefetch?: string;

    /**
     * A value including which verbose diagnostics information to include separated by commas or 'all' for all the verbose diagnostics information
     */
    verbosediagnostics?: string;

    /**
     * A value indicating whether monitor chart control is available to use or not. This flag is targeted for extensions to consume.
     */
    enablemonitorchartcontrol?: string;

    /**
     * A value indicating whether monitor chart part to use app insights blade or not.
     */
    enableappinsightsmetricsblade?: string;
}

interface FxEnvironment {
    /**
     * DO NOT USE.
     * This declaration is Internal and will be released in a future release.
     */
    activeFlights: StringMap<boolean>;
    applicationPath: string;
    bootGetConst: string;
    bootMessageSignature: string;
    bootReturnConst: string;
    browseCuration: string;
    cacheVersion: number;
    cdn: CdnConfig;
    clientTraceUri: string;
    contentUriBasePath: string;
    contentVersionToken: string;
    defaultCacheEvictionDelay: number;
    defaultCloudName: string;
    effectiveLocale: string;
    enablePortalLogging: boolean;
    errorPageUri: string;

    /**
     * This attribute is obsolete. Please use the MsPortalFx.isFeatureEnabled and/or the
     * MsPortalFx.getFeatureValue APIs to get values of feature flags. E.g. if your query string
     * contains ?HubsExtension_myfeaturename=myfeaturevalue, then you can get its value by calling
     * MsPortalFx.isFeatureEnabled("myfeaturename") and/orMsPortalFx.getFeatureValue("myfeaturename")
     * Will be removed after 4/2017.
     */
    extensionFlags: Obsolete;

    extensionName: string;
    extensionTraceUri: string;
    extensionTelemetryUri: string;

    /**
     * Contains the set of feature flights that have been explicitly set.
     */
    features: FeatureConfig;
    flight: number;
    frameworkCapabilities: number;
    fxRequireConfig: RequireConfig;
    isDevelopmentMode: boolean;
    isRtl: boolean;
    isShellLike?: boolean;
    isTestMode: boolean; // Set to true when running the portal in the context of a QUnit test.
    localGalleryPackageEndpoint: string;
    pageVersion: string;
    prefetchCss: string[];
    prefetchScripts: string[];
    query: QueryStatic;
    requireConfig: RequireConfig;
    sdkVersion: string;
    sessionId: string;
    telemetryUri: string;
    trace: TraceConfig;
    traceAjaxErrors: boolean;
    crossOriginTraces: boolean;
    trustedParentOrigin: string;
    useFxArmEndpoint: boolean;
    userTypeHint: string;
    version: string;
    versionedContentRoots: string[];
    javascriptObjectPropertiesAreEnumerable: boolean;
    enableFastViewModelProxying: boolean;
    inWebWorker: boolean;
}

interface QueryStatic extends StringMap<string> {
}

interface BootstrapTelemetry {
    ossFxScriptsBegin: number;
    ossFxScriptsEnd: number;
    fxScriptsBegin: number;
    fxScriptsEnd: number;
    manifestScriptDownloadEnd: number;
    initScriptDownloadBegin: number;
    initScriptDownloadEnd: number;
    navigationTime: number;
    appCacheLoad: number;
    domainLookup: number;
    requestTime: number;
    ttfb: number;
    pageLoad: number;
    unloadTime: number;
}

interface FxStatic {
    bootstrapTelemetry: BootstrapTelemetry;
    environment: FxEnvironment;
    injectCss(module: { id: string }, content: string): void;
    getTimestamp(): number;
    handleError(evt: Event | string): void;
}

interface Window {
    fx: FxStatic;
}

interface RequireConfig {
    ignoreErrorsForModule?: StringMap<boolean>;
}

/**
 * A start telemetry event to be sent to the server.
 */
interface StartTelemetryEvent {
    /**
     * The timestamp of the event. Automatically filled in by the framework.
     */
    timestamp?: number;

    /**
     * The extension that is logging the event. Automatically filled in by the framework.
     */
    extension?: string;

    /**
     * The source of the telemetry data e.g. navigation, blade.
     */
    source: string;

    /**
     * The action being recorded.
     */
    action: string;

    /**
     * A modifier for the action.
     */
    actionModifier?: string;

    /**
     * The asset type for the telemetry data (optional).
     */
    assetType?: string;

    /**
     * The elapsed time in milliseconds for the event being recorded (optional).
     */
    duration?: number;

    /**
     * A name associated with the event or item that was the target of the event (optional).
     */
    name?: string;

    /**
     * Any additional context.  Automatically added by the framework.
     */
    context?: any;

    /**
     * Whether or not this event should be considered optional. Defaults to false.
     */
    optional?: boolean;
}

/**
 * A telemetry event to be sent to the server.
 */
interface TelemetryEvent extends StartTelemetryEvent {
    /**
     * Any additional information for the event being recorded (optional).
     */
    data?: any;
}

////////////////////////////////////////
/// BEGIN: IE11 ECMAScript Extensions
////////////////////////////////////////

interface CollatorOptions extends Intl.CollatorOptions {
}

interface MapBase<K, V> {
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): void;
    clear(): void;
    forEach(callbackfn: (value: V, index: K, map: this) => void, thisArg?: any): void;
}

interface Map<K, V> extends MapBase<K, V> {
    size: number;
}


interface WeakMap<K, V> {
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): void;
}

declare var WeakMap: {
    new <K, V>(): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}

////////////////////////////////////////
/// END: IE11 ECMAScript Extensions
////////////////////////////////////////
