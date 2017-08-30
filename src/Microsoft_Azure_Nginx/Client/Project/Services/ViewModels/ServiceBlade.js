var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "Fx/Composition/TemplateBlade", "Fx/Controls/Essentials", "Fx/Controls/Toolbar/MoveResourceToolbarButton", "NginxStrings", "Shared/Binder", "_generated/ExtensionDefinition", "_generated/Svg"], function (require, exports, TemplateBlade, Essentials_1, MoveButton, Strings, Binder_1, ExtensionDefinition_1, Svg_1) {
    "use strict";
    var FxViewModels = MsPortalFx.ViewModels;
    var Toolbars = FxViewModels.Toolbars;
    var log = Logger("NoPdlService");
    var ServiceBladeConfigMetadata = {
        essentialsExpanded: {
            isSharedAcrossPartAndBladeTypes: false
        },
    };
    var ServiceBlade = (function () {
        function ServiceBlade() {
            this.title = ko.observable();
            this.subtitle = ko.observable();
            this.icon = ko.observable(Svg_1.Content.SVG.service);
            this.essentials = ko.observable(null);
            this._id = ko.observable();
            this._essentialsExpanded = ko.observable(true);
        }
        ServiceBlade.prototype.onPin = function () {
            log.debug("onPin", this.context);
            return new MsPortalFx.Composition.PartReference("ServicePart", this.context.parameters);
        };
        ServiceBlade.prototype.onRebind = function () {
            log.debug("onRebind", this.context);
            this._syncFromConfiguration(this.context.configuration);
            this._id(this.context.parameters.id);
            this.context.container.revealContent();
            return this._binder.promise;
        };
        ServiceBlade.prototype.onInitialize = function () {
            log.debug("onInitialize", this.context);
            var _a = this.context, container = _a.container, parameters = _a.parameters, model = _a.model, configuration = _a.configuration;
            this._binder = new Binder_1.Binder(model.serviceEntityCache.createView(container), container, this._id);
            this._binder.bind(this.title, function (p) { return p.name(); });
            this._syncFromConfiguration(configuration);
            this._initializeToolbar(container);
            this._initializeEssentials(container);
            this._id(parameters.id);
            container.revealContent();
            return this._binder.promise;
        };
        ServiceBlade.prototype._initializeToolbar = function (container) {
            var commandBar = container.commandBar = new Toolbars.Toolbar(container);
            this._id.subscribeAndRun(container, function (id) {
                var move = new MoveButton.ViewModel(container, { resourceId: id });
                commandBar.setItems([]);
            });
        };
        ServiceBlade.prototype._syncFromConfiguration = function (configuration) {
            var config = configuration.getValues();
            log.debug(configuration, config);
            var settings = config.settings;
            var essentialsExpanded = settings.essentialsExpanded;
            this._essentialsExpanded(typeof essentialsExpanded === boolType ? essentialsExpanded : true);
        };
        ServiceBlade.prototype._saveConfiguration = function () {
            this.context.configuration.updateValues({
                settings: {
                    essentialsExpanded: this._essentialsExpanded(),
                },
            });
        };
        ServiceBlade.prototype._initializeEssentials = function (container) {
            var _this = this;
            this._id.subscribeAndRun(container, function (id) {
                return _this.essentials(id && new Essentials_1.ViewModel(container, {
                    left: [{
                            label: Strings.ColumnTitle.name,
                            value: _this._binder.binding(function (p) { return p.name(); }),
                        },
                        {
                            label: Strings.ColumnTitle.type,
                            value: _this._binder.binding(function (p) { return p.type(); }),
                        },
                        {
                            label: Strings.ColumnTitle.updated,
                            value: _this._binder.binding(function (p) { return p.updated(); }),
                        },
                    ],
                    right: [{
                            label: Strings.ColumnTitle.state,
                            value: _this._binder.binding(function (p) { return p.state(); }),
                        },
                        {
                            label: Strings.ColumnTitle.host,
                            value: _this._binder.binding(function (p) { return p.host(); }),
                        },
                        {
                            label: Strings.ColumnTitle.weight,
                            value: _this._binder.binding(function (p) { return p.weight(); }),
                        },
                    ],
                    expanded: _this._essentialsExpanded,
                }));
            });
            this._essentialsExpanded.subscribe(container, function (expand) { return _this._saveConfiguration(); });
        };
        return ServiceBlade;
    }());
    __decorate([
        TemplateBlade.ProxiedMember
    ], ServiceBlade.prototype, "icon", void 0);
    ServiceBlade = __decorate([
        TemplateBlade.Decorator({
            htmlTemplate: "<div data-bind='pcControl: essentials'></div>",
            forAsset: {
                assetIdParameter: "id",
                assetType: ExtensionDefinition_1.AssetTypes.Service.name,
            },
        }),
        TemplateBlade.Rebindable.Decorator(),
        TemplateBlade.Configurable.Decorator({
            settings: {
                metadata: ServiceBladeConfigMetadata,
                scope: TemplateBlade.Configurable.SettingsScope.PerId,
            },
        }),
        TemplateBlade.Pinnable.Decorator()
    ], ServiceBlade);
    exports.ServiceBlade = ServiceBlade;
});
