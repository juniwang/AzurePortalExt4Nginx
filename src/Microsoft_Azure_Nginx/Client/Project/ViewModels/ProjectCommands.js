define(["require", "exports", "NginxStrings", "Project/ProjectRestOperations"], function (require, exports, Strings, ProjectRestOperations_1) {
    "use strict";
    var FxViewModels = MsPortalFx.ViewModels;
    var Dialogs = FxViewModels.Dialogs;
    var Images = MsPortalFx.Base.Images;
    var ProjectDelete = (function () {
        function ProjectDelete(getId, blade) {
            this.getId = getId;
            this.blade = blade;
            this.canExecute = ko.observable(true);
        }
        ProjectDelete.prototype.execute = function (result) {
            var _this = this;
            if (result === 6) {
                this.canExecute(false);
                var id = this.getId();
                var deleteOp = new ProjectRestOperations_1.DeleteProject(id, this.blade);
                var promise = deleteOp.run();
                Q.any([promise, Q.delay(2000)]).finally(function () { return _this.canExecute(true); });
            }
            return Q(true);
        };
        return ProjectDelete;
    }());
    ProjectDelete.messageBox = new Dialogs.MessageBox(Strings.Command.Delete.title, Strings.Command.Delete.prompt, Dialogs.MessageBoxButtons.YesNo);
    ProjectDelete.icon = Images.Delete();
    ProjectDelete.label = Strings.Command.Delete.title;
    exports.ProjectDelete = ProjectDelete;
});
