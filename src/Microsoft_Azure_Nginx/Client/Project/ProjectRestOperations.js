var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "ProjectStrings", "Shared/RestOperationTracker", "Project/ProjectApi"], function (require, exports, ProjectStrings_1, RestOperationTracker_1, ProjectApi) {
    "use strict";
    var DeleteProject = (function (_super) {
        __extends(DeleteProject, _super);
        function DeleteProject(id, blade) {
            return _super.call(this, id, blade, undefined, ProjectApi.ArmEndpoint) || this;
        }
        DeleteProject.prototype.nameof = function () { return "DeleteProject"; };
        DeleteProject.prototype.getStrings = function () {
            return ProjectStrings_1.Operations.Delete;
        };
        DeleteProject.prototype.makeRequest = function (input) {
            return ProjectApi.deleteProject(this.id);
        };
        return DeleteProject;
    }(RestOperationTracker_1.SingleRequestSingleResponse));
    exports.DeleteProject = DeleteProject;
});
