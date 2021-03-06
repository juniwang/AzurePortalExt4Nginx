﻿// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ProjectArea from "Project/ProjectArea";
import * as Strings from "NginxStrings";
import * as ExtensionDefinition from "_generated/ExtensionDefinition";

import Def = ExtensionDefinition.ViewModels.Project.PropertiesBladeViewModel;

export class PropertiesBladeViewModel extends MsPortalFx.ViewModels.Blade implements Def.Contract {
    public resourceId: KnockoutObservable<string> = ko.observable<string>();
    public resource = ko.observable<HubsExtension.Azure.ResourceBase>();

    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super();
        this.title(Strings.propertiesBladeTitle);
        this.icon(MsPortalFx.Base.Images.Polychromatic.Info());
    }

    public onInputsSet(inputs: Def.InputsContract): Promise {
        this.resourceId(inputs.id);
        this.resource(inputs.resource);
        this.title(Strings.propertiesBladeTitle);
        return null;
    }
}