var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ViewModelFactories;
    (function (ViewModelFactories) {
        var ProjectViewModelFactoriesBase = (function (_super) {
            __extends(ProjectViewModelFactoriesBase, _super);
            function ProjectViewModelFactoriesBase() {
                return _super.apply(this, arguments) || this;
            }
            ProjectViewModelFactoriesBase.prototype.ProjectPartViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/Browse/ViewModels/ProjectPartViewModel", function (providerModule) { return new providerModule.ProjectPartViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ServicePartViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/Services/ViewModels/ServicePartViewModel", function (providerModule) { return new providerModule.ServicePartViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ProjectQuickStartPartViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/QuickStart/ViewModels/ProjectQuickStartPartViewModel", function (providerModule) { return new providerModule.ProjectQuickStartPartViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.PropertiesBladeViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../Project/Properties/ViewModels/PropertiesBladeViewModel", function (providerModule) { return new providerModule.PropertiesBladeViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.PropertiesPartViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../Project/Properties/ViewModels/PropertiesPartViewModel", function (providerModule) { return new providerModule.PropertiesPartViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ProjectQuickStartBladeViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/QuickStart/ViewModels/ProjectQuickStartBladeViewModel", function (providerModule) { return new providerModule.ProjectQuickStartBladeViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ProjectQuickStartInfoListViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/QuickStart/ViewModels/ProjectQuickStartInfoListViewModel", function (providerModule) { return new providerModule.ProjectQuickStartInfoListViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ServiceBladeAdapter = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../_generated/adapters/blade/ServiceBladeAdapter", function (providerModule) { return new providerModule.ServiceBladeAdapter(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ProjectBladeAdapter = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../_generated/adapters/blade/ProjectBladeAdapter", function (providerModule) { return new providerModule.ProjectBladeAdapter(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ProjectAssetTypeViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/Browse/ViewModels/ProjectAssetTypeViewModel", function (providerModule) { return new providerModule.ProjectAssetTypeViewModel(container, initialState, _this.dataContext); }, require);
            };
            ProjectViewModelFactoriesBase.prototype.ServiceAssetTypeViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("Project/Services/ViewModels/ServiceAssetTypeViewModel", function (providerModule) { return new providerModule.ServiceAssetTypeViewModel(container, initialState, _this.dataContext); }, require);
            };
            return ProjectViewModelFactoriesBase;
        }(FxImpl.Extension.ViewModelAreaFactoriesBase));
        ViewModelFactories.ProjectViewModelFactoriesBase = ProjectViewModelFactoriesBase;
        var DeploymentsViewModelFactoriesBase = (function (_super) {
            __extends(DeploymentsViewModelFactoriesBase, _super);
            function DeploymentsViewModelFactoriesBase() {
                return _super.apply(this, arguments) || this;
            }
            DeploymentsViewModelFactoriesBase.prototype.DeploymentInfoPart = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../Deployments/ViewModels/DeploymentInfoPart", function (providerModule) { return new providerModule.DeploymentInfoPart(container, initialState, _this.dataContext); }, require);
            };
            return DeploymentsViewModelFactoriesBase;
        }(FxImpl.Extension.ViewModelAreaFactoriesBase));
        ViewModelFactories.DeploymentsViewModelFactoriesBase = DeploymentsViewModelFactoriesBase;
        var ProjectCreateViewModelFactoriesBase = (function (_super) {
            __extends(ProjectCreateViewModelFactoriesBase, _super);
            function ProjectCreateViewModelFactoriesBase() {
                return _super.apply(this, arguments) || this;
            }
            ProjectCreateViewModelFactoriesBase.prototype.CreateBladeViewModel = function (container, initialState) {
                var _this = this;
                return this.loadViewModelAsync("../ProjectCreate/ViewModels/CreateBladeViewModel", function (providerModule) { return new providerModule.CreateBladeViewModel(container, initialState, _this.dataContext); }, require);
            };
            return ProjectCreateViewModelFactoriesBase;
        }(FxImpl.Extension.ViewModelAreaFactoriesBase));
        ViewModelFactories.ProjectCreateViewModelFactoriesBase = ProjectCreateViewModelFactoriesBase;
        function getProject(viewModelFactories) {
            return viewModelFactories.Project();
        }
        function getDeployments(viewModelFactories) {
            return viewModelFactories.Deployments();
        }
        function getProjectCreate(viewModelFactories) {
            return viewModelFactories.ProjectCreate();
        }
        var ViewModelFactoriesBase = (function () {
            function ViewModelFactoriesBase() {
            }
            ViewModelFactoriesBase.prototype.SetProjectViewModelFactories = function (factories) {
                this._ProjectViewModelFactories = factories;
            };
            ViewModelFactoriesBase.prototype.Project = function () {
                this._ProjectViewModelFactories = this._ProjectViewModelFactories || new ProjectViewModelFactoriesBase();
                return this._ProjectViewModelFactories;
            };
            ViewModelFactoriesBase.prototype.Project$ProjectPartViewModel = function (container, initialState) {
                return getProject(this).ProjectPartViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ServicePartViewModel = function (container, initialState) {
                return getProject(this).ServicePartViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ProjectQuickStartPartViewModel = function (container, initialState) {
                return getProject(this).ProjectQuickStartPartViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.SetDeploymentsViewModelFactories = function (factories) {
                this._DeploymentsViewModelFactories = factories;
            };
            ViewModelFactoriesBase.prototype.Deployments = function () {
                this._DeploymentsViewModelFactories = this._DeploymentsViewModelFactories || new DeploymentsViewModelFactoriesBase();
                return this._DeploymentsViewModelFactories;
            };
            ViewModelFactoriesBase.prototype.Deployments$DeploymentInfoPart = function (container, initialState) {
                return getDeployments(this).DeploymentInfoPart(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$PropertiesBladeViewModel = function (container, initialState) {
                return getProject(this).PropertiesBladeViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$PropertiesPartViewModel = function (container, initialState) {
                return getProject(this).PropertiesPartViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ProjectQuickStartBladeViewModel = function (container, initialState) {
                return getProject(this).ProjectQuickStartBladeViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ProjectQuickStartInfoListViewModel = function (container, initialState) {
                return getProject(this).ProjectQuickStartInfoListViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.SetProjectCreateViewModelFactories = function (factories) {
                this._ProjectCreateViewModelFactories = factories;
            };
            ViewModelFactoriesBase.prototype.ProjectCreate = function () {
                this._ProjectCreateViewModelFactories = this._ProjectCreateViewModelFactories || new ProjectCreateViewModelFactoriesBase();
                return this._ProjectCreateViewModelFactories;
            };
            ViewModelFactoriesBase.prototype.ProjectCreate$CreateBladeViewModel = function (container, initialState) {
                return getProjectCreate(this).CreateBladeViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ServiceBladeAdapter = function (container, initialState) {
                return getProject(this).ServiceBladeAdapter(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ProjectBladeAdapter = function (container, initialState) {
                return getProject(this).ProjectBladeAdapter(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ProjectAssetTypeViewModel = function (container, initialState) {
                return getProject(this).ProjectAssetTypeViewModel(container, initialState);
            };
            ViewModelFactoriesBase.prototype.Project$ServiceAssetTypeViewModel = function (container, initialState) {
                return getProject(this).ServiceAssetTypeViewModel(container, initialState);
            };
            return ViewModelFactoriesBase;
        }());
        ViewModelFactories.ViewModelFactoriesBase = ViewModelFactoriesBase;
    })(ViewModelFactories || (ViewModelFactories = {}));
    return ViewModelFactories;
});
