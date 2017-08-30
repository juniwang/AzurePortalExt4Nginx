var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings"], function (require, exports, Strings) {
    "use strict";
    var Toolbars = MsPortalFx.ViewModels.Toolbars;
    var SettingsBladeViewModel = (function (_super) {
        __extends(SettingsBladeViewModel, _super);
        function SettingsBladeViewModel(container, initialState, dataContext) {
            var _this = _super.call(this) || this;
            _this.title(Strings.settingsBladeTitle);
            _this.subtitle("InfoBox Playground");
            _this.icon(MsPortalFx.Base.Images.Polychromatic.Extensions());
            _this.infoBox = new MsPortalFx.ViewModels.Controls.InfoBox.LinkViewModel(container, {
                text: ko.observable('Go to the Azure Portal'),
                image: ko.observable(MsPortalFx.Base.Images.Info()),
                clickableLink: ko.observable(MsPortalFx.ViewModels.Part.createClickableLinkViewModel(ko.observable('http://portal.azure.com')))
            });
            var button = new Toolbars.OpenLinkButton("http://azure.com");
            button.label("azure.com");
            button.icon(MsPortalFx.Base.Images.AzurePortal());
            _this.commandBar = new Toolbars.Toolbar(container);
            _this.commandBar.setItems([button]);
            return _this;
        }
        SettingsBladeViewModel.prototype.onInputsSet = function (inputs) {
            console.log(inputs.id);
            return null;
        };
        return SettingsBladeViewModel;
    }(MsPortalFx.ViewModels.Blade));
    exports.SettingsBladeViewModel = SettingsBladeViewModel;
});
