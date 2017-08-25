define(["require", "exports", "Constants", "MsPortalFx/Globalization", "DataModels/TypeMetadata", "_generated/ExtensionDefinition", "Shared/Caches"], function (require, exports, Constants, Globalization, TypeMetadata_1, ExtensionDefinition_1, Caches_1) {
    "use strict";
    var log = Logger("ProjectArea/DataContext");
    var DataContext = (function () {
        function DataContext() {
            this.projectQueryCache = DataContext._projectQueryCacheSingletonFactory();
            this.projectEntityCache = DataContext._projectEntityCacheSingletonFactory();
            this.serviceQueryCache = DataContext._serviceQueryCacheSingletonFactory();
            this.serviceEntityCache = DataContext._serviceEntityCacheSingletonFactory();
        }
        DataContext._readServiceStatus = function (serviceStatus, projectId) {
            var service = {};
            service.id = projectId + "/server/" + serviceStatus.id;
            service.weight = serviceStatus.weight;
            service.type = "Container";
            service.state = serviceStatus.state;
            service.name = serviceStatus.id;
            service.host = serviceStatus.host;
            service.updated = Globalization.DateTimeFormat.create({
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }).format(new Date(serviceStatus.updated));
            return service;
        };
        DataContext._stripPort = function (uri) {
            if (!uri) {
                return null;
            }
            var portIndex = uri.lastIndexOf(":");
            return portIndex > 0 ? uri.substring(0, portIndex) : uri;
        };
        return DataContext;
    }());
    DataContext._projectQueryCacheSingletonFactory = MsPortalFx.memoize(function () { return new Caches_1.QueryCache(TypeMetadata_1.ProjectMetadata.cacheEntityTypeName, Constants.apiVersion, function (config) {
        config.poll = true;
        config.pollInterval = 60 * 1000;
    }); });
    DataContext._projectEntityCacheSingletonFactory = MsPortalFx.memoize(function () { return new Caches_1.EntityCache(TypeMetadata_1.ProjectMetadata.cacheEntityTypeName, Constants.apiVersion, function (config) {
        config.poll = true;
        config.pollInterval = 60 * 1000;
        var originalSupplyData = config.supplyData;
        config.supplyData = function (httpMethod, id) {
            var promise = originalSupplyData(httpMethod, id, undefined, undefined, undefined, undefined);
            promise.catch(function (failure) {
                var jqXHR = failure && failure.jqXHR;
                if (jqXHR && jqXHR.status === 404) {
                    log.telemetry("ProjectDeleted", "Entity cache 404", id);
                    MsPortalFx.UI.AssetManager.notifyAssetDeleted(ExtensionDefinition_1.AssetTypeNames.project, id, ExtensionDefinition_1.definitionName);
                }
            });
            return promise;
        };
        var findCachedEntity = {
            queryCache: DataContext._projectQueryCacheSingletonFactory(),
            entityMatchesId: function (project, id) { return MsPortalFx.ViewModels.Services.ResourceTypes.compareResourceId(project && project.id && project.id(), id); },
        };
        config.findCachedEntity = findCachedEntity;
    }); });
    DataContext._serviceQueryCacheSingletonFactory = MsPortalFx.memoize(function () { return new Caches_1.QueryCache(TypeMetadata_1.ProjectMetadata.serviceCacheEntityTypeName, Constants.apiVersion, function (options) {
        options.poll = true;
        options.pollInterval = 60 * 1000;
        options.sourceUri = function (id) { return id + "/servers"; };
        options.supplyData = function (httpMethod, servicesEndpoint) {
            return Caches_1.getData(servicesEndpoint, Constants.apiVersion).then(function (response) {
                var servicesResponse = response.data;
                var services = [];
                for (var _i = 0, _a = servicesResponse.properties.servers; _i < _a.length; _i++) {
                    var serviceStatus = _a[_i];
                    services.push(DataContext._readServiceStatus(serviceStatus, servicesEndpoint));
                }
                return services;
            });
        };
    }); });
    DataContext._serviceEntityCacheSingletonFactory = MsPortalFx.memoize(function () { return new Caches_1.EntityCache(TypeMetadata_1.ProjectMetadata.serviceCacheEntityTypeName, Constants.apiVersion, function (options) {
        options.poll = true;
        options.pollInterval = 60 * 1000;
        options.supplyData = function (httpMethod, uri) {
            return Q();
        };
        options.findCachedEntity = {
            queryCache: DataContext._serviceQueryCacheSingletonFactory(),
            entityMatchesId: function (service, id) { return MsPortalFx.ViewModels.Services.ResourceTypes.compareResourceId(service && service.id && service.id(), id); },
        };
    }); });
    exports.DataContext = DataContext;
});
