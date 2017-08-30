var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings", "_generated/Svg"], function (require, exports, Strings, Svg_1) {
    "use strict";
    var FxViewModels = MsPortalFx.ViewModels;
    var ProjectPartViewModel = (function (_super) {
        __extends(ProjectPartViewModel, _super);
        function ProjectPartViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.icon = ko.observable(Svg_1.Content.SVG.project);
            _this.assetType = ko.observable(Strings.AssetTypeNames.Project.singular);
            if (initialState.content && initialState.content.assetId) {
                _this.assetId(initialState.content.assetId);
            }
            _this.state(FxViewModels.ContentState.Success);
            return _this;
        }
        ProjectPartViewModel.prototype.onInputsSet = function (inputs) {
            this.assetId(inputs.id);
            var descriptor = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(inputs.id);
            this.assetName(descriptor.resource);
            return null;
        };
        return ProjectPartViewModel;
    }(FxViewModels.AssetPart));
    exports.ProjectPartViewModel = ProjectPartViewModel;
});
