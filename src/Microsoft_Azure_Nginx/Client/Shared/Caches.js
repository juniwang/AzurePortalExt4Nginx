var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Shared/Network", "Shared/Binder", "DataModels/TypeMetadata"], function (require, exports, Network, Binder_1, TypeMetadata_1) {
    "use strict";
    var Data = MsPortalFx.Data;
    exports.getData = function (uri, apiVersion) { return Network.getResourceCached(uri, apiVersion); };
    var EntityCache = (function (_super) {
        __extends(EntityCache, _super);
        function EntityCache(cacheName, apiVersion, configure) {
            var _this;
            TypeMetadata_1.defineMetadata();
            var config = {
                entityTypeName: cacheName,
                extendEntryLifetimes: true,
                sourceUri: function (id) { return id; },
                supplyData: function (httpMethod, uri) { return exports.getData(uri, apiVersion); },
            };
            (configure || noop)(config);
            _this = _super.call(this, config) || this;
            return _this;
        }
        EntityCache.prototype.binder = function (container, id) {
            return new Binder_1.Binder(this.createView(container), container, id);
        };
        return EntityCache;
    }(Data.EntityCache));
    exports.EntityCache = EntityCache;
    var QueryCache = (function (_super) {
        __extends(QueryCache, _super);
        function QueryCache(cacheName, apiVersion, configure) {
            var _this;
            TypeMetadata_1.defineMetadata();
            var config = {
                entityTypeName: cacheName,
                extendEntryLifetimes: true,
                supplyData: function (httpMethod, uri) { return exports.getData(uri, apiVersion); },
                serializeParams: function (query) { return query; },
            };
            (configure || noop)(config);
            _this = _super.call(this, config) || this;
            return _this;
        }
        return QueryCache;
    }(Data.QueryCache));
    exports.QueryCache = QueryCache;
});
