// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import { Container } from "Fx/Composition/Pdl/Blade";
import * as ClientResources from "ClientResources";

const log = Logger("DeploymentInfoPart");

export class DeploymentInfoPart extends MsPortalFx.ViewModels.Blade {
    public id = ko.observable<string>();
    public commandBar: MsPortalFx.ViewModels.Toolbars.Toolbar;

    constructor(container: Container, initialState: Untyped, dataContext: Untyped) {
        super();

        log.telemetry("PinnedPart", Environment.version, this.id);
        setInterval(() => {
            log.telemetry("PinnedPart", Environment.version, this.id);
        }, 60 * 60 * 1000);

        this.icon(MsPortalFx.Base.Images.StatusBadge.Canceled());
        this.subtitle(ClientResources.unpinMe);
        this.title(ClientResources.unpinMe);
        this.description(ClientResources.unpinMe);
        this.contentStateDisplayText(ClientResources.unpinMe);

        this.commandBar = new MsPortalFx.ViewModels.Toolbars.Toolbar(container);
        container.notFoundMessage(ClientResources.unpinMe);
    }

    public onInputsSet(input: IdInput): Promise {
        this.id(input.id);
        log.telemetry("PinnedPart", Environment.version, this.id);
        return null;
    }
}