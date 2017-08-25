// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import Metadata = MsPortalFx.Data.Metadata;
import MetadataProperty = Metadata.MetadataProperty;
import setTypeMetadata = Metadata.setTypeMetadata;

type TypedProperties<T> = Record<keyof T, MetadataProperty>;

// Ideally this would just extend Metadata.Metadata and only overwrite the name and properties fields
// But the typechecker doesn't seem to like that we've limited the set of properties that we set :(
interface TypedMetadata<K extends ProjectMetadata.MetadataName> {
    name: K;
    idProperties?: string[];
    properties: TypedProperties<ProjectMetadata.TypeMap[K]>;
    entityType?: boolean;
    hasGloballyUniqueId?: boolean;
}

export module ProjectMetadata {
    export type MetadataName = keyof TypeMap;

    // Note that these could all be of type 'MetadataName' (But we can't make them generic and have type inference work)
    // The names map to the types cached through the TypeMap
    export const cacheEntityTypeName = "ProjectResource";
    export const serviceCacheEntityTypeName = "ProjectService";

    // These are the types used by entity/query/editscope caches
    export interface TypeMap {
        ProjectResource: Project.DataModels.ObservableProject;
        ProjectService: Project.DataModels.ObservableProjectService;
    }
}

const fromDefault = (defaults: Readonly<MetadataProperty> = {}) => {
    let func = <K extends keyof MetadataProperty>(name: K, options?: Partial<MetadataProperty>) => {
        let value = options && options[name];
        return typeof value == undefinedType ? defaults[name] : value;
    };
    return (options?: Partial<MetadataProperty>) => ({
        itemType: func("itemType", options),
        isArray: func("isArray", options),
        isDate: func("isDate", options),
        persistEdits: func("persistEdits", options),
        trackEdits: func("trackEdits", options),
    });
};

const setNamedMetadata = <K extends ProjectMetadata.MetadataName>(type: K, metadata: TypedMetadata<K>) =>
    setTypeMetadata(type,
        {
            name: metadata.name,
            idProperties: metadata.idProperties,
            properties: metadata.properties as Magic, // Typechecker doesn't like that our property object isn't a StringMap<MetadataProperty> but I like it that way
            entityType: metadata.entityType,
            hasGloballyUniqueId: metadata.hasGloballyUniqueId,
        });

// Edits will be persisted to user settings
const defaultProperty = fromDefault({
    itemType: null,
    isArray: false,
    isDate: false,
    persistEdits: false,
    trackEdits: true,
});

// Edits won't be persisted to user settings
const persistProperty = fromDefault({
    itemType: null,
    isArray: false,
    isDate: false,
    persistEdits: true,
    trackEdits: true,
});

export const defineMetadata = MsPortalFx.memoize(() => {

    // Project
    const projectProperties = "ProjectProperties";
    const projectPropertiesTypeProperties: TypedProperties<Project.DataModels.ProjectProperties> = {
        provisioningState: persistProperty(),
    };
    setTypeMetadata(projectProperties, {
        name: projectProperties,
        properties: projectPropertiesTypeProperties,
    });

    const projectResourceTypeProperties: TypedProperties<Project.DataModels.Project> = {
        id: persistProperty(),
        name: persistProperty(),
        type: persistProperty(),
        location: persistProperty(),
        tags: defaultProperty(),
        properties: defaultProperty({ itemType: projectProperties }),
    };
    setNamedMetadata(ProjectMetadata.cacheEntityTypeName, {
        name: ProjectMetadata.cacheEntityTypeName,
        properties: projectResourceTypeProperties,
        entityType: false,
        hasGloballyUniqueId: true,
        idProperties: ["id"],
    });

    // Service
    const serviceTypeProperties: TypedProperties<Project.DataModels.ProjectService> = {
        id: persistProperty(),
        name: persistProperty(),
        type: persistProperty(),
        state: persistProperty(),
        updated: persistProperty(),
        host: persistProperty(),
        weight: persistProperty(),
    };

    setNamedMetadata(ProjectMetadata.serviceCacheEntityTypeName, {
        name: ProjectMetadata.serviceCacheEntityTypeName,
        idProperties: ["id"],
        properties: serviceTypeProperties,
        entityType: false,
        hasGloballyUniqueId: false,
    });

});