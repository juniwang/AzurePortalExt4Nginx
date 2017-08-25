// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as TemplateBlade from "Fx/Composition/TemplateBlade";
import { DefaultOptions, ViewModel as EssentialsVM } from "Fx/Controls/Essentials";
import * as MoveButton from "Fx/Controls/Toolbar/MoveResourceToolbarButton";

import * as Strings from "ProjectStrings";
import { BladeNames, AssetTypes } from "_generated/ExtensionDefinition";
import * as BladeRefs from "_generated/BladeReferences";
import * as HubsBladeRefs from "../../../_generated/HubsExtension/BladeReferences"
import { Content } from "_generated/Svg";
import { DataContext } from "ProjectArea";
import { ProjectDelete as DeleteHelper } from "Project/ViewModels/ProjectCommands";
import { StrictConfig } from "Shared/PortalHelpers"

import BladeContainer = TemplateBlade.Container;
import ViewModels = MsPortalFx.ViewModels;
import Toolbars = ViewModels.Toolbars;
import Grid = ViewModels.Controls.Lists.Grid;

const log = Logger("NoPdlProject");

interface ProjectBladeConfig {
    essentialsExpanded: boolean;
    timespan: string;
    servicesSortColumn: string;
    servicesSortAscending: boolean;
}

const ResourceBladeConfigMetadata: StrictConfig<ProjectBladeConfig> = {
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

// TODO: why does pinning from browse break us? waiting for fix https://stackoverflow.microsoft.com/questions/58942/pinning-no-pdl-blade-part-from-browse
@TemplateBlade.Decorator({
    htmlTemplate: `<div data-bind="pcControl: essentials"></div>
                   <div style="margin: 25px">
                       <div class="msportalfx-text-header" data-bind="text: serviceListSectionTitle"></div>
                       <div data-bind="pcControl: gridVM"></div>
                   </div>`,
    forAsset: {
        assetIdParameter: "id",
        assetType: AssetTypes.Project.name,
    },
})
@TemplateBlade.Rebindable.Decorator()
@TemplateBlade.Configurable.Decorator({
    settings: {
        metadata: ResourceBladeConfigMetadata,
        scope: TemplateBlade.Configurable.SettingsScope.PerId,
    },
})
@TemplateBlade.Pinnable.Decorator()
export class ProjectBlade {
    public readonly title = ko.observable<string>(); // (set by the portal)
    public readonly subtitle = ko.observable<string>(); // (set by the portal)
    @TemplateBlade.ProxiedMember
    public readonly icon = ko.observable(Content.SVG.project);
    public readonly context: TemplateBlade.Context<IdInput, DataContext> & TemplateBlade.Configurable.Context<ProjectBladeConfig>;
    public readonly essentials = ko.observable<EssentialsVM>(null);
    public gridVM: Grid.ViewModel<Project.DataModels.ObservableProjectService, Project.DataModels.ServiceSelectionItem>;
    public serviceListSectionTitle = ko.observable<string>(Strings.SectionHeader.services);

    private readonly _id = ko.observable<string>();
    private _servicesView: MsPortalFx.Data.QueryView<Project.DataModels.ObservableProjectService, string>;
    private readonly _essentialsExpanded = ko.observable(false);

    // TODO: Implement actual configuration settings for the following
    private readonly _timespan = ko.observable("forever");
    private readonly _sortColumn = ko.observable("name");
    private readonly _sortAscending = ko.observable(true);

    private _binder: IBinder<Project.DataModels.ObservableProject>;

    public onPin() {
        log.debug("onPin", this.context);
        return new MsPortalFx.Composition.PartReference("ProjectPart", this.context.parameters);
    }

    public onRebind() {
        log.debug("onRebind", this.context);
        this._syncFromConfiguration(this.context.configuration);
        this._id(this.context.parameters.id);
        this.context.container.revealContent();
        return this._binder.promise;
    }

    public onInitialize() {
        log.debug("onInitialize", this.context);
        const { container, parameters, model, configuration } = this.context;
        this._binder = model.projectEntityCache.binder(container, this._id);
        this._binder.bind(this.title, p => p.name());

        this._syncFromConfiguration(configuration);

        this._servicesView = this.context.model.serviceQueryCache.createView(container);

        this._initializeServiceGrid(container);
        this._initializeToolbar(container);
        this._initializeEssentials(container);

        this._id(parameters.id);
        container.revealContent();
        return this._binder.promise;
    }

    private _initializeServiceGrid(container: BladeContainer) {
        this.gridVM = new Grid.ViewModel<Project.DataModels.ObservableProjectService, Project.DataModels.ServiceSelectionItem>(
            container,
            this._servicesView.items,
            Grid.Extensions.SelectableRow,
            {
                selectableRow: {
                    selectionMode: Grid.RowSelectionMode.Single
                },
                onRowClicked: (service) => {
                    const bladeRef = (service.type() == "Container") ? new BladeRefs.ServiceBladeReference({ id: service.id() }) : new HubsBladeRefs.ResourceMenuBladeReference({ id: service.id() });
                    container.openBlade(bladeRef);
                },
            },
        );

        const columns: ViewModels.Controls.Lists.Grid.Column[] = [
            {
                itemKey: "name",
                name: ko.observable<string>(Strings.ColumnTitle.name),
                activatable: ko.observable(true),
            },
            {
                itemKey: "type",
                name: ko.observable<string>(Strings.ColumnTitle.type),
                activatable: ko.observable(true),
            },
            {
                itemKey: "state",
                name: ko.observable<string>(Strings.ColumnTitle.state),
                activatable: ko.observable(true),
            },
            {
                itemKey: "updated",
                name: ko.observable<string>(Strings.ColumnTitle.updated),
                activatable: ko.observable(true),
            },
            {
                itemKey: "host",
                name: ko.observable<string>(Strings.ColumnTitle.host),
                activatable: ko.observable(true),
            },
            {
                itemKey: "weight",
                name: ko.observable<string>(Strings.ColumnTitle.weight),
                activatable: ko.observable(true),
            },
        ];
        this.gridVM.columns = ko.observableArray<ViewModels.Controls.Lists.Grid.Column>(columns);
        this.gridVM.showHeader = true;
        this.gridVM.summary = ko.observable(Strings.servicesListGridSummary);
        this.gridVM.noRowsMessage = ko.observable(Strings.loadingText);
        this._servicesView.loading.subscribeAndRun(container, (isLoading) => this.gridVM.noRowsMessage(isLoading ? Strings.loadingText : Strings.noServicesInProject))

        this._id.subscribeAndRun(container, projectId => this._servicesView.fetch(projectId));

        this._timespan.subscribe(container, timespan => this._saveConfiguration());
        this._sortColumn.subscribe(container, sortColumn => this._saveConfiguration());
        this._sortAscending.subscribe(container, sortAscending => this._saveConfiguration());
    }

    private _initializeToolbar(container: BladeContainer) {
        const commandBar = container.commandBar = new Toolbars.Toolbar(container);

        const deleteCommand = new Toolbars.DialogButton();
        const deleteHelper = new DeleteHelper(this._id, BladeNames.projectBlade);
        deleteCommand.label(DeleteHelper.label);
        deleteCommand.icon(DeleteHelper.icon);
        deleteCommand.command = {
            canExecute: deleteHelper.canExecute,
            execute: result => deleteHelper.execute(result),
        };
        deleteCommand.dialogOptions = DeleteHelper.messageBox;

        this._id.subscribeAndRun(container, id => {
            const move = new MoveButton.ViewModel(container, { resourceId: id });
            commandBar.setItems([move, deleteCommand]);
        });
    }

    private _syncFromConfiguration(configuration: TemplateBlade.Configurable.Configuration<ProjectBladeConfig>) {
        const config = configuration.getValues();
        log.debug(configuration, config);
        const settings = config.settings;
        const essentialsExpanded = settings.essentialsExpanded;
        const timespan = settings.timespan;
        const servicesSortColumn = settings.servicesSortColumn;
        const servicesSortAscending = settings.servicesSortAscending;

        this._essentialsExpanded(typeof essentialsExpanded === boolType ? essentialsExpanded : false);
        this._timespan(typeof timespan === stringType ? timespan : "forever");
        this._sortColumn(typeof servicesSortColumn === stringType ? servicesSortColumn : "name");
        this._sortAscending(typeof servicesSortAscending === boolType ? servicesSortAscending : true);
    }

    private _saveConfiguration() {
        this.context.configuration.updateValues({
            settings: {
                essentialsExpanded: this._essentialsExpanded(),
                timespan: this._timespan(),
                servicesSortColumn: this._sortColumn(),
                servicesSortAscending: this._sortAscending(),
            },
        });
    }

    private _initializeEssentials(container: BladeContainer) {
        // id might not be defined at all times, so watch out for that (we can't call modifyStatus if it isn't)
        this._id.subscribeAndRun(container, id =>
            // I hate that we have to do things this way, hopefully in the future resourceId will take an observable
            this.essentials(id && new EssentialsVM(container, <DefaultOptions>{
                resourceId: id,
                expanded: this._essentialsExpanded,
                additionalRight: [],
            })));

        const state = this._binder.binding(p => p.properties().provisioningState());

        ko.reactor(container, () => {
            const essentialsVm = this.essentials();
            const projectState = state();

            if (essentialsVm && projectState) {
                essentialsVm.modifyStatus(projectState);
            }
        });

        this._essentialsExpanded.subscribe(container, expand => this._saveConfiguration());
    }
}
