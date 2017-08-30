// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ProjectArea from "ProjectArea";
import * as Strings from "NginxStrings";
import * as ExtensionDefinition from "../../../_generated/ExtensionDefinition";

import Def = ExtensionDefinition.ViewModels.Project.PropertiesPartViewModel;
import MsFxProperties = MsPortalFx.ViewModels.Parts.Properties;
import DataModels = Project.DataModels;

export class PropertiesPartViewModel extends MsPortalFx.ViewModels.Parts.Properties.ViewModel implements Def.Contract {

    public id = ko.observable<string>();
    public resource = ko.observable<HubsExtension.Azure.ResourceBase>();

    private _binder: IBinder<Project.DataModels.ObservableProject>;
    private _container : PartContainer;

    constructor(container: PartContainer, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super(initialState);
        this._binder = dataContext.projectEntityCache.binder(container, this.id);
        this._container = container;

    }

    public onInputsSet(inputs: Def.InputsContract): Promise {
        this.id(inputs.id);
        this.resource(inputs.resource);

        this.populateProperties(this._container);
        return this._binder.promise;
    }

    private populateProperties(lifetime: PartContainer) {
        // Text Property
        var p1 = new MsFxProperties.TextProperty(Strings.projectNameColumn, this._binder.binding(p => p.name(), Strings.loadingText));
        var p2 = new MsFxProperties.TextProperty(Strings.projectLocationColumn, this._binder.binding(p => p.location(), Strings.loadingText));

        var p22 = new MsFxProperties.TextProperty("Nginx Version", this.resource().properties["nginxVersion"]);

        // CopyFieldProperty
        var p3 = new MsFxProperties.CopyFieldProperty(lifetime, Strings.subscriptionId, this._binder.binding(p => MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(p.id()).subscription, Strings.loadingText));

        // Link Property
        var p4 = new MsFxProperties.LinkProperty("Host", "http://portal.azure.com");

        // open blade property
        var p5 = new MsFxProperties.OpenBladeProperty("FirstBlade", "FirstBlade", { detailBlade: ExtensionDefinition.BladeNames.projectQuickStartBlade, detailBladeInputs: {} });

        // callback
        var p6 = new MsFxProperties.CallbackProperty("Callback", "Callback", () => {
            console.log("callback called");
        });

        this.setProperties([p1, p2, p22, p3, p4, p5, p6]);
    }
}
