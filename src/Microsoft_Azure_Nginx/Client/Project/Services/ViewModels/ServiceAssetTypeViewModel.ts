// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import * as BladeRefs from "_generated/BladeReferences";
import * as Svg from "_generated/Svg";
import * as ProjectArea from "ProjectArea";
import * as Strings from "ProjectStrings";

import AssetTypesViewModels = ExtensionDefinition.ViewModels.Project;

export class ServiceAssetTypeViewModel
    implements AssetTypesViewModels.ServiceAssetTypeViewModel.Contract {
    
    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
    }
    
    public getMenuConfig(resourceInfo: MsPortalFx.Assets.ResourceInformation): PromiseV<MsPortalFx.Assets.ResourceMenuConfig>
    {
        const overviewItem: MsPortalFx.Assets.MenuItem = {
            id: "overview",
            displayText: Strings.MenuItem.overview,
            icon: Svg.Content.SVG.service,
            supplyBladeReference: () => new BladeRefs.ServiceBladeReference({ id: resourceInfo.resourceId }),
        };

        const menuConfig = <MsPortalFx.Assets.ResourceMenuConfig>
            {
                overview: overviewItem,
            };
        return Q(menuConfig);
    }
}
