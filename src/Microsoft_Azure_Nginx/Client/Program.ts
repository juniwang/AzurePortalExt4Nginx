// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

"use strict";
import LogHelper = require("Shared/InitializeExtension");
import * as ExtensionDefinition from "_generated/ExtensionDefinition";
import * as ViewModelFactories from "_generated/ViewModelFactories";
import * as ProjectArea from "Project/ProjectArea";
import * as NginxCreateArea from "NginxCreate/NginxCreateArea";

/**
 * This class provides the entry point for your extension.
 */
export class EntryPoint extends MsPortalFx.Extension.EntryPointBase<ViewModelFactories.ViewModelFactoriesBase> {
    /**
     * This method is called as your extension is loaded by the shell.
     */
    public initialize(): void {
        LogHelper.debug("Logging initialized");

        this.viewModelFactories = new ViewModelFactories.ViewModelFactoriesBase();

        this.viewModelFactories.Deployments().setDataContextFactory(
            "./Deployments/DeploymentsArea",
            () => ({ }));

        this.viewModelFactories.Project().setDataContextFactory<typeof ProjectArea>(
            "./Project/ProjectArea",
            (contextModule: typeof ProjectArea) => new contextModule.DataContext());

        this.viewModelFactories.NginxCreate().setDataContextFactory<typeof NginxCreateArea>(
            "./NginxCreate/NginxCreateArea",
            (contextModule: typeof NginxCreateArea) => new contextModule.DataContext());

        LogHelper.debug("Extension initialized");
        LogHelper.telemetry("ExtensionInitialized");

        let versionLog = Logger("__Version__");
        versionLog.telemetry("UsingExtensionVersion", Environment.version);
        setInterval(() => {
            versionLog.telemetry("UsingExtensionVersion", Environment.version);
        }, 60 * 60 * 1000);
    }

    public getDefinition(): MsPortalFx.Extension.Definition {
        return ExtensionDefinition.getDefinition();
    }
}

export function create(): MsPortalFx.Extension.EntryPointContract {
    return new EntryPoint();
}
