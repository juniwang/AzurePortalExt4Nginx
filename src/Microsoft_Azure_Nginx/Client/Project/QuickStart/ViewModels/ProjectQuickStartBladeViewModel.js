var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings"], function (require, exports, Strings) {
    "use strict";
    var ProjectQuickStartBladeViewModel = (function (_super) {
        __extends(ProjectQuickStartBladeViewModel, _super);
        function ProjectQuickStartBladeViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.title(Strings.quickStartBladeTitle);
            _this.subtitle(Strings.quickStartBladeSubtitle);
            return _this;
        }
        return ProjectQuickStartBladeViewModel;
    }(MsPortalFx.ViewModels.Blade));
    exports.ProjectQuickStartBladeViewModel = ProjectQuickStartBladeViewModel;
});
