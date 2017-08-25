var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ClientResources"], function (require, exports, ClientResources) {
    "use strict";
    var log = Logger("DeploymentInfoPart");
    var DeploymentInfoPart = (function (_super) {
        __extends(DeploymentInfoPart, _super);
        function DeploymentInfoPart(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.id = ko.observable();
            log.telemetry("PinnedPart", Environment.version, _this.id);
            setInterval(function () {
                log.telemetry("PinnedPart", Environment.version, _this.id);
            }, 60 * 60 * 1000);
            _this.icon(MsPortalFx.Base.Images.StatusBadge.Canceled());
            _this.subtitle(ClientResources.unpinMe);
            _this.title(ClientResources.unpinMe);
            _this.description(ClientResources.unpinMe);
            _this.contentStateDisplayText(ClientResources.unpinMe);
            _this.commandBar = new MsPortalFx.ViewModels.Toolbars.Toolbar(container);
            container.notFoundMessage(ClientResources.unpinMe);
            return _this;
        }
        DeploymentInfoPart.prototype.onInputsSet = function (input) {
            this.id(input.id);
            log.telemetry("PinnedPart", Environment.version, this.id);
            return null;
        };
        return DeploymentInfoPart;
    }(MsPortalFx.ViewModels.Blade));
    exports.DeploymentInfoPart = DeploymentInfoPart;
});
