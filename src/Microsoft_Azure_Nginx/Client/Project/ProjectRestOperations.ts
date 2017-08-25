// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import { Operations } from "ProjectStrings";
import { SingleRequestSingleResponse } from "Shared/RestOperationTracker";
import * as ProjectApi from "Project/ProjectApi";

export class DeleteProject extends SingleRequestSingleResponse<Untyped, Untyped> {
    public constructor(id: string, blade: string) {
        super(id, blade, undefined, ProjectApi.ArmEndpoint);
    }
    protected nameof() { return "DeleteProject" }
    protected getStrings() {
        return Operations.Delete;
    }
    protected makeRequest(input: undefined) {
        return ProjectApi.deleteProject(this.id);
    }
}