var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ProjectStrings", "_generated/ExtensionDefinition"], function (require, exports, Strings, ExtensionDefinition) {
    "use strict";
    var ProjectQuickStartInfoListViewModel = (function (_super) {
        __extends(ProjectQuickStartInfoListViewModel, _super);
        function ProjectQuickStartInfoListViewModel(container, initialState, dataContext) {
            var _this = _super.call(this, initialState) || this;
            _this.addSection(Strings.quickStartInfoListTitle1, Strings.quickStartInfoListDesc1, Strings.htmlSiteMSDNAddress, MsPortalFx.Base.Images.Tools());
            _this.addSection(Strings.quickStartInfoListTitle2, Strings.quickStartInfoListDesc2, {
                detailBlade: ExtensionDefinition.BladeNames.projectQuickStartBlade,
                detailBladeInputs: {},
            }, MsPortalFx.Base.Images.Polychromatic.Heart());
            return _this;
        }
        return ProjectQuickStartInfoListViewModel;
    }(MsPortalFx.ViewModels.Parts.InfoList.ViewModel));
    exports.ProjectQuickStartInfoListViewModel = ProjectQuickStartInfoListViewModel;
});
