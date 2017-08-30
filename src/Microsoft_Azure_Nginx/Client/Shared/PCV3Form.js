var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var FxViewModels = MsPortalFx.ViewModels;
    var Forms = FxViewModels.Forms;
    var ParameterProvider = FxViewModels.ParameterProvider;
    var AsymmetricForm = (function (_super) {
        __extends(AsymmetricForm, _super);
        function AsymmetricForm(container, mapIncoming, mapOutgoing, actionBar) {
            var _this = _super.call(this, container) || this;
            _this.title = ko.observable();
            _this.icon = ko.observable();
            _this.subtitle = ko.observable();
            _this.formElements = ko.observableArray([]);
            _this.parameterProvider = new ParameterProvider(container, {
                mapIncomingDataForEditScopeAsync: function (incoming) {
                    var config = _this.parameterProvider.configFromCollector();
                    var mapped = mapIncoming(_this)(incoming, config);
                    return Q.isPromise(mapped) ? mapped : Q(mapped);
                },
                mapOutgoingDataForCollector: mapOutgoing(_this),
            });
            _this.editScope = _this.parameterProvider.editScope;
            _this.actionBar = actionBar;
            _this.valid.subscribe(container, _this.actionBar.valid);
            _this.sections.push(new Forms.Section.ViewModel(container, {
                children: _this.formElements,
            }));
            return _this;
        }
        return AsymmetricForm;
    }(Forms.Form.ViewModel));
    exports.AsymmetricForm = AsymmetricForm;
    var SymmetricForm = (function (_super) {
        __extends(SymmetricForm, _super);
        function SymmetricForm() {
            return _super.apply(this, arguments) || this;
        }
        return SymmetricForm;
    }(AsymmetricForm));
    exports.SymmetricForm = SymmetricForm;
});
