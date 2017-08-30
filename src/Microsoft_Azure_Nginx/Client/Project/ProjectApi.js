define(["require", "exports", "Constants", "Shared/Network"], function (require, exports, Constants, Network) {
    "use strict";
    var ProjectApi;
    (function (ProjectApi) {
        ProjectApi.ArmEndpoint = window.fx.environment && window.fx.environment.armEndpoint && window.fx.environment.armEndpoint.replace(/\/$/, "");
        function getStatus(id) {
            return Network.getResource(id, Constants.apiVersion);
        }
        ProjectApi.getStatus = getStatus;
        function getConnectionDetails(id) {
            return Network.postResource(id, Constants.apiVersion);
        }
        ProjectApi.getConnectionDetails = getConnectionDetails;
        function deleteProject(id) {
            return Network.deleteResource(id, Constants.apiVersion);
        }
        ProjectApi.deleteProject = deleteProject;
        function getProjectNameFromId(id) {
            return MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(id).resource;
        }
        ProjectApi.getProjectNameFromId = getProjectNameFromId;
    })(ProjectApi || (ProjectApi = {}));
    return ProjectApi;
});
