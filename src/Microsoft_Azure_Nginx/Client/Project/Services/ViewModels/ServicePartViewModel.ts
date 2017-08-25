// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Strings from "ProjectStrings";
import { DataContext } from "ProjectArea";
import { Content } from "_generated/Svg";

import FxViewModels = MsPortalFx.ViewModels;

export class ServicePartViewModel extends FxViewModels.AssetPart {
    public readonly icon = ko.observable(Content.SVG.service);
    public readonly assetType = ko.observable(Strings.AssetTypeNames.Service.singular);

    constructor(container: PartContainer, initialState: { content?: Magic }, dataContext: DataContext) {
        super();

        // load assetId from a persisted journey
        // this is not required but does reduce flashing when loading a journey
        if (initialState.content && initialState.content.assetId) {
            this.assetId(initialState.content.assetId);
        }

        this.state(FxViewModels.ContentState.Success);
    }

    public onInputsSet(inputs: IdInput): Promise {
        this.assetId(inputs.id);
        this.assetName(MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor(inputs.id).resource);

        return null;
    }
}
