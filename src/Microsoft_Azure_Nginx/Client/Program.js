var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Shared/InitializeExtension", "_generated/ExtensionDefinition", "_generated/ViewModelFactories"], function (require, exports, LogHelper, ExtensionDefinition, ViewModelFactories) {
    "use strict";
    var EntryPoint = (function (_super) {
        __extends(EntryPoint, _super);
        function EntryPoint() {
            return _super.apply(this, arguments) || this;
        }
        EntryPoint.prototype.initialize = function () {
            LogHelper.debug("Logging initialized");
            this.viewModelFactories = new ViewModelFactories.ViewModelFactoriesBase();
            this.viewModelFactories.Deployments().setDataContextFactory("./Deployments/DeploymentsArea", function () { return ({}); });
            this.viewModelFactories.Project().setDataContextFactory("./Project/ProjectArea", function (contextModule) { return new contextModule.DataContext(); });
            this.viewModelFactories.NginxCreate().setDataContextFactory("./NginxCreate/NginxCreateArea", function (contextModule) { return new contextModule.DataContext(); });
            LogHelper.debug("Extension initialized");
            LogHelper.telemetry("ExtensionInitialized");
            var versionLog = Logger("__Version__");
            versionLog.telemetry("UsingExtensionVersion", Environment.version);
            setInterval(function () {
                versionLog.telemetry("UsingExtensionVersion", Environment.version);
            }, 60 * 60 * 1000);
        };
        EntryPoint.prototype.getDefinition = function () {
            return ExtensionDefinition.getDefinition();
        };
        return EntryPoint;
    }(MsPortalFx.Extension.EntryPointBase));
    exports.EntryPoint = EntryPoint;
    function create() {
        return new EntryPoint();
    }
    exports.create = create;
});
