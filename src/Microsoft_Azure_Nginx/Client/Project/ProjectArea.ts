// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Constants from "Constants";
import * as Globalization from "MsPortalFx/Globalization";
import * as Network from "Shared/Network";
import * as Strings from "NginxStrings";
import { ProjectMetadata } from "DataModels/TypeMetadata";
import { definitionName as extensionName, AssetTypeNames } from "_generated/ExtensionDefinition";
import { EntityCache, QueryCache, getData } from "Shared/Caches";

const log = Logger("ProjectArea/DataContext");

export class DataContext {

    // Provides a 'load by id' style cache for Project resources
    public readonly projectQueryCache = DataContext._projectQueryCacheSingletonFactory();
    public readonly projectEntityCache = DataContext._projectEntityCacheSingletonFactory();

    private static readonly _projectQueryCacheSingletonFactory = MsPortalFx.memoize(() => new QueryCache(ProjectMetadata.cacheEntityTypeName, Constants.apiVersion, config => {
        config.poll = true;
        config.pollInterval = 60 * 1000;
    }));

    private static readonly _projectEntityCacheSingletonFactory = MsPortalFx.memoize(() => new EntityCache(ProjectMetadata.cacheEntityTypeName, Constants.apiVersion, config => {
        config.poll = true;
        config.pollInterval = 60 * 1000;
        const originalSupplyData = config.supplyData;
        config.supplyData = (httpMethod: string, id: string) => {
            const promise = originalSupplyData(httpMethod, id, undefined, undefined, undefined, undefined);
            promise.catch((failure: NetError<Untyped>) => {
                const jqXHR = failure && failure.jqXHR;
                if (jqXHR && jqXHR.status === 404) {
                    log.telemetry("ProjectDeleted", "Entity cache 404", id);
                    MsPortalFx.UI.AssetManager.notifyAssetDeleted(AssetTypeNames.project, id, extensionName);
                }
            });
            return promise;
        };
        const findCachedEntity: MsPortalFx.Data.FindCachedEntityInQueryCacheOptions<Project.DataModels.ObservableProject, string> = {
            queryCache: DataContext._projectQueryCacheSingletonFactory(),
            entityMatchesId: (project, id) => MsPortalFx.ViewModels.Services.ResourceTypes.compareResourceId(project && project.id && project.id(), id),
        };
        config.findCachedEntity = findCachedEntity;
    }));

    // Provides a 'load by id' style cache for Services
    public readonly serviceQueryCache = DataContext._serviceQueryCacheSingletonFactory();
    public readonly serviceEntityCache = DataContext._serviceEntityCacheSingletonFactory();

    private static readonly _serviceQueryCacheSingletonFactory = MsPortalFx.memoize(() => new QueryCache(ProjectMetadata.serviceCacheEntityTypeName, Constants.apiVersion, options => {
        options.poll = true;
        options.pollInterval = 60 * 1000;
        options.sourceUri = id => id + "/servers";
        options.supplyData = (httpMethod: string, servicesEndpoint: string) =>
            getData<Project.DataModels.ListServicesResponse>(servicesEndpoint, Constants.apiVersion).then(response => {
                const servicesResponse = response.data;
                const services: Project.DataModels.ProjectService[] = [];

                // Services
                for (const serviceStatus of servicesResponse.properties.servers) {
                    services.push(DataContext._readServiceStatus(serviceStatus, servicesEndpoint));
                }

                return services;
            });
    }));

    private static readonly _serviceEntityCacheSingletonFactory = MsPortalFx.memoize(() => new EntityCache(ProjectMetadata.serviceCacheEntityTypeName, Constants.apiVersion, options => {
        options.poll = true;
        options.pollInterval = 60 * 1000;
        options.supplyData = (httpMethod: string, uri: string) => {
            // TODO: Enable this when we have the final endpoint
            //const requestParts = uri.split("/services/");
            //const serviceEndpoint = requestParts[0];
            //const serviceName = requestParts[1];
            //return Network.post(`${Environment.armEndpoint}${serviceEndpoint}/getServiceProperties`, "application/json", serviceName, `api-version=${Constants.apiVersion}`).then((response) => {
            //    return DataContext._readServiceStatus(response.content as Project.DataModels.ServiceStatus, serviceEndpoint);
            //});
            return Q();
        };
        options.findCachedEntity = {
            queryCache: DataContext._serviceQueryCacheSingletonFactory(),
            entityMatchesId: (service, id) => MsPortalFx.ViewModels.Services.ResourceTypes.compareResourceId(service && service.id && service.id(), id),
        };
    }));

    private static _readServiceStatus(serviceStatus: Project.DataModels.ServerStatus, projectId: string): Project.DataModels.ProjectService {
        const service = {} as Project.DataModels.ProjectService;

        service.id = `${projectId}/server/${serviceStatus.id}`;
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
    }

    private static _stripPort(uri: string) {
        if (!uri) {
            return null;
        }

        const portIndex = uri.lastIndexOf(":");
        return portIndex > 0 ? uri.substring(0, portIndex) : uri;
    }

}