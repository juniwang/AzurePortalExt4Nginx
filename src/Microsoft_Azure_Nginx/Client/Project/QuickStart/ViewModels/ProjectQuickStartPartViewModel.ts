// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Strings from "NginxStrings";
import * as ProjectArea from "Project/ProjectArea";

export class ProjectQuickStartPartViewModel extends MsPortalFx.ViewModels.QuickStartPart {
    constructor(container: MsPortalFx.ViewModels.PartContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super();

        this.title(Strings.quickStartTitle);
        this.shortTitle(Strings.quickStartShortTitle);
        this.description(Strings.quickStartDescription);
        this.icon(MsPortalFx.Base.Images.AzureQuickstart());
    }
}