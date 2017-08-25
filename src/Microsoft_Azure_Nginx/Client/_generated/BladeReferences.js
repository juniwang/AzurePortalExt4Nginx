var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Fx/Composition/Selectable"], function (require, exports, FxSelectable2) {
    "use strict";
    var BladeDefinitions;
    (function (BladeDefinitions) {
        var extensionName = "Microsoft_Azure_Nginx";
        function createOptions(onClosed, parameters, callbacks) {
            return {
                onClosed: onClosed,
                parameters: parameters,
                callbacks: callbacks
            };
        }
        var DeploymentsBladeReference = (function (_super) {
            __extends(DeploymentsBladeReference, _super);
            function DeploymentsBladeReference(parameters, onClosed) {
                return _super.call(this, "DeploymentsBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return DeploymentsBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.DeploymentsBladeReference = DeploymentsBladeReference;
        var PropertiesBladeReference = (function (_super) {
            __extends(PropertiesBladeReference, _super);
            function PropertiesBladeReference(parameters, onClosed) {
                return _super.call(this, "PropertiesBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return PropertiesBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.PropertiesBladeReference = PropertiesBladeReference;
        var ProjectQuickStartBladeReference = (function (_super) {
            __extends(ProjectQuickStartBladeReference, _super);
            function ProjectQuickStartBladeReference(onClosed) {
                return _super.call(this, "ProjectQuickStartBlade", extensionName, createOptions(onClosed, undefined), {}) || this;
            }
            return ProjectQuickStartBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ProjectQuickStartBladeReference = ProjectQuickStartBladeReference;
        var CreateBladeReference = (function (_super) {
            __extends(CreateBladeReference, _super);
            function CreateBladeReference(options) {
                return _super.call(this, "CreateBlade", extensionName, options) || this;
            }
            return CreateBladeReference;
        }(FxSelectable2.ParameterProviderBladeReference));
        BladeDefinitions.CreateBladeReference = CreateBladeReference;
        var ServiceBladeReference = (function (_super) {
            __extends(ServiceBladeReference, _super);
            function ServiceBladeReference(parameters, onClosed) {
                return _super.call(this, "ServiceBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return ServiceBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ServiceBladeReference = ServiceBladeReference;
        var ProjectBladeReference = (function (_super) {
            __extends(ProjectBladeReference, _super);
            function ProjectBladeReference(parameters, onClosed) {
                return _super.call(this, "ProjectBlade", extensionName, createOptions(onClosed, parameters), {}) || this;
            }
            return ProjectBladeReference;
        }(FxSelectable2.PdlBladeReference));
        BladeDefinitions.ProjectBladeReference = ProjectBladeReference;
    })(BladeDefinitions || (BladeDefinitions = {}));
    return BladeDefinitions;
});
