// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

"use strict"

import Net = MsPortalFx.Base.Net2;

module Network {

    const log = Logger("Network");

    export interface SettingConfig<T> { (settings: Net.NetAjaxSettings<T>): void };

    function generateUri(uri: string, queryParams: string[]): string {
        if (queryParams && queryParams.length > 0) {
            const uriWithQ = uri + (uri.lastIndexOf("?") >= 0 ? "" : "?");
            const lastChar = uriWithQ.charAt(uriWithQ.length - 1);
            return uriWithQ + (lastChar == "&" || lastChar == "?" ? "" : "&") + queryParams.join("&");
        }
        return uri;
    }

    const noInvoke = MsPortalFx.isFeatureEnabled("noInvoke");

    const vstsRegex = /https?:[/]{2}[^/]+\.visualstudio\.com/i;

    function getAjaxSettings<T>(uri: string, type: string, queryParams: string[], config: SettingConfig<T>): Net.NetAjaxSettings<T> {
        const fullUri = generateUri(uri, queryParams);

        const isCsm = MsPortalFx.startsWith(uri, Environment.armEndpoint);
        /// TODO: use a regex here / possibly per region in the config
        const isVSTS = vstsRegex.test(uri);
        const authHeader = isCsm || isVSTS;

        //log.debug("Using authHeader ", authHeader);

        const settings: Net.NetAjaxSettings<T> = {
            accepts: "application/json",
            setAuthorizationHeader: authHeader,
            // If we aren't going through ARM we shouldn't be using invoke...
            invokeApi: (noInvoke || !isCsm) ? undefined : "api/invoke",
            headers: { "Accept": "application/json" },
            uri: fullUri,
            type: type,
        };
        config(settings);

        return settings;
    }

    function logFailure(uri: string, failureType: string) {
        return function (error: NetError<Untyped>) {
            const headerFunc = error && error.jqXHR && error.jqXHR.getAllResponseHeaders;
            const headers = (headerFunc && (typeof headerFunc === functionType)) ? headerFunc() : "(Unable to get headers from jqXHR)";
            log.logError(failureType, uri, error, headers);
        }
    }

    export function ajax<T>(uri: string, type: string, queryParams: string[], config: SettingConfig<T>): NetPromise<T> {
        const settings = getAjaxSettings(uri, type, queryParams, config);
        const request = Net.ajaxExtended<T>(settings);
        request.catch(logFailure(uri, "ajax failure"));
        return request;
    }

    export function cachedAjax<T>(uri: string, queryParams: string[], config: SettingConfig<T>): CachedResponse<T> {
        const settings = getAjaxSettings(uri, "GET", queryParams, config);
        const request = Net.cachedAjax<T>(settings);
        request.catch(logFailure(uri, "cached ajax failure"));
        return request;
    }

    export function getWithConfig<T>(uri: string, config: SettingConfig<T>, ...queryParams: string[]) {
        return ajax<T>(uri, "GET", queryParams, settings => {
            config && config(settings);
        });
    }

    export function get<T>(uri: string, ...queryParams: string[]): NetPromise<T> {
        return getWithConfig(uri, config => config.dataType = "json", ...queryParams);
    }

    export function getExpectEmptyResponse(uri: string, ...queryParams: string[]) {
        return getWithConfig<Untyped>(uri, undefined, ...queryParams);
    }

    export function getCached<T>(uri: string, ...queryParams: string[]): CachedResponse<T> {
        return cachedAjax<T>(uri, queryParams, noop);
    }

    export function getResource<T>(uri: string, apiVersion: string, ...queryParams: string[]): NetPromise<T> {
        return get<T>(Environment.armEndpoint + uri, "api-version=" + apiVersion, ...queryParams);
    }

    export function getResourceCached<T>(uri: string, apiVersion: string, ...queryParams: string[]): CachedResponse<T> {
        return getCached<T>(Environment.armEndpoint + uri, "api-version=" + apiVersion, ...queryParams);
    }

    export function post<T>(uri: string, contentType?: string, data?: Untyped, ...queryParams: string[]): NetPromise<T> {
        return ajax<T>(uri, "POST", queryParams, settings => {
            settings.contentType = contentType;
            settings.dataType = "json"
            settings.data = data;
            settings.processData = false;
        });
    }

    export function postResource<T>(uri: string, apiVersion: string, contentType?: string, data?: Untyped, ...queryParams: string[]): NetPromise<T> {
        return post<T>(Environment.armEndpoint + uri, contentType, data, "api-version=" + apiVersion, ...queryParams);
    }

    export function deleteResource(uri: string, apiVersion: string, ...queryParams: string[]): Promise {
        return ajax(`${Environment.armEndpoint}${uri}?api-version=${apiVersion}`, "DELETE", queryParams, noop);
    }
}

export = Network;