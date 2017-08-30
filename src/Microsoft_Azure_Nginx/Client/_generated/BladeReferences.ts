﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../TypeReferences.d.ts" />
/// <amd-bundling root="true" />

import FxComposition = require ("Fx/Composition");
import FxSelectable2 = require ("Fx/Composition/Selectable");
export = BladeDefinitions;
module BladeDefinitions {
    var extensionName: string = "Microsoft_Azure_Nginx";
    function createOptions<TParameters, TOutputs>(onClosed: FxComposition.BladeClosedWithDataHandler<any>, parameters?: TParameters, callbacks?: FxSelectable2.PdlBladeCallbacks<TOutputs>): FxSelectable2.PdlBladeReferenceOptions<TParameters, TOutputs> {
        return {
                onClosed: onClosed,
                parameters: parameters,
                callbacks: callbacks
            };
    }
    export interface DeploymentsBladeInputs {
        id: any;
    }
    export class DeploymentsBladeReference extends FxSelectable2.PdlBladeReference<DeploymentsBladeInputs, void> {
        public constructor(parameters: DeploymentsBladeInputs, onClosed?: FxComposition.BladeClosedWithDataHandler<any>) {
            super("DeploymentsBlade", extensionName, createOptions<DeploymentsBladeInputs, void>(onClosed, parameters), {
                    });
        }
    }
    export interface SettingsBladeInputs {
        id: any;
    }
    export class SettingsBladeReference extends FxSelectable2.PdlBladeReference<SettingsBladeInputs, void> {
        public constructor(parameters: SettingsBladeInputs, onClosed?: FxComposition.BladeClosedWithDataHandler<any>) {
            super("SettingsBlade", extensionName, createOptions<SettingsBladeInputs, void>(onClosed, parameters), {
                    });
        }
    }
    export interface NginxPropertiesBladeInputs {
        id: any;
        resource: any;
    }
    export class NginxPropertiesBladeReference extends FxSelectable2.PdlBladeReference<NginxPropertiesBladeInputs, void> {
        public constructor(parameters: NginxPropertiesBladeInputs, onClosed?: FxComposition.BladeClosedWithDataHandler<any>) {
            super("NginxPropertiesBlade", extensionName, createOptions<NginxPropertiesBladeInputs, void>(onClosed, parameters), {
                    });
        }
    }
    export class ProjectQuickStartBladeReference extends FxSelectable2.PdlBladeReference<void, void> {
        public constructor(onClosed?: FxComposition.BladeClosedWithDataHandler<any>) {
            super("ProjectQuickStartBlade", extensionName, createOptions<void, void>(onClosed, undefined), {
                    });
        }
    }
    export class CreateBladeReference<TResult, TConfig> extends FxSelectable2.ParameterProviderBladeReference<void, TResult, TConfig> {
        public constructor(options: FxSelectable2.ParameterProviderOptions<void, TResult, TConfig>) {
            super("CreateBlade", extensionName, options);
        }
    }
    export class ServiceBladeReference extends FxSelectable2.PdlBladeReference<IdInput, void> {
        public constructor(parameters: IdInput, onClosed?: FxComposition.BladeClosedHandler) {
            super("ServiceBlade", extensionName, createOptions<IdInput, void>(onClosed, parameters), {
                    });
        }
    }
    export class ProjectBladeReference extends FxSelectable2.PdlBladeReference<IdInput, void> {
        public constructor(parameters: IdInput, onClosed?: FxComposition.BladeClosedHandler) {
            super("ProjectBlade", extensionName, createOptions<IdInput, void>(onClosed, parameters), {
                    });
        }
    }
}
