define(["require", "exports", "_generated/BladeReferences", "_generated/Svg", "ProjectStrings"], function (require, exports, BladeRefs, Svg, Strings) {
    "use strict";
    var ProjectAssetTypeViewModel = (function () {
        function ProjectAssetTypeViewModel(container, initialState, dataContext) {
        }
        ProjectAssetTypeViewModel.prototype.getBrowseConfig = function () {
            return Q.resolve({
                columns: [
                    {
                        id: "status",
                        name: ko.observable(Strings.status),
                        itemKey: "status",
                    },
                ],
                defaultColumns: [
                    "status",
                    "location",
                ],
            });
        };
        ProjectAssetTypeViewModel.prototype.getMenuConfig = function (resourceInfo) {
            var OverviewMenuItemId = "overview";
            var PropertiesMenuItemId = "properties";
            var overviewItem = {
                id: OverviewMenuItemId,
                displayText: Strings.MenuItem.overview,
                icon: Svg.Content.SVG.project,
                supplyBladeReference: function () { return new BladeRefs.ProjectBladeReference({ id: resourceInfo.resourceId }); },
            };
            var propertyItem = {
                id: PropertiesMenuItemId,
                displayText: Strings.MenuItem.properties,
                keywords: [Strings.MenuItemKeyword.subscription, Strings.MenuItemKeyword.resourceGroup, Strings.MenuItemKeyword.location],
                icon: MsPortalFx.Base.Images.Polychromatic.Controls(),
                supplyBladeReference: function () { return new BladeRefs.NginxPropertiesBladeReference({
                    id: resourceInfo.resourceId,
                    resource: resourceInfo.resource
                }); },
            };
            var extensionsItem = {
                id: "extensions",
                displayText: "Settings",
                keywords: [Strings.MenuItemKeyword.subscription, Strings.MenuItemKeyword.resourceGroup, Strings.MenuItemKeyword.location],
                icon: MsPortalFx.Base.Images.Polychromatic.Extensions(),
                supplyBladeReference: function () { return new BladeRefs.SettingsBladeReference({ id: resourceInfo.resourceId }); },
            };
            var menuConfig = {
                overview: overviewItem,
                options: {
                    enableExportTemplate: false,
                },
                groups: [
                    {
                        referenceId: MsPortalFx.Assets.ManagementGroupId,
                        items: [propertyItem, extensionsItem],
                    },
                ],
            };
            return Q(menuConfig);
        };
        return ProjectAssetTypeViewModel;
    }());
    exports.ProjectAssetTypeViewModel = ProjectAssetTypeViewModel;
});
