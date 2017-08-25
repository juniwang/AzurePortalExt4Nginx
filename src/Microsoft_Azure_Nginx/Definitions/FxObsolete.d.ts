/// <reference path="FxEnvironment.d.ts" />
/// <reference path="Html5.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="MsPortalFx.d.ts" />
/// <reference path="Q.d.ts" />
/// <reference path="require.d.ts" />

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\FxObsolete\Controls\BaseResourceDropDown.d.ts
declare module "FxObsolete/Controls/BaseResourceDropDown" {
    import FxViewModels = MsPortalFx.ViewModels;
    import Forms = FxViewModels.Forms;
    export = Main;
    module Main {
        /**
         * The contract for legacy controls
         * It has a different item structure and a helper to find objects by name
         */
        interface Contract<TValue> {
            /**
             * The available items for the dropdown control
             */
            readonly items: KnockoutObservableBase<FxViewModels.Obsolete.Forms.FilterComboBox.HierarchicalFormOption<string>[]>;
            /**
             * Returns the corresponding object in the drop down list for the given name.
             * @param  name The name to match the object.
             * @return The corresponding object that matches the name.
             */
            getObjectByName(name: string): TValue;
        }
        /**
         * The contract for legacy controls
         * It has a different item structure and a helper to find objects by name
         */
        interface Options<TValue> {
            form: Forms.Form.ViewModel<any>;
            /**
             * The edit scope accessor associated with the drop down control.
             */
            accessor: Forms.EditScopeAccessors<TValue>;
            /**
             * A list of validations that should be applied to the form field.
             */
            validations: KnockoutObservableArray<MsPortalFx.ViewModels.FormValidation>;
        }
        interface ResourceGroupOptions<TValue> extends Options<TValue> {
            /**
             * The observable that holds the subscription id used to filter locations.
             */
            subscriptionIdObservable: KnockoutObservableBase<string>;
        }
        interface LocationOptions<TValue> extends Options<TValue> {
            /**
             * The observable that holds the subscription id used to filter locations.
             */
            subscriptionIdObservable: KnockoutObservableBase<string>;
            /**
             * Optional. The observable that holds the list of resource types used to filter locations.
             */
            resourceTypesObservable?: KnockoutObservableBase<string[]>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\FxObsolete\Controls\LocationDropDown.d.ts
declare module "FxObsolete/Controls/LocationDropDown" {
    import { Location, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    import { Contract as LegacyContract, LocationOptions as LegacyOptions } from "FxObsolete/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<Location>;
        /**
         * The contract for the values returned by the location dropdown
         */
        export import Location = MsPortalFx.Azure.Location;
        /**
         * The contract for options to create the location drop down
         */
        type Options = Location.BaseOptions & LegacyOptions<Location>;
        /**
         * The contract for the location dropdown
         */
        interface Contract extends Location.Contract, LegacyContract<Location> {
        }
        /**
         * This is a drop in replacement for MsPortalFx.Azure.Location.DropDown.
         * Not all options from the old dropdown are respected, and does not respect the legacy contract.
         * If you don't have an editscope, use create() rather than createLegacy()
         * @param container The container associated with the part or other composition item.
         * @param legacyOptions The legacy location dropdown options. See interface
         */
        function create(container: FxViewModels.ContainerContract, legacyOptions?: Options): Contract;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\FxObsolete\Controls\ResourceGroupDropDown.d.ts
declare module "FxObsolete/Controls/ResourceGroupDropDown" {
    import { ResourceGroup } from "Fx/Controls/BaseResourceDropDown";
    import { Contract as LegacyContract, ResourceGroupOptions as LegacyOptions } from "FxObsolete/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        /**
         * The modes possible for the dropdown
         */
        export import Mode = ResourceGroup.Mode;
        /**
         * The mode of the value returned by the control
         */
        export import SelectedMode = ResourceGroup.SelectedMode;
        /**
         * The contract for the values returned by the subscription dropdown
         */
        export import Value = ResourceGroup.Value;
        /**
         * The contract for options to create the subscription drop down
         */
        type Options = ResourceGroup.BaseOptions & LegacyOptions<Value>;
        /**
         * The contract for the subscription dropdown
         */
        interface Contract extends ResourceGroup.Contract, LegacyContract<ResourceGroup.Value> {
        }
        /**
         * This is a drop in replacement for MsPortalFx.Azure.ResourceGroups.DropDown.
         * Not all options from the old dropdown are respected, and does not respect the legacy contract.
         * If you don't have an editscope, use create() rather than createLegacy()
         * @param container The container associated with the part or other composition item.
         * @param legacyOptions The legacy subscription dropdown options. See interface
         */
        function create(container: FxViewModels.ContainerContract, legacyOptions?: Options): Contract;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\FxObsolete\Controls\SubscriptionDropDown.d.ts
declare module "FxObsolete/Controls/SubscriptionDropDown" {
    import { Subscription } from "Fx/Controls/BaseResourceDropDown";
    import { Contract as LegacyContract, Options as BaseLegacyOptions } from "FxObsolete/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        /**
         * The contract for the values returned by the subscription dropdown
         */
        export import Subscription = MsPortalFx.Azure.Subscription;
        /**
         * The contract for options to create the subscription drop down
         */
        type Options = Subscription.BaseOptions & BaseLegacyOptions<Subscription>;
        /**
         * The contract for the subscription dropdown
         */
        interface Contract extends Subscription.Contract, LegacyContract<Subscription> {
            /**
             * An observable which holds the string id of the subscription
             */
            subscriptionId: KnockoutObservableBase<string>;
        }
        /**
         * This is a drop in replacement for MsPortalFx.Azure.Subscriptions.DropDown.
         * Not all options from the old dropdown are respected, and does not respect the legacy contract.
         * If you don't have an editscope, use create() rather than createLegacy()
         * @param container The container associated with the part or other composition item.
         * @param legacyOptions The legacy subscription dropdown options. See interface
         */
        function create(container: FxViewModels.ContainerContract, legacyOptions?: Options): Contract;
    }
}
