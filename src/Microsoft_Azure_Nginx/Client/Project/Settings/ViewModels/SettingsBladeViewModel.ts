// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ProjectArea from "Project/ProjectArea";
import * as Strings from "NginxStrings";
import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import Toolbars = MsPortalFx.ViewModels.Toolbars;

import Def = ExtensionDefinition.ViewModels.Project.SettingsBladeViewModel;

export class SettingsBladeViewModel extends MsPortalFx.ViewModels.Blade implements Def.Contract {
    public infoBox: MsPortalFx.ViewModels.Controls.InfoBox.BaseViewModel;
    public id: KnockoutObservable<string>;
    public commandBar: Toolbars.ToolbarContract;

    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
        super();
        this.title(Strings.settingsBladeTitle);
        this.subtitle("InfoBox Playground");
        this.icon(MsPortalFx.Base.Images.Polychromatic.Extensions());

        // initialization of the InfoBox view-model
        this.infoBox = new MsPortalFx.ViewModels.Controls.InfoBox.LinkViewModel(container, {
            text: ko.observable<string>('Go to the Azure Portal'),
            image: ko.observable(MsPortalFx.Base.Images.Info()),
            clickableLink: ko.observable(MsPortalFx.ViewModels.Part.createClickableLinkViewModel(ko.observable<string>('http://portal.azure.com')))
        });

        // initialize the toolbar
        var button = new Toolbars.OpenLinkButton("http://azure.com");
        button.label("azure.com");
        button.icon(MsPortalFx.Base.Images.AzurePortal());
        this.commandBar = new Toolbars.Toolbar(container);
        this.commandBar.setItems([button]);
    }

    public onInputsSet(inputs: Def.InputsContract): Promise {
        console.log(inputs.id); // /subscriptions/5ea15035-434e-46ba-97cd-ea0927a47104/resourceGroups/group01/providers/Microsoft.Nginx/Nginx/nginx0824
        return null;
    }
}
