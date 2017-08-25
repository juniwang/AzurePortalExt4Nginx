import Adapters = require("Fx/Internal/Composition/ViewModelAdapters");
import ExtensionDefinition = require("../../ExtensionDefinition");
import Module = require("../../../Project/Summary/ViewModels/ProjectBlade");

import AreaDef = ExtensionDefinition.ViewModels.Project;

export class ProjectBladeAdapter extends Adapters.ViewModelAdapter<any, any> implements AreaDef.ProjectBladeAdapter.Contract {

    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: any, dataContext: any) {
        super(container, initialState, dataContext, Module.ProjectBlade);
    }
}
