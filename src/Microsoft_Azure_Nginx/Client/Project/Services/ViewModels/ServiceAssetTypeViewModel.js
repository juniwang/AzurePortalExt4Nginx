define(["require", "exports", "_generated/BladeReferences", "_generated/Svg", "NginxStrings"], function (require, exports, BladeRefs, Svg, Strings) {
    "use strict";
    var ServiceAssetTypeViewModel = (function () {
        function ServiceAssetTypeViewModel(container, initialState, dataContext) {
        }
        ServiceAssetTypeViewModel.prototype.getMenuConfig = function (resourceInfo) {
            var overviewItem = {
                id: "overview",
                displayText: Strings.MenuItem.overview,
                icon: Svg.Content.SVG.service,
                supplyBladeReference: function () { return new BladeRefs.ServiceBladeReference({ id: resourceInfo.resourceId }); },
            };
            var menuConfig = {
                overview: overviewItem,
            };
            return Q(menuConfig);
        };
        return ServiceAssetTypeViewModel;
    }());
    exports.ServiceAssetTypeViewModel = ServiceAssetTypeViewModel;
});
