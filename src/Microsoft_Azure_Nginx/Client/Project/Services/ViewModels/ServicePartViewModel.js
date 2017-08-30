var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings", "_generated/Svg"], function (require, exports, Strings, Svg_1) {
    "use strict";
    var FxViewModels = MsPortalFx.ViewModels;
    var ServicePartViewModel = (function (_super) {
        __extends(ServicePartViewModel, _super);
        function ServicePartViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.icon = ko.observable(Svg_1.Content.SVG.service);
            _this.assetType = ko.observable(Strings.AssetTypeNames.Service.singular);
            if (initialState.content && initialState.content.assetId) {
                _this.assetId(initialState.content.assetId);
            }
            _this.state(FxViewModels.ContentState.Success);
            return _this;
        }
        ServicePartViewModel.prototype.onInputsSet = function (inputs) {
            this.assetId(inputs.id);
            this.assetName(MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(inputs.id).resource);
            return null;
        };
        return ServicePartViewModel;
    }(FxViewModels.AssetPart));
    exports.ServicePartViewModel = ServicePartViewModel;
});
