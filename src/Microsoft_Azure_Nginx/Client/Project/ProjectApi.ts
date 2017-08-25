// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Constants from "Constants";
import * as Network from "Shared/Network";

import DataModels = Project.DataModels;
import MsPortalFxNet = MsPortalFx.Base.Net2;

module ProjectApi {

    export const ArmEndpoint = window.fx.environment && window.fx.environment.armEndpoint && window.fx.environment.armEndpoint.replace(/\/$/, "");

    export function getStatus(id: string): NetPromise<DataModels.Project> {
        return Network.getResource<DataModels.Project>(id, Constants.apiVersion);
    }

    export function getConnectionDetails(id: string): NetPromise<DataModels.Project> {
        return Network.postResource<DataModels.Project>(id, Constants.apiVersion);
    }

    export function deleteProject(id: string): Promise {
        return Network.deleteResource(id, Constants.apiVersion);
    }
    
    export function getProjectNameFromId(id: string) {
        return MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(id).resource;
    }
}

export = ProjectApi;