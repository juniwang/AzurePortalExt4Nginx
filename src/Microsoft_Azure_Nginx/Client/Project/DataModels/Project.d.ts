// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import AzureModels = DataModels.Azure;

declare module Project.DataModels {
    // Project
    interface Project extends AzureModels.Resource<ProjectProperties> {
    }
    export type ObservableProject = Observable<Project>;

    interface ProjectProperties {
        provisioningState: string;
    }

    // Project Name Availability
    interface NameAvailability {
        nameAvailable: boolean;
        reason: string;
        message: string;
    }

    // Service
    interface ProjectService {
        id: string;
        name: string;
        type: string;
        state: string;
        updated: string;
        host: string;
        weight: string;
    }
    export type ObservableProjectService = Observable<ProjectService>;

    export interface ServiceSelectionItem {
        id: string;
    }

    // List Services response
    interface ListServicesResponse {
        id: string;
        name: string;
        location: string;
        properties: NginxStatus;
    }

    interface NginxStatus {
        enabled: boolean;
        nginxVersion: string;
        servers: ServerStatus[];
    }

    interface ServerStatus {
        id: string;
        host: string;
        weight: string;
        state: string;
        updated: string;
    }
}
