// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import Azure = MsPortalFx.Azure;

declare module ProjectCreate.DataModels {
    interface Create {
        name: KnockoutObservable<string>;
        nginxVersion: KnockoutObservable<string>;
        subscription: KnockoutObservable<Azure.Subscription>;
        resourceGroup: KnockoutObservable<{
            mode: ResourceGroupMode; // TODO: maybe we can get this type from somewhere easily...
            value: Azure.ResourceGroup;
        }>;
        location: KnockoutObservable<Azure.Location>;
    }

    type ResourceGroupMode = 0 | 1;
}