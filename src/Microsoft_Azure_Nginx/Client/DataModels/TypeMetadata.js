define(["require", "exports"], function (require, exports) {
    "use strict";
    var Metadata = MsPortalFx.Data.Metadata;
    var setTypeMetadata = Metadata.setTypeMetadata;
    var ProjectMetadata;
    (function (ProjectMetadata) {
        ProjectMetadata.cacheEntityTypeName = "ProjectResource";
        ProjectMetadata.serviceCacheEntityTypeName = "ProjectService";
    })(ProjectMetadata = exports.ProjectMetadata || (exports.ProjectMetadata = {}));
    var fromDefault = function (defaults) {
        if (defaults === void 0) { defaults = {}; }
        var func = function (name, options) {
            var value = options && options[name];
            return typeof value == undefinedType ? defaults[name] : value;
        };
        return function (options) { return ({
            itemType: func("itemType", options),
            isArray: func("isArray", options),
            isDate: func("isDate", options),
            persistEdits: func("persistEdits", options),
            trackEdits: func("trackEdits", options),
        }); };
    };
    var setNamedMetadata = function (type, metadata) {
        return setTypeMetadata(type, {
            name: metadata.name,
            idProperties: metadata.idProperties,
            properties: metadata.properties,
            entityType: metadata.entityType,
            hasGloballyUniqueId: metadata.hasGloballyUniqueId,
        });
    };
    var defaultProperty = fromDefault({
        itemType: null,
        isArray: false,
        isDate: false,
        persistEdits: false,
        trackEdits: true,
    });
    var persistProperty = fromDefault({
        itemType: null,
        isArray: false,
        isDate: false,
        persistEdits: true,
        trackEdits: true,
    });
    exports.defineMetadata = MsPortalFx.memoize(function () {
        var projectProperties = "ProjectProperties";
        var projectPropertiesTypeProperties = {
            provisioningState: persistProperty(),
        };
        setTypeMetadata(projectProperties, {
            name: projectProperties,
            properties: projectPropertiesTypeProperties,
        });
        var projectResourceTypeProperties = {
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
        var serviceTypeProperties = {
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
});
