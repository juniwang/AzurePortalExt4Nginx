define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.resourceProvider = "Microsoft.Nginx";
    exports.projectType = "Nginx";
    exports.projectResourceType = exports.resourceProvider + "/" + exports.projectType;
    exports.apiVersion = "2014-04-01-preview";
    exports.resourceProviderDependencies = [exports.resourceProvider, "Microsoft.Insights"];
});
