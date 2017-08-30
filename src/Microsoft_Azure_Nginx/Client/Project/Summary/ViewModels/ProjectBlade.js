var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "Fx/Composition/TemplateBlade", "Fx/Controls/Essentials", "Fx/Controls/Toolbar/MoveResourceToolbarButton", "NginxStrings", "_generated/ExtensionDefinition", "_generated/BladeReferences", "../../../_generated/HubsExtension/BladeReferences", "_generated/Svg", "Project/ViewModels/ProjectCommands"], function (require, exports, TemplateBlade, Essentials_1, MoveButton, Strings, ExtensionDefinition_1, BladeRefs, HubsBladeRefs, Svg_1, ProjectCommands_1) {
    "use strict";
    var ViewModels = MsPortalFx.ViewModels;
    var Toolbars = ViewModels.Toolbars;
    var Grid = ViewModels.Controls.Lists.Grid;
    var log = Logger("NoPdlProject");
    var ResourceBladeConfigMetadata = {
        essentialsExpanded: {
            isSharedAcrossPartAndBladeTypes: false
        },
        timespan: {
            isSharedAcrossPartAndBladeTypes: true,
            sharedKey: "Azure_Project_Service_Timespan"
        },
        servicesSortColumn: {
            isSharedAcrossPartAndBladeTypes: false
        },
        servicesSortAscending: {
            isSharedAcrossPartAndBladeTypes: false
        },
    };
    var ProjectBlade = (function () {
        function ProjectBlade() {
            this.title = ko.observable();
            this.subtitle = ko.observable();
            this.icon = ko.observable(Svg_1.Content.SVG.project);
            this.essentials = ko.observable(null);
            this.serviceListSectionTitle = ko.observable(Strings.SectionHeader.services);
            this._id = ko.observable();
            this._essentialsExpanded = ko.observable(false);
            this._timespan = ko.observable("forever");
            this._sortColumn = ko.observable("name");
            this._sortAscending = ko.observable(true);
        }
        ProjectBlade.prototype.onPin = function () {
            log.debug("onPin", this.context);
            return new MsPortalFx.Composition.PartReference("ProjectPart", this.context.parameters);
        };
        ProjectBlade.prototype.onRebind = function () {
            log.debug("onRebind", this.context);
            this._syncFromConfiguration(this.context.configuration);
            this._id(this.context.parameters.id);
            this.context.container.revealContent();
            return this._binder.promise;
        };
        ProjectBlade.prototype.onInitialize = function () {
            log.debug("onInitialize", this.context);
            var _a = this.context, container = _a.container, parameters = _a.parameters, model = _a.model, configuration = _a.configuration;
            this._binder = model.projectEntityCache.binder(container, this._id);
            this._binder.bind(this.title, function (p) { return p.name(); });
            this._syncFromConfiguration(configuration);
            this._servicesView = this.context.model.serviceQueryCache.createView(container);
            this._initializeServiceGrid(container);
            this._initializeToolbar(container);
            this._initializeEssentials(container);
            this._id(parameters.id);
            container.revealContent();
            return this._binder.promise;
        };
        ProjectBlade.prototype._initializeServiceGrid = function (container) {
            var _this = this;
            this.gridVM = new Grid.ViewModel(container, this._servicesView.items, Grid.Extensions.SelectableRow, {
                selectableRow: {
                    selectionMode: 1
                },
                onRowClicked: function (service) {
                    var bladeRef = (service.type() == "Container") ? new BladeRefs.ServiceBladeReference({ id: service.id() }) : new HubsBladeRefs.ResourceMenuBladeReference({ id: service.id() });
                    container.openBlade(bladeRef);
                },
            });
            var columns = [
                {
                    itemKey: "name",
                    name: ko.observable(Strings.ColumnTitle.name),
                    activatable: ko.observable(true),
                },
                {
                    itemKey: "type",
                    name: ko.observable(Strings.ColumnTitle.type),
                    activatable: ko.observable(true),
                },
                {
                    itemKey: "state",
                    name: ko.observable(Strings.ColumnTitle.state),
                    activatable: ko.observable(true),
                },
                {
                    itemKey: "updated",
                    name: ko.observable(Strings.ColumnTitle.updated),
                    activatable: ko.observable(true),
                },
                {
                    itemKey: "host",
                    name: ko.observable(Strings.ColumnTitle.host),
                    activatable: ko.observable(true),
                },
                {
                    itemKey: "weight",
                    name: ko.observable(Strings.ColumnTitle.weight),
                    activatable: ko.observable(true),
                },
            ];
            this.gridVM.columns = ko.observableArray(columns);
            this.gridVM.showHeader = true;
            this.gridVM.summary = ko.observable(Strings.servicesListGridSummary);
            this.gridVM.noRowsMessage = ko.observable(Strings.loadingText);
            this._servicesView.loading.subscribeAndRun(container, function (isLoading) { return _this.gridVM.noRowsMessage(isLoading ? Strings.loadingText : Strings.noServicesInProject); });
            this._id.subscribeAndRun(container, function (projectId) { return _this._servicesView.fetch(projectId); });
            this._timespan.subscribe(container, function (timespan) { return _this._saveConfiguration(); });
            this._sortColumn.subscribe(container, function (sortColumn) { return _this._saveConfiguration(); });
            this._sortAscending.subscribe(container, function (sortAscending) { return _this._saveConfiguration(); });
        };
        ProjectBlade.prototype._initializeToolbar = function (container) {
            var commandBar = container.commandBar = new Toolbars.Toolbar(container);
            var deleteCommand = new Toolbars.DialogButton();
            var deleteHelper = new ProjectCommands_1.ProjectDelete(this._id, ExtensionDefinition_1.BladeNames.projectBlade);
            deleteCommand.label(ProjectCommands_1.ProjectDelete.label);
            deleteCommand.icon(ProjectCommands_1.ProjectDelete.icon);
            deleteCommand.command = {
                canExecute: deleteHelper.canExecute,
                execute: function (result) { return deleteHelper.execute(result); },
            };
            deleteCommand.dialogOptions = ProjectCommands_1.ProjectDelete.messageBox;
            this._id.subscribeAndRun(container, function (id) {
                var move = new MoveButton.ViewModel(container, { resourceId: id });
                commandBar.setItems([move, deleteCommand]);
            });
        };
        ProjectBlade.prototype._syncFromConfiguration = function (configuration) {
            var config = configuration.getValues();
            log.debug(configuration, config);
            var settings = config.settings;
            var essentialsExpanded = settings.essentialsExpanded;
            var timespan = settings.timespan;
            var servicesSortColumn = settings.servicesSortColumn;
            var servicesSortAscending = settings.servicesSortAscending;
            this._essentialsExpanded(typeof essentialsExpanded === boolType ? essentialsExpanded : false);
            this._timespan(typeof timespan === stringType ? timespan : "forever");
            this._sortColumn(typeof servicesSortColumn === stringType ? servicesSortColumn : "name");
            this._sortAscending(typeof servicesSortAscending === boolType ? servicesSortAscending : true);
        };
        ProjectBlade.prototype._saveConfiguration = function () {
            this.context.configuration.updateValues({
                settings: {
                    essentialsExpanded: this._essentialsExpanded(),
                    timespan: this._timespan(),
                    servicesSortColumn: this._sortColumn(),
                    servicesSortAscending: this._sortAscending(),
                },
            });
        };
        ProjectBlade.prototype._initializeEssentials = function (container) {
            var _this = this;
            this._id.subscribeAndRun(container, function (id) {
                return _this.essentials(id && new Essentials_1.ViewModel(container, {
                    resourceId: id,
                    expanded: _this._essentialsExpanded,
                    additionalRight: [],
                }));
            });
            var state = this._binder.binding(function (p) { return p.properties().provisioningState(); });
            ko.reactor(container, function () {
                var essentialsVm = _this.essentials();
                var projectState = state();
                if (essentialsVm && projectState) {
                    essentialsVm.modifyStatus(projectState);
                }
            });
            this._essentialsExpanded.subscribe(container, function (expand) { return _this._saveConfiguration(); });
        };
        return ProjectBlade;
    }());
    __decorate([
        TemplateBlade.ProxiedMember
    ], ProjectBlade.prototype, "icon", void 0);
    ProjectBlade = __decorate([
        TemplateBlade.Decorator({
            htmlTemplate: "<div data-bind=\"pcControl: essentials\"></div>\n                   <div style=\"margin: 25px\">\n                       <div class=\"msportalfx-text-header\" data-bind=\"text: serviceListSectionTitle\"></div>\n                       <div data-bind=\"pcControl: gridVM\"></div>\n                   </div>",
            forAsset: {
                assetIdParameter: "id",
                assetType: ExtensionDefinition_1.AssetTypes.Project.name,
            },
        }),
        TemplateBlade.Rebindable.Decorator(),
        TemplateBlade.Configurable.Decorator({
            settings: {
                metadata: ResourceBladeConfigMetadata,
                scope: TemplateBlade.Configurable.SettingsScope.PerId,
            },
        }),
        TemplateBlade.Pinnable.Decorator()
    ], ProjectBlade);
    exports.ProjectBlade = ProjectBlade;
});
