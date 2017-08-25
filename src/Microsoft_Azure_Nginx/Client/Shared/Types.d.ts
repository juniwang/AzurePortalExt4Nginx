declare interface Untyped { }
declare type Magic = any;

declare interface IdInput {
    id: string;
}

declare type LogCall = { (...args: Untyped[]): void };
declare type TelemetryCall = { (action: string, ...args: Untyped[]): void };
declare interface LogUtility {
    logError: LogCall;
    logWarning: LogCall;
    debug: LogCall;
    console: LogCall;
    telemetry: TelemetryCall;
}
declare let Logger: (area: string) => LogUtility;

declare interface Environment extends FxEnvironment {
    armEndpoint: string;
}
declare let Environment: Environment;

declare let stringType: string;
declare let boolType: string;
declare let numberType: string;
declare let undefinedType: string;
declare let objectType: string;
declare let functionType: string;
declare let noop: (...args: Untyped[]) => void;

declare type Promise = MsPortalFx.Base.Promise;
declare type PromiseV<T> = MsPortalFx.Base.PromiseV<T>;
declare type LifetimeManager = MsPortalFx.Base.LifetimeManager;
declare type ContainerContract = MsPortalFx.ViewModels.ContainerContract;
declare type PartContainer = MsPortalFx.ViewModels.PartContainerContract;

declare type NetPromise<T> = PromiseV<MsPortalFx.Base.Net2.Response<T>>;
declare type NetError<T> = MsPortalFx.Base.Net2.ErrorResponse<T>;
declare type CachedResponse<T> = PromiseV<MsPortalFx.Base.Net2.AjaxCachedResult<T>>;

declare type Observable<T> = {
    [P in keyof T]: KnockoutReadOnlyObservable<Observable<T[P]>>;
}
