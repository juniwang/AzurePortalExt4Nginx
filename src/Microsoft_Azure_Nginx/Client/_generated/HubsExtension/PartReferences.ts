﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../../TypeReferences.d.ts" />
/// <amd-bundling root="true" />

import FxComposition = MsPortalFx.Composition;
import PartSize = MsPortalFx.Parts.PartSize;
export = PartDefinitions;
module PartDefinitions {
    export class MonitorChartPartReference extends FxComposition.PartReference<HubsExtension.MonitorChartPart.Parameters> {
        public constructor(parameters: HubsExtension.MonitorChartPart.Parameters, options?: MonitorChartPartReference.Options) {
            super("MonitorChartPart", parameters, MsPortalFx.extend2(options, {
                            extensionName: extensionName
                        }));
        }
    }
    var extensionName: string = "HubsExtension";
    export module MonitorChartPartReference {
        export enum Size {
            Wide = PartSize.Wide,
            Tall = PartSize.Tall,
            Large = PartSize.Large,
            HeroWide = PartSize.HeroWide,
            HeroTall = PartSize.HeroTall,
        }
        export interface Options {
            initialSize?: MonitorChartPartReference.Size;
        }
    }
}