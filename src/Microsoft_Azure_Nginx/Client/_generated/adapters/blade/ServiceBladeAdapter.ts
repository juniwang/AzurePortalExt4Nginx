import Adapters = require("Fx/Internal/Composition/ViewModelAdapters");
import ExtensionDefinition = require("../../ExtensionDefinition");
import Module = require("../../../Project/Services/ViewModels/ServiceBlade");

import AreaDef = ExtensionDefinition.ViewModels.Project;

export class ServiceBladeAdapter extends Adapters.ViewModelAdapter<any, any> implements AreaDef.ServiceBladeAdapter.Contract {

    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: any, dataContext: any) {
        super(container, initialState, dataContext, Module.ServiceBlade);
    }
}
