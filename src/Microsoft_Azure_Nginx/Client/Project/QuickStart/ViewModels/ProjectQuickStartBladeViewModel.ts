// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Strings from "ProjectStrings";
import * as ProjectArea from "Project/ProjectArea";

export class ProjectQuickStartBladeViewModel extends MsPortalFx.ViewModels.Blade {
    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super();
        this.title(Strings.quickStartBladeTitle);
        this.subtitle(Strings.quickStartBladeSubtitle);
    }
}