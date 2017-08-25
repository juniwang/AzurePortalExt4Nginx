// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ProjectArea from "ProjectArea";
import * as Strings from "ProjectStrings";
import * as ExtensionDefinition from "../../../_generated/ExtensionDefinition";

import Def = ExtensionDefinition.ViewModels.Project.PropertiesPartViewModel;
import MsFxProperties = MsPortalFx.ViewModels.Parts.Properties;
import DataModels = Project.DataModels;

export class PropertiesPartViewModel extends MsPortalFx.ViewModels.Parts.Properties.ViewModel implements Def.Contract {

    public readonly id = ko.observable<string>();
    private _binder: IBinder<Project.DataModels.ObservableProject>;

    constructor(container: PartContainer, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super(initialState);
        this._binder = dataContext.projectEntityCache.binder(container, this.id);

        this.populateProperties(container);
    }

    public onInputsSet(inputs: Def.InputsContract): Promise {
        this.id(inputs.id);
        return this._binder.promise;
    }

    private populateProperties(lifetime: PartContainer) {
        this.setProperties([
            new MsFxProperties.TextProperty(Strings.projectNameColumn, this._binder.binding(p => p.name(), Strings.loadingText)),
            new MsFxProperties.TextProperty(Strings.projectLocationColumn, this._binder.binding(p => p.location(), Strings.loadingText)),
            new MsFxProperties.CopyFieldProperty(lifetime, Strings.subscriptionId, this._binder.binding(p => MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(p.id()).subscription, Strings.loadingText)),
        ]);
    }
}
