// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

"use strict"

import * as Network from "Shared/Network";
import { Binder } from "Shared/Binder";
import { ProjectMetadata, defineMetadata } from "DataModels/TypeMetadata";

import Data = MsPortalFx.Data;

export const getData = <T>(uri: string, apiVersion: string) => Network.getResourceCached<T>(uri, apiVersion);

export class EntityCache<K extends ProjectMetadata.MetadataName>
    extends Data.EntityCache<ProjectMetadata.TypeMap[K], string> {

    constructor(cacheName: K, apiVersion: string, configure?: (options: Data.EntityCacheConfig<ProjectMetadata.TypeMap[K], string>) => void) {
        defineMetadata();
        type TEntity = ProjectMetadata.TypeMap[K];
        const config: Data.EntityCacheConfig<TEntity, string> = {
            entityTypeName: cacheName,
            extendEntryLifetimes: true,
            sourceUri: id => id,
            supplyData: (httpMethod: string, uri: string) => getData(uri, apiVersion),
        };
        (configure || noop)(config);
        super(config);
    }

    public binder(container: LifetimeManager, id: KnockoutObservableBase<string>) {
        return new Binder(this.createView(container), container, id);
    }
}

export class QueryCache<K extends ProjectMetadata.MetadataName>
    extends Data.QueryCache<ProjectMetadata.TypeMap[K], string> {

    constructor(cacheName: K, apiVersion: string, configure?: (options: Data.QueryCacheConfig<ProjectMetadata.TypeMap[K], string>) => void) {
        defineMetadata();
        type TEntities = ProjectMetadata.TypeMap[K];
        const config: Data.QueryCacheConfig<TEntities, string> = {
            entityTypeName: cacheName,
            extendEntryLifetimes: true,
            supplyData: (httpMethod: string, uri: string) => getData(uri, apiVersion),
            serializeParams: query => query,
        };
        (configure || noop)(config);
        super(config);
    }
}