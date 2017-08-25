define(["require", "exports"], function (require, exports) {
    "use strict";
    var TextBox = MsPortalFx.ViewModels.Forms.TextBox;
    var DeploymentOpeningPart = (function () {
        function DeploymentOpeningPart(container, initialData, dataContext) {
            var _this = this;
            this.id = ko.observable();
            this.box = new TextBox.ViewModel(container);
            this.box.value.subscribe(container, function (nv) { return _this.id(nv); });
        }
        DeploymentOpeningPart.prototype.onInputsSet = function (inputs) {
            return null;
        };
        return DeploymentOpeningPart;
    }());
    exports.DeploymentOpeningPart = DeploymentOpeningPart;
});
