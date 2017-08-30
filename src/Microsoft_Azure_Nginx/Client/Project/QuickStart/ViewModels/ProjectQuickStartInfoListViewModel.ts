// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Strings from "NginxStrings";
import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import * as ProjectArea from "Project/ProjectArea";

export class ProjectQuickStartInfoListViewModel extends MsPortalFx.ViewModels.Parts.InfoList.ViewModel {
    constructor(container: MsPortalFx.ViewModels.PartContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super(initialState);

        // Sections are blocks of text.
        // They can have an icon or number (if no icon is provided).
        // They can be a link or bladeLink via the selection property
        //         or: If they are niether, then the links property can show many links & bladeLinks.

        // add a section to open an external webpage.
        this.addSection(Strings.quickStartInfoListTitle1,
            Strings.quickStartInfoListDesc1,
            Strings.htmlSiteMSDNAddress,
            MsPortalFx.Base.Images.Tools());

        // add a section to open a blade.
        this.addSection(
            Strings.quickStartInfoListTitle2,
            Strings.quickStartInfoListDesc2, {
                detailBlade: ExtensionDefinition.BladeNames.projectQuickStartBlade,
                detailBladeInputs: {},
            }, MsPortalFx.Base.Images.Polychromatic.Heart());
    }
}