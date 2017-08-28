// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import * as BladeRefs from "_generated/BladeReferences";
import * as Svg from "_generated/Svg";
import * as ProjectArea from "ProjectArea";
import * as Strings from "ProjectStrings";

import ResourceTypesViewModels = ExtensionDefinition.ViewModels.Project;

export class ProjectAssetTypeViewModel
    implements ResourceTypesViewModels.ProjectAssetTypeViewModel.Contract {

    constructor(container: MsPortalFx.ViewModels.ContainerContract, initialState: Untyped, dataContext: ProjectArea.DataContext) {
    }

    public getBrowseConfig(): PromiseV<MsPortalFx.Assets.BrowseConfig> {
        return Q.resolve({
            columns: [
                {
                    id: "status",
                    name: ko.observable<string>(Strings.status),
                    itemKey: "status",
                },
            ],

            defaultColumns: [
                "status",
                "location",
            ],
        });
    }

    // TODO: To display additional custom columns in browse, add the UseSupplementalData attribute in the PDL and implement this
    //public getSupplementalData(resourceIds: string[], properties: string[]): Promise {
    //    return null;
    //}

    public getMenuConfig(resourceInfo: MsPortalFx.Assets.ResourceInformation): PromiseV<MsPortalFx.Assets.ResourceMenuConfig> {
        const OverviewMenuItemId = "overview";
        const PropertiesMenuItemId = "properties";

        var overviewItem = {
            id: OverviewMenuItemId,
            displayText: Strings.MenuItem.overview,
            icon: Svg.Content.SVG.project,
            supplyBladeReference: () => new BladeRefs.ProjectBladeReference({ id: resourceInfo.resourceId }),
        };

        var propertyItem = {
            id: PropertiesMenuItemId,
            displayText: Strings.MenuItem.properties,
            keywords: [Strings.MenuItemKeyword.subscription, Strings.MenuItemKeyword.resourceGroup, Strings.MenuItemKeyword.location],
            icon: MsPortalFx.Base.Images.Polychromatic.Controls(),
            supplyBladeReference: () => new BladeRefs.PropertiesBladeReference({ id: resourceInfo.resourceId }),
        };

        var extensionsItem = {
            id: "extensions",
            displayText: "Settings",
            keywords: [Strings.MenuItemKeyword.subscription, Strings.MenuItemKeyword.resourceGroup, Strings.MenuItemKeyword.location],
            icon: MsPortalFx.Base.Images.Polychromatic.Extensions(),
            supplyBladeReference: () => new BladeRefs.SettingsBladeReference({ id: resourceInfo.resourceId }),
        };

        const menuConfig = <MsPortalFx.Assets.ResourceMenuConfig>
            {
                overview: overviewItem,
                options: {
                    enableExportTemplate: false,
                },
                groups:
                [
                    {
                        referenceId: MsPortalFx.Assets.ManagementGroupId,
                        items: [propertyItem, extensionsItem],
                    },
                ],
            };
        return Q(menuConfig);
    }
}
