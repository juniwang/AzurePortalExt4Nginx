﻿/**
 * @file Source code generated by PDL compiler.
 * @version 1.0
 * @sdkversion 5.0.302.813 (production_sdk#17c60b9.170725-1209)
 * @schemaversion 1.0.0.2
 */
/// <reference path="../TypeReferences.d.ts" />

import ExtensionDefinition = require ("./ExtensionDefinition");
import FxCompositionPdlBlade = require ("Fx/Composition/Pdl/Blade");
import Serviceassettypeviewmodel = require ("Project/Services/ViewModels/ServiceAssetTypeViewModel");
import Projectassettypeviewmodel = require ("Project/Browse/ViewModels/ProjectAssetTypeViewModel");
import Projectbladeadapter = require ("../_generated/adapters/blade/ProjectBladeAdapter");
import Servicebladeadapter = require ("../_generated/adapters/blade/ServiceBladeAdapter");
import Createbladeviewmodel = require ("../NginxCreate/ViewModels/CreateBladeViewModel");
import Projectquickstartinfolistviewmodel = require ("Project/QuickStart/ViewModels/ProjectQuickStartInfoListViewModel");
import Projectquickstartbladeviewmodel = require ("Project/QuickStart/ViewModels/ProjectQuickStartBladeViewModel");
import Propertiespartviewmodel = require ("../Project/Properties/ViewModels/PropertiesPartViewModel");
import Propertiesbladeviewmodel = require ("../Project/Properties/ViewModels/PropertiesBladeViewModel");
import Settingsbladeviewmodel = require ("../Project/Settings/ViewModels/SettingsBladeViewModel");
import Deploymentinfopart = require ("../Deployments/ViewModels/DeploymentInfoPart");
import Projectquickstartpartviewmodel = require ("Project/QuickStart/ViewModels/ProjectQuickStartPartViewModel");
import Servicepartviewmodel = require ("Project/Services/ViewModels/ServicePartViewModel");
import Projectpartviewmodel = require ("Project/Browse/ViewModels/ProjectPartViewModel");
import Project = require ("../Project/ProjectArea");
import Deployments = require ("../Deployments/DeploymentsArea");
import NginxCreate = require ("../NginxCreate/NginxCreateArea");
export = ViewModelFactories;
module ViewModelFactories {
    export class ProjectViewModelFactoriesBase extends FxImpl.Extension.ViewModelAreaFactoriesBase<Project.DataContext> implements ExtensionDefinition.ProjectViewModelFactories,ExtensionDefinition.ProjectDataContextContainer {
        public ProjectPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectPartViewModel$Contract> {
            return this.loadViewModelAsync<typeof Projectpartviewmodel, ExtensionDefinition.Project$ProjectPartViewModel$Contract>(
            "Project/Browse/ViewModels/ProjectPartViewModel",
            (providerModule) => new providerModule.ProjectPartViewModel(container, initialState, this.dataContext),
            require);
        }
        public ServicePartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServicePartViewModel$Contract> {
            return this.loadViewModelAsync<typeof Servicepartviewmodel, ExtensionDefinition.Project$ServicePartViewModel$Contract>(
            "Project/Services/ViewModels/ServicePartViewModel",
            (providerModule) => new providerModule.ServicePartViewModel(container, initialState, this.dataContext),
            require);
        }
        public ProjectQuickStartPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartPartViewModel$Contract> {
            return this.loadViewModelAsync<typeof Projectquickstartpartviewmodel, ExtensionDefinition.Project$ProjectQuickStartPartViewModel$Contract>(
            "Project/QuickStart/ViewModels/ProjectQuickStartPartViewModel",
            (providerModule) => new providerModule.ProjectQuickStartPartViewModel(container, initialState, this.dataContext),
            require);
        }
        public SettingsBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$SettingsBladeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Settingsbladeviewmodel, ExtensionDefinition.Project$SettingsBladeViewModel$Contract>(
            "../Project/Settings/ViewModels/SettingsBladeViewModel",
            (providerModule) => new providerModule.SettingsBladeViewModel(container, initialState, this.dataContext),
            require);
        }
        public PropertiesBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$PropertiesBladeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Propertiesbladeviewmodel, ExtensionDefinition.Project$PropertiesBladeViewModel$Contract>(
            "../Project/Properties/ViewModels/PropertiesBladeViewModel",
            (providerModule) => new providerModule.PropertiesBladeViewModel(container, initialState, this.dataContext),
            require);
        }
        public PropertiesPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$PropertiesPartViewModel$Contract> {
            return this.loadViewModelAsync<typeof Propertiespartviewmodel, ExtensionDefinition.Project$PropertiesPartViewModel$Contract>(
            "../Project/Properties/ViewModels/PropertiesPartViewModel",
            (providerModule) => new providerModule.PropertiesPartViewModel(container, initialState, this.dataContext),
            require);
        }
        public ProjectQuickStartBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartBladeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Projectquickstartbladeviewmodel, ExtensionDefinition.Project$ProjectQuickStartBladeViewModel$Contract>(
            "Project/QuickStart/ViewModels/ProjectQuickStartBladeViewModel",
            (providerModule) => new providerModule.ProjectQuickStartBladeViewModel(container, initialState, this.dataContext),
            require);
        }
        public ProjectQuickStartInfoListViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartInfoListViewModel$Contract> {
            return this.loadViewModelAsync<typeof Projectquickstartinfolistviewmodel, ExtensionDefinition.Project$ProjectQuickStartInfoListViewModel$Contract>(
            "Project/QuickStart/ViewModels/ProjectQuickStartInfoListViewModel",
            (providerModule) => new providerModule.ProjectQuickStartInfoListViewModel(container, initialState, this.dataContext),
            require);
        }
        public ServiceBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServiceBladeAdapter$Contract> {
            return this.loadViewModelAsync<typeof Servicebladeadapter, ExtensionDefinition.Project$ServiceBladeAdapter$Contract>(
            "../_generated/adapters/blade/ServiceBladeAdapter",
            (providerModule) => new providerModule.ServiceBladeAdapter(container, initialState, this.dataContext),
            require);
        }
        public ProjectBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectBladeAdapter$Contract> {
            return this.loadViewModelAsync<typeof Projectbladeadapter, ExtensionDefinition.Project$ProjectBladeAdapter$Contract>(
            "../_generated/adapters/blade/ProjectBladeAdapter",
            (providerModule) => new providerModule.ProjectBladeAdapter(container, initialState, this.dataContext),
            require);
        }
        public ProjectAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectAssetTypeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Projectassettypeviewmodel, ExtensionDefinition.Project$ProjectAssetTypeViewModel$Contract>(
            "Project/Browse/ViewModels/ProjectAssetTypeViewModel",
            (providerModule) => new providerModule.ProjectAssetTypeViewModel(container, initialState, this.dataContext),
            require);
        }
        public ServiceAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServiceAssetTypeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Serviceassettypeviewmodel, ExtensionDefinition.Project$ServiceAssetTypeViewModel$Contract>(
            "Project/Services/ViewModels/ServiceAssetTypeViewModel",
            (providerModule) => new providerModule.ServiceAssetTypeViewModel(container, initialState, this.dataContext),
            require);
        }
    }
    export class DeploymentsViewModelFactoriesBase extends FxImpl.Extension.ViewModelAreaFactoriesBase<Deployments.DataContext> implements ExtensionDefinition.DeploymentsViewModelFactories,ExtensionDefinition.DeploymentsDataContextContainer {
        public DeploymentInfoPart(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Deployments$DeploymentInfoPart$Contract> {
            return this.loadViewModelAsync<typeof Deploymentinfopart, ExtensionDefinition.Deployments$DeploymentInfoPart$Contract>(
            "../Deployments/ViewModels/DeploymentInfoPart",
            (providerModule) => new providerModule.DeploymentInfoPart(container, initialState, this.dataContext),
            require);
        }
    }
    export class NginxCreateViewModelFactoriesBase extends FxImpl.Extension.ViewModelAreaFactoriesBase<NginxCreate.DataContext> implements ExtensionDefinition.NginxCreateViewModelFactories,ExtensionDefinition.NginxCreateDataContextContainer {
        public CreateBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.NginxCreate$CreateBladeViewModel$Contract> {
            return this.loadViewModelAsync<typeof Createbladeviewmodel, ExtensionDefinition.NginxCreate$CreateBladeViewModel$Contract>(
            "../NginxCreate/ViewModels/CreateBladeViewModel",
            (providerModule) => new providerModule.CreateBladeViewModel(container, initialState, this.dataContext),
            require);
        }
    }
    function getProject(viewModelFactories: ExtensionDefinition.ViewModelFactories): ExtensionDefinition.ProjectViewModelFactories {
        return viewModelFactories.Project();
    }
    function getDeployments(viewModelFactories: ExtensionDefinition.ViewModelFactories): ExtensionDefinition.DeploymentsViewModelFactories {
        return viewModelFactories.Deployments();
    }
    function getNginxCreate(viewModelFactories: ExtensionDefinition.ViewModelFactories): ExtensionDefinition.NginxCreateViewModelFactories {
        return viewModelFactories.NginxCreate();
    }
    export class ViewModelFactoriesBase implements ExtensionDefinition.ViewModelFactories {
        private _ProjectViewModelFactories: ExtensionDefinition.ProjectViewModelFactories;
        public SetProjectViewModelFactories(factories: ExtensionDefinition.ProjectViewModelFactories): void {
            this._ProjectViewModelFactories = factories;
        }
        public Project(): ExtensionDefinition.ProjectViewModelFactories {
            this._ProjectViewModelFactories = this._ProjectViewModelFactories || new ProjectViewModelFactoriesBase();
            return this._ProjectViewModelFactories;
        }
        public Project$ProjectPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectPartViewModel$Contract> {
            return getProject(this).ProjectPartViewModel(container, initialState);
        }
        public Project$ServicePartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServicePartViewModel$Contract> {
            return getProject(this).ServicePartViewModel(container, initialState);
        }
        public Project$ProjectQuickStartPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartPartViewModel$Contract> {
            return getProject(this).ProjectQuickStartPartViewModel(container, initialState);
        }
        private _DeploymentsViewModelFactories: ExtensionDefinition.DeploymentsViewModelFactories;
        public SetDeploymentsViewModelFactories(factories: ExtensionDefinition.DeploymentsViewModelFactories): void {
            this._DeploymentsViewModelFactories = factories;
        }
        public Deployments(): ExtensionDefinition.DeploymentsViewModelFactories {
            this._DeploymentsViewModelFactories = this._DeploymentsViewModelFactories || new DeploymentsViewModelFactoriesBase();
            return this._DeploymentsViewModelFactories;
        }
        public Deployments$DeploymentInfoPart(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Deployments$DeploymentInfoPart$Contract> {
            return getDeployments(this).DeploymentInfoPart(container, initialState);
        }
        public Project$SettingsBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$SettingsBladeViewModel$Contract> {
            return getProject(this).SettingsBladeViewModel(container, initialState);
        }
        public Project$PropertiesBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$PropertiesBladeViewModel$Contract> {
            return getProject(this).PropertiesBladeViewModel(container, initialState);
        }
        public Project$PropertiesPartViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$PropertiesPartViewModel$Contract> {
            return getProject(this).PropertiesPartViewModel(container, initialState);
        }
        public Project$ProjectQuickStartBladeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartBladeViewModel$Contract> {
            return getProject(this).ProjectQuickStartBladeViewModel(container, initialState);
        }
        public Project$ProjectQuickStartInfoListViewModel(container: MsPortalFx.ViewModels.PartContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectQuickStartInfoListViewModel$Contract> {
            return getProject(this).ProjectQuickStartInfoListViewModel(container, initialState);
        }
        private _NginxCreateViewModelFactories: ExtensionDefinition.NginxCreateViewModelFactories;
        public SetNginxCreateViewModelFactories(factories: ExtensionDefinition.NginxCreateViewModelFactories): void {
            this._NginxCreateViewModelFactories = factories;
        }
        public NginxCreate(): ExtensionDefinition.NginxCreateViewModelFactories {
            this._NginxCreateViewModelFactories = this._NginxCreateViewModelFactories || new NginxCreateViewModelFactoriesBase();
            return this._NginxCreateViewModelFactories;
        }
        public NginxCreate$CreateBladeViewModel(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.NginxCreate$CreateBladeViewModel$Contract> {
            return getNginxCreate(this).CreateBladeViewModel(container, initialState);
        }
        public Project$ServiceBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServiceBladeAdapter$Contract> {
            return getProject(this).ServiceBladeAdapter(container, initialState);
        }
        public Project$ProjectBladeAdapter(container: FxCompositionPdlBlade.Container, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectBladeAdapter$Contract> {
            return getProject(this).ProjectBladeAdapter(container, initialState);
        }
        public Project$ProjectAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ProjectAssetTypeViewModel$Contract> {
            return getProject(this).ProjectAssetTypeViewModel(container, initialState);
        }
        public Project$ServiceAssetTypeViewModel(container: MsPortalFx.ViewModels.ContainerContract, initialState?: any): MsPortalFx.Base.PromiseV<ExtensionDefinition.Project$ServiceAssetTypeViewModel$Contract> {
            return getProject(this).ServiceAssetTypeViewModel(container, initialState);
        }
    }
}
