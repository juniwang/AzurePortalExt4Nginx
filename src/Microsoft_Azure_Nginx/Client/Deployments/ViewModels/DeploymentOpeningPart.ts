"use strict"

import TextBox = MsPortalFx.ViewModels.Forms.TextBox;

// Temporary to open the blade 'from' any ACS
export class DeploymentOpeningPart {
    public id = ko.observable<string>();

    public box: TextBox.ViewModel;

    constructor(container: ContainerContract, initialData: Untyped, dataContext: Untyped) {
        this.box = new TextBox.ViewModel(container);
        this.box.value.subscribe(container, nv => this.id(nv));
    }

    public onInputsSet(inputs: IdInput): Promise {
        return null;
    }
}