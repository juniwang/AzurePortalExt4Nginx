var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "NginxStrings", "../../../_generated/ExtensionDefinition"], function (require, exports, Strings, ExtensionDefinition) {
    "use strict";
    var MsFxProperties = MsPortalFx.ViewModels.Parts.Properties;
    var PropertiesPartViewModel = (function (_super) {
        __extends(PropertiesPartViewModel, _super);
        function PropertiesPartViewModel(container, initialState, dataContext) {
            var _this = _super.call(this, initialState) || this;
            _this.id = ko.observable();
            _this.resource = ko.observable();
            _this._binder = dataContext.projectEntityCache.binder(container, _this.id);
            _this._container = container;
            return _this;
        }
        PropertiesPartViewModel.prototype.onInputsSet = function (inputs) {
            this.id(inputs.id);
            this.resource(inputs.resource);
            this.populateProperties(this._container);
            return this._binder.promise;
        };
        PropertiesPartViewModel.prototype.populateProperties = function (lifetime) {
            var p1 = new MsFxProperties.TextProperty(Strings.projectNameColumn, this._binder.binding(function (p) { return p.name(); }, Strings.loadingText));
            var p2 = new MsFxProperties.TextProperty(Strings.projectLocationColumn, this._binder.binding(function (p) { return p.location(); }, Strings.loadingText));
            var p22 = new MsFxProperties.TextProperty("Nginx Version", this.resource().properties["nginxVersion"]);
            var p3 = new MsFxProperties.CopyFieldProperty(lifetime, Strings.subscriptionId, this._binder.binding(function (p) { return MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(p.id()).subscription; }, Strings.loadingText));
            var p4 = new MsFxProperties.LinkProperty("Host", "http://portal.azure.com");
            var p5 = new MsFxProperties.OpenBladeProperty("FirstBlade", "FirstBlade", { detailBlade: ExtensionDefinition.BladeNames.projectQuickStartBlade, detailBladeInputs: {} });
            var p6 = new MsFxProperties.CallbackProperty("Callback", "Callback", function () {
                console.log("callback called");
            });
            this.setProperties([p1, p2, p22, p3, p4, p5, p6]);
        };
        return PropertiesPartViewModel;
    }(MsPortalFx.ViewModels.Parts.Properties.ViewModel));
    exports.PropertiesPartViewModel = PropertiesPartViewModel;
});
