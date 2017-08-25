var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Fx/Internal/Composition/ViewModelAdapters", "../../../Project/Services/ViewModels/ServiceBlade"], function (require, exports, Adapters, Module) {
    "use strict";
    var ServiceBladeAdapter = (function (_super) {
        __extends(ServiceBladeAdapter, _super);
        function ServiceBladeAdapter(container, initialState, dataContext) {
            return _super.call(this, container, initialState, dataContext, Module.ServiceBlade) || this;
        }
        return ServiceBladeAdapter;
    }(Adapters.ViewModelAdapter));
    exports.ServiceBladeAdapter = ServiceBladeAdapter;
});
