var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Fx/Internal/Composition/ViewModelAdapters", "../../../Project/Summary/ViewModels/ProjectBlade"], function (require, exports, Adapters, Module) {
    "use strict";
    var ProjectBladeAdapter = (function (_super) {
        __extends(ProjectBladeAdapter, _super);
        function ProjectBladeAdapter(container, initialState, dataContext) {
            return _super.call(this, container, initialState, dataContext, Module.ProjectBlade) || this;
        }
        return ProjectBladeAdapter;
    }(Adapters.ViewModelAdapter));
    exports.ProjectBladeAdapter = ProjectBladeAdapter;
});
