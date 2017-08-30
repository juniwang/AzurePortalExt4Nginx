var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ProjectStrings"], function (require, exports, Strings) {
    "use strict";
    var PropertiesBladeViewModel = (function (_super) {
        __extends(PropertiesBladeViewModel, _super);
        function PropertiesBladeViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.resourceId = ko.observable();
            _this.resource = ko.observable();
            _this.title(Strings.propertiesBladeTitle);
            _this.icon(MsPortalFx.Base.Images.Polychromatic.Info());
            return _this;
        }
        PropertiesBladeViewModel.prototype.onInputsSet = function (inputs) {
            this.resourceId(inputs.id);
            this.resource(inputs.resource);
            this.title(Strings.propertiesBladeTitle);
            return null;
        };
        return PropertiesBladeViewModel;
    }(MsPortalFx.ViewModels.Blade));
    exports.PropertiesBladeViewModel = PropertiesBladeViewModel;
});
