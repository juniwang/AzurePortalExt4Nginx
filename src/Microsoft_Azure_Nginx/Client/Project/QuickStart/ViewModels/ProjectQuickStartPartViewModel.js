var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings"], function (require, exports, Strings) {
    "use strict";
    var ProjectQuickStartPartViewModel = (function (_super) {
        __extends(ProjectQuickStartPartViewModel, _super);
        function ProjectQuickStartPartViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.title(Strings.quickStartTitle);
            _this.shortTitle(Strings.quickStartShortTitle);
            _this.description(Strings.quickStartDescription);
            _this.icon(MsPortalFx.Base.Images.AzureQuickstart());
            return _this;
        }
        return ProjectQuickStartPartViewModel;
    }(MsPortalFx.ViewModels.QuickStartPart));
    exports.ProjectQuickStartPartViewModel = ProjectQuickStartPartViewModel;
});
