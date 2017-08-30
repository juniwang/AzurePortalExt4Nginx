define(["require", "exports"], function (require, exports) {
    "use strict";
    var Net = MsPortalFx.Base.Net2;
    var Network;
    (function (Network) {
        var log = Logger("Network");
        ;
        function generateUri(uri, queryParams) {
            if (queryParams && queryParams.length > 0) {
                var uriWithQ = uri + (uri.lastIndexOf("?") >= 0 ? "" : "?");
                var lastChar = uriWithQ.charAt(uriWithQ.length - 1);
                return uriWithQ + (lastChar == "&" || lastChar == "?" ? "" : "&") + queryParams.join("&");
            }
            return uri;
        }
        var noInvoke = MsPortalFx.isFeatureEnabled("noInvoke");
        var vstsRegex = /https?:[/]{2}[^/]+\.visualstudio\.com/i;
        function getAjaxSettings(uri, type, queryParams, config) {
            var fullUri = generateUri(uri, queryParams);
            var isCsm = MsPortalFx.startsWith(uri, Environment.armEndpoint);
            var isVSTS = vstsRegex.test(uri);
            var authHeader = isCsm || isVSTS;
            var settings = {
                accepts: "application/json",
                setAuthorizationHeader: authHeader,
                invokeApi: (noInvoke || !isCsm) ? undefined : "api/invoke",
                headers: { "Accept": "application/json" },
                uri: fullUri,
                type: type,
            };
            config(settings);
            return settings;
        }
        function logFailure(uri, failureType) {
            return function (error) {
                var headerFunc = error && error.jqXHR && error.jqXHR.getAllResponseHeaders;
                var headers = (headerFunc && (typeof headerFunc === functionType)) ? headerFunc() : "(Unable to get headers from jqXHR)";
                log.logError(failureType, uri, error, headers);
            };
        }
        function ajax(uri, type, queryParams, config) {
            var settings = getAjaxSettings(uri, type, queryParams, config);
            var request = Net.ajaxExtended(settings);
            request.catch(logFailure(uri, "ajax failure"));
            return request;
        }
        Network.ajax = ajax;
        function cachedAjax(uri, queryParams, config) {
            var settings = getAjaxSettings(uri, "GET", queryParams, config);
            var request = Net.cachedAjax(settings);
            request.catch(logFailure(uri, "cached ajax failure"));
            return request;
        }
        Network.cachedAjax = cachedAjax;
        function getWithConfig(uri, config) {
            var queryParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                queryParams[_i - 2] = arguments[_i];
            }
            return ajax(uri, "GET", queryParams, function (settings) {
                config && config(settings);
            });
        }
        Network.getWithConfig = getWithConfig;
        function get(uri) {
            var queryParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                queryParams[_i - 1] = arguments[_i];
            }
            return getWithConfig.apply(void 0, [uri, function (config) { return config.dataType = "json"; }].concat(queryParams));
        }
        Network.get = get;
        function getExpectEmptyResponse(uri) {
            var queryParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                queryParams[_i - 1] = arguments[_i];
            }
            return getWithConfig.apply(void 0, [uri, undefined].concat(queryParams));
        }
        Network.getExpectEmptyResponse = getExpectEmptyResponse;
        function getCached(uri) {
            var queryParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                queryParams[_i - 1] = arguments[_i];
            }
            return cachedAjax(uri, queryParams, noop);
        }
        Network.getCached = getCached;
        function getResource(uri, apiVersion) {
            var queryParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                queryParams[_i - 2] = arguments[_i];
            }
            return get.apply(void 0, [Environment.armEndpoint + uri, "api-version=" + apiVersion].concat(queryParams));
        }
        Network.getResource = getResource;
        function getResourceCached(uri, apiVersion) {
            var queryParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                queryParams[_i - 2] = arguments[_i];
            }
            return getCached.apply(void 0, [Environment.armEndpoint + uri, "api-version=" + apiVersion].concat(queryParams));
        }
        Network.getResourceCached = getResourceCached;
        function post(uri, contentType, data) {
            var queryParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                queryParams[_i - 3] = arguments[_i];
            }
            return ajax(uri, "POST", queryParams, function (settings) {
                settings.contentType = contentType;
                settings.dataType = "json";
                settings.data = data;
                settings.processData = false;
            });
        }
        Network.post = post;
        function postResource(uri, apiVersion, contentType, data) {
            var queryParams = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                queryParams[_i - 4] = arguments[_i];
            }
            return post.apply(void 0, [Environment.armEndpoint + uri, contentType, data, "api-version=" + apiVersion].concat(queryParams));
        }
        Network.postResource = postResource;
        function deleteResource(uri, apiVersion) {
            var queryParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                queryParams[_i - 2] = arguments[_i];
            }
            return ajax("" + Environment.armEndpoint + uri + "?api-version=" + apiVersion, "DELETE", queryParams, noop);
        }
        Network.deleteResource = deleteResource;
    })(Network || (Network = {}));
    return Network;
});
