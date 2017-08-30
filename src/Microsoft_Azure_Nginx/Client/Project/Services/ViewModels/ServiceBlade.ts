// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as TemplateBlade from "Fx/Composition/TemplateBlade";
import { NonResourceOptions, ViewModel as EssentialsVM } from "Fx/Controls/Essentials";
import * as MoveButton from "Fx/Controls/Toolbar/MoveResourceToolbarButton";

import * as Strings from "NginxStrings";
import { Binder } from "Shared/Binder";
import { BladeNames, AssetTypes } from "_generated/ExtensionDefinition";
import { Content } from "_generated/Svg";
import { DataContext } from "ProjectArea";
import { ProjectDelete as DeleteHelper } from "Project/ViewModels/ProjectCommands";
import { StrictConfig } from "Shared/PortalHelpers"

import BladeContainer = TemplateBlade.Container;
import FxViewModels = MsPortalFx.ViewModels;
import Toolbars = FxViewModels.Toolbars;

const log = Logger("NoPdlService");

interface ServiceBladeConfig {
    essentialsExpanded: boolean;
}

const ServiceBladeConfigMetadata: StrictConfig<ServiceBladeConfig> = {
    essentialsExpanded: {
        isSharedAcrossPartAndBladeTypes: false
    },
};

// TODO: why does pinning from browse break us?
@TemplateBlade.Decorator({
    htmlTemplate: "<div data-bind='pcControl: essentials'></div>",
    forAsset: {
        assetIdParameter: "id",
        assetType: AssetTypes.Service.name,
    },
})
@TemplateBlade.Rebindable.Decorator()
@TemplateBlade.Configurable.Decorator({
    settings: {
        metadata: ServiceBladeConfigMetadata,
        scope: TemplateBlade.Configurable.SettingsScope.PerId,
    },
})
@TemplateBlade.Pinnable.Decorator()
export class ServiceBlade {
    public readonly title = ko.observable<string>(); // Should be set by the portal
    public readonly subtitle = ko.observable<string>(); // Should be set by the portal
    @TemplateBlade.ProxiedMember
    public readonly icon = ko.observable(Content.SVG.service);
    public readonly context: TemplateBlade.Context<IdInput, DataContext> & TemplateBlade.Configurable.Context<ServiceBladeConfig>;

    public readonly essentials = ko.observable<EssentialsVM>(null);

    private readonly _id = ko.observable<string>();
    private readonly _essentialsExpanded = ko.observable(true);
    private _binder: IBinder<Project.DataModels.ObservableProjectService>;

    public onPin() {
        log.debug("onPin", this.context);
        return new MsPortalFx.Composition.PartReference("ServicePart", this.context.parameters);
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
        this._binder = new Binder<Project.DataModels.ObservableProjectService>(model.serviceEntityCache.createView(container), container, this._id);
        this._binder.bind(this.title, p => p.name());

        this._syncFromConfiguration(configuration);

        this._initializeToolbar(container);
        this._initializeEssentials(container);

        this._id(parameters.id);
        container.revealContent();
        return this._binder.promise;
    }

    private _initializeToolbar(container: BladeContainer) {
        const commandBar = container.commandBar = new Toolbars.Toolbar(container);

        // TODO: Implement commands

        this._id.subscribeAndRun(container, id => {
            const move = new MoveButton.ViewModel(container, { resourceId: id });
            commandBar.setItems([]);
        });
    }

    private _syncFromConfiguration(configuration: TemplateBlade.Configurable.Configuration<ServiceBladeConfig>) {
        const config = configuration.getValues();
        log.debug(configuration, config);
        const settings = config.settings;
        const essentialsExpanded = settings.essentialsExpanded;
        this._essentialsExpanded(typeof essentialsExpanded === boolType ? essentialsExpanded : true);
    }

    private _saveConfiguration() {
        this.context.configuration.updateValues({
            settings: {
                essentialsExpanded: this._essentialsExpanded(),
            },
        });
    }

    private _initializeEssentials(container: BladeContainer) {
        this._id.subscribeAndRun(container, id =>
            this.essentials(id && new EssentialsVM(container, <NonResourceOptions>{
                left: [{
                    label: Strings.ColumnTitle.name,
                    value: this._binder.binding(p => p.name()),
                },
                {
                    label: Strings.ColumnTitle.type,
                    value: this._binder.binding(p => p.type()),
                },
                {
                    label: Strings.ColumnTitle.updated,
                    value: this._binder.binding(p => p.updated()),
                },
                ],
                right: [{
                    label: Strings.ColumnTitle.state,
                    value: this._binder.binding(p => p.state()),
                },
                {
                    label: Strings.ColumnTitle.host,
                    value: this._binder.binding(p => p.host()),
                    },
                {
                    label: Strings.ColumnTitle.weight,
                    value: this._binder.binding(p => p.weight()),
                },
                ],
                expanded: this._essentialsExpanded,
            })));

        this._essentialsExpanded.subscribe(container, expand => this._saveConfiguration());
    }
}