﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../TypeReferences.d.ts" />

import FxCompositionPdlBlade = require ("Fx/Composition/Pdl/Blade");
import Project = require ("../Project/ProjectArea");
import Deployments = require ("../Deployments/DeploymentsArea");
import ProjectCreate = require ("../ProjectCreate/ProjectCreateArea");
export = ExtensionDefinition;
module ExtensionDefinition {
    module Internal {
        var untypedDefinition: any = {
  "commandsCatalog": [],
  "name": "Microsoft_Azure_Nginx",
  "version": "1.0",
  "hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
  "schemaVersion": "1.0.0.2",
  "sdkVersion": "5.0.302.813 (production_sdk#17c60b9.170725-1209)",
  "isPreview": true,
  "commandGroups": [],
  "htmlTemplates": {}
};
        export var definition: MsPortalFx.Extension.Definition = untypedDefinition;
    }
    export var definitionName: string = "Microsoft_Azure_Nginx";
    export function getDefinition(): MsPortalFx.Extension.Definition {
        if (Internal.definition) {
                            var def = Internal.definition;
                            Internal.definition = null;
                            return def;
                        }

                    throw new Error("Extension definition is no longer available.");
    }
    export module External {
        export module HubsExtension {
            export var name: string = "HubsExtension";
            export module Blades {
                export module UnauthorizedAssetBlade {
                    export var name: string = "UnauthorizedAssetBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module NotFoundAssetBlade {
                    export var name: string = "NotFoundAssetBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module UnavailableAssetBlade {
                    export var name: string = "UnavailableAssetBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module Resources {
                    export var name: string = "Resources";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module BrowseAllResourcesBlade {
                    export var name: string = "BrowseAllResourcesBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module BrowseResourceBlade {
                    export var name: string = "BrowseResourceBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module BrowseInstanceLinkBlade {
                    export var name: string = "BrowseInstanceLinkBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module BrowseResourceGroupBlade {
                    export var name: string = "BrowseResourceGroupBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module MapResourceGroupBlade {
                    export var name: string = "MapResourceGroupBlade";
                    export module Inputs {
                        export var id: string = "id";
                    }
                    export module Outputs {
                    }
                }
                export module ResourceGroupPickerV3Blade {
                    export var name: string = "ResourceGroupPickerV3Blade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module DeployFromTemplateBlade {
                    export var name: string = "DeployFromTemplateBlade";
                    export module Inputs {
                        export var internal_bladeCallerParams: string = "internal_bladeCallerParams";
                    }
                    export module Outputs {
                    }
                }
                export module ParametersEditorBlade {
                    export var name: string = "ParametersEditorBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module ParametersFileEditorBlade {
                    export var name: string = "ParametersFileEditorBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module TemplateEditorBlade {
                    export var name: string = "TemplateEditorBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module LocationPickerV3Blade {
                    export var name: string = "LocationPickerV3Blade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module DeploymentDetailsBlade {
                    export var name: string = "DeploymentDetailsBlade";
                    export module Inputs {
                        export var id: string = "id";
                    }
                    export module Outputs {
                    }
                }
                export module ResourceGroupMapBlade {
                    export var name: string = "ResourceGroupMapBlade";
                    export module Inputs {
                        export var id: string = "id";
                    }
                    export module Outputs {
                    }
                }
                export module ResourceMenuBlade {
                    export var name: string = "ResourceMenuBlade";
                    export module Inputs {
                        export var id: string = "id";
                    }
                    export module Outputs {
                    }
                }
                export module ServicesHealthBlade {
                    export var name: string = "ServicesHealthBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module SettingsBlade {
                    export var name: string = "SettingsBlade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module SubscriptionPickerV3Blade {
                    export var name: string = "SubscriptionPickerV3Blade";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
                export module DeployToAzure {
                    export var name: string = "DeployToAzure";
                    export module Inputs {
                    }
                    export module Outputs {
                    }
                }
            }
        }
    }
    export module AssetTypes {
        export module Project {
            export var name: string = "Project";
        }
        export module Service {
            export var name: string = "Service";
        }
    }
    export module AssetTypeNames {
        export var project: string = AssetTypes.Project.name;
        export var service: string = AssetTypes.Service.name;
    }
    export module BladeNames {
        export var deploymentsBlade: string = "DeploymentsBlade";
        export var settingsBlade: string = "SettingsBlade";
        export var propertiesBlade: string = "PropertiesBlade";
        export var projectQuickStartBlade: string = "ProjectQuickStartBlade";
        export var createBlade: string = "CreateBlade";
        export var serviceBlade: string = "ServiceBlade";
        export var projectBlade: string = "ProjectBlade";
    }
    export module CommandGroupNames {
    }
    export module EventTypes {
    }
    export module NotificationDefinitions {
    }
    export declare module ViewModels {
        export module Project {
            export module ProjectPartViewModel {
                export interface InputsContract {
                    id: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.PartContent,MsPortalFx.ViewModels.AssetPart {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    assetId: any;
                }
            }
            export module ServicePartViewModel {
                export interface InputsContract {
                    id: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.PartContent,MsPortalFx.ViewModels.AssetPart {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    assetId: any;
                }
            }
            export module ProjectQuickStartPartViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.PartContent,MsPortalFx.ViewModels.QuickStartPart {
                }
            }
            export module SettingsBladeViewModel {
                export interface InputsContract {
                    id: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    commandBar: MsPortalFx.ViewModels.Toolbars.ToolbarContract;
                }
            }
            export module PropertiesBladeViewModel {
                export interface InputsContract {
                    id: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    onInputsSet?(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                }
            }
            export module PropertiesPartViewModel {
                export interface InputsContract {
                    id: any;
                    actionBarOutput?: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.PartContent,MsPortalFx.ViewModels.Parts.Properties.Contract {
                    onInputsSet?(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    moveResourceSelection: MsPortalFx.ViewModels.Selectable<any> | MsPortalFx.ViewModels.SetSelection<any> | KnockoutObservable<any> | MsPortalFx.ViewModels.Internal.Selection2.SelectableSetContract<any, any>;
                }
            }
            export module ProjectQuickStartBladeViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                }
            }
            export module ProjectQuickStartInfoListViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.PartContent,MsPortalFx.ViewModels.Parts.InfoList.ViewModel {
                }
            }
            export module ServiceBladeAdapter {
                export interface InputsContract {
                    id: any;
                }
                export interface Settings$content$0 {
                    essentialsExpanded: any;
                }
                export interface SettingsContract {
                    content?: Settings$content$0;
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    commandBar: MsPortalFx.ViewModels.Toolbars.ToolbarContract;
                }
            }
            export module ProjectBladeAdapter {
                export interface InputsContract {
                    id: any;
                }
                export interface Settings$content$0 {
                    essentialsExpanded: any;
                    timespan: any;
                    servicesSortColumn: any;
                    servicesSortAscending: any;
                }
                export interface SettingsContract {
                    content?: Settings$content$0;
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    commandBar: MsPortalFx.ViewModels.Toolbars.ToolbarContract;
                }
            }
            export module ProjectAssetTypeViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.Assets.ResourceMenuConfigContract {
                }
            }
            export module ServiceAssetTypeViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract {
                }
            }
        }
        export module Deployments {
            export module DeploymentInfoPart {
                export interface InputsContract {
                    id: any;
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    onInputsSet(inputs: InputsContract, settings: SettingsContract): MsPortalFx.Base.Promise;
                    commandBar: MsPortalFx.ViewModels.Toolbars.ToolbarContract;
                }
            }
        }
        export module ProjectCreate {
            export module CreateBladeViewModel {
                export interface InputsContract {
                }
                export interface SettingsContract {
                }
                export interface Contract extends MsPortalFx.ViewModels.BladeContract {
                    actionBar: MsPortalFx.ViewModels.ActionBars.Base.Contract;
                    parameterProvider: MsPortalFx.ViewModels.ParameterProvider<any, any>;
                }
            }
        }
    }
    export interface Project$ProjectPartViewModel$Contract extends ViewModels.Project.ProjectPartViewModel.Contract {
    }
    export interface Project$ServicePartViewModel$Contract extends ViewModels.Project.ServicePartViewModel.Contract {
    }
    export interface Project$ProjectQuickStartPartViewModel$Contract extends ViewModels.Project.ProjectQuickStartPartViewModel.Contract {
    }
    export interface Deployments$DeploymentInfoPart$Contract extends ViewModels.Deployments.DeploymentInfoPart.Contract {
    }
    export interface Project$SettingsBladeViewModel$Contract extends ViewModels.Project.SettingsBladeViewModel.Contract {
    }
    export interface Project$PropertiesBladeViewModel$Contract extends ViewModels.Project.PropertiesBladeViewModel.Contract {
    }
    export interface Project$PropertiesPartViewModel$Contract extends ViewModels.Project.PropertiesPartViewModel.Contract {
    }
    export interface Project$ProjectQuickStartBladeViewModel$Contract extends ViewModels.Project.ProjectQuickStartBladeViewModel.Contract {
    }
    export interface Project$ProjectQuickStartInfoListViewModel$Contract extends ViewModels.Project.ProjectQuickStartInfoListViewModel.Contract {
    }
    export interface ProjectCreate$CreateBladeViewModel$Contract extends ViewModels.ProjectCreate.CreateBladeViewModel.Contract {
    }
    export interface Project$ServiceBladeAdapter$Contract extends ViewModels.Project.ServiceBladeAdapter.Contract {
    }
    export interface Project$ProjectBladeAdapter$Contract extends ViewModels.Project.ProjectBladeAdapter.Contract {
    }
    export interface Project$ProjectAssetTypeViewModel$Contract extends ViewModels.Project.ProjectAssetTypeViewModel.Contract {
    }
    export interface Project$ServiceAssetTypeViewModel$Contract extends ViewModels.Project.ServiceAssetTypeViewModel.Contract {
    }
    export interface ProjectDataContextContainer extends FxImpl.Extension.DataContextContainer<Project.DataContext> {
    }
    export interface ProjectViewModelFactories extends ProjectDataContextContainer {
        ProjectPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectPartViewModel$Contract>;
        ServicePartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ServicePartViewModel$Contract>;
        ProjectQuickStartPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectQuickStartPartViewModel$Contract>;
        SettingsBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<Project$SettingsBladeViewModel$Contract>;
        PropertiesBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$PropertiesBladeViewModel$Contract>;
        PropertiesPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$PropertiesPartViewModel$Contract>;
        ProjectQuickStartBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectQuickStartBladeViewModel$Contract>;
        ProjectQuickStartInfoListViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectQuickStartInfoListViewModel$Contract>;
        ServiceBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<Project$ServiceBladeAdapter$Contract>;
        ProjectBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectBladeAdapter$Contract>;
        ProjectAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ProjectAssetTypeViewModel$Contract>;
        ServiceAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<Project$ServiceAssetTypeViewModel$Contract>;
    }
    export interface DeploymentsDataContextContainer extends FxImpl.Extension.DataContextContainer<Deployments.DataContext> {
    }
    export interface DeploymentsViewModelFactories extends DeploymentsDataContextContainer {
        DeploymentInfoPart(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<Deployments$DeploymentInfoPart$Contract>;
    }
    export interface ProjectCreateDataContextContainer extends FxImpl.Extension.DataContextContainer<ProjectCreate.DataContext> {
    }
    export interface ProjectCreateViewModelFactories extends ProjectCreateDataContextContainer {
        CreateBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ProjectCreate$CreateBladeViewModel$Contract>;
    }
    export interface ViewModelFactories {
        Project(): ExtensionDefinition.ProjectViewModelFactories;
        Deployments(): ExtensionDefinition.DeploymentsViewModelFactories;
        ProjectCreate(): ExtensionDefinition.ProjectCreateViewModelFactories;
    }
}
