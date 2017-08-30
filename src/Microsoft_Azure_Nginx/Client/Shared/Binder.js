define(["require", "exports"], function (require, exports) {
    "use strict";
    var Binder = (function () {
        function Binder(_view, _container, _resourceId) {
            this._view = _view;
            this._container = _container;
            this._resourceId = _resourceId;
            this.activate(this._resourceId);
        }
        Binder.prototype.activate = function (resourceId) {
            var _this = this;
            this._resourceId.subscribeAndRun(this._container, function (id) {
                if (id)
                    _this._promise = Q(_this._view.fetch(id));
            });
        };
        Binder.prototype.refresh = function () {
            return Q(this._view.refresh());
        };
        Object.defineProperty(Binder.prototype, "item", {
            get: function () {
                return this._view.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Binder.prototype, "promise", {
            get: function () {
                return this._promise;
            },
            enumerable: true,
            configurable: true
        });
        Binder.prototype.binding = function (func, defaultValue) {
            var _this = this;
            return ko.computed(this._container, function () {
                var c = _this._view.item();
                return c ? func(c) : defaultValue;
            });
        };
        Binder.prototype.bind = function (target, func, defaultValue) {
            this.binding(func, defaultValue).subscribe(this._container, function (value) {
                if (target.peek() !== value)
                    target(value);
            });
        };
        Binder.prototype.bindingObservable = function (func, defaultValue) {
            var observable = ko.observable(defaultValue);
            this.bind(observable, func, defaultValue);
            return observable;
        };
        return Binder;
    }());
    exports.Binder = Binder;
});
