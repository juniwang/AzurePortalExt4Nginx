/// <reference path="FxEnvironment.d.ts" />
/// <reference path="Html5.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="MsPortalFx.d.ts" />
/// <reference path="Q.d.ts" />
/// <reference path="require.d.ts" />

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Assets\Assets.d.ts
declare module "Fx/Assets/Assets" {
    export = Main;
    module Main {
        import FxAssets = MsPortalFx.Assets;
        /**
         * Finds the asset type information for the given resource type from the collection of asset types.
         * NOTE: The asset types must come from the API MsPortalFx.Assets.getResourceTypeAssetTypeInformation().
         *
         * @param {string} resourceType The resource type to find.
         * @param {FxAssets.ResourceTypeAssetTypeInformation[]} assetTypes The array of asset type information from the getResourceTypeAssetTypeInformation API.
         * @returns {FxAssets.ResourceTypeAssetTypeInformation} The result asset type information if found, otherwise undefined.
         */
        function findAssetTypeInformation(resourceType: string, assetTypes: FxAssets.ResourceTypeAssetTypeInformation[]): FxAssets.ResourceTypeAssetTypeInformation;
        /**
         * Finds the asset type information for the given resource ID from the collection of asset types.
         * NOTE: The asset types must come from the API MsPortalFx.Assets.getResourceTypeAssetTypeInformation().
         *
         * @param {string} resourceID The resource ID for the resource type to find.
         * @param {FxAssets.ResourceTypeAssetTypeInformation[]} assetTypes The array of asset type information from the getResourceTypeAssetTypeInformation API.
         * @returns {FxAssets.ResourceTypeAssetTypeInformation} The result asset type information if found, otherwise undefined.
         */
        function findAssetTypeInformationFromResourceId(resourceId: string, assetTypes: FxAssets.ResourceTypeAssetTypeInformation[]): FxAssets.ResourceTypeAssetTypeInformation;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Base\Base.Net.Batch.d.ts
declare module "Fx/Base/Base.Net.Batch" {
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import Net2 = FxBase.Net2;
        /**
         * The contract for the batch settings.
         */
        interface BatchMultipleSettings {
            /**
             * The endpoint to make the request to.
             */
            endpoint: string;
            /**
             * The list of batch requests. All URIs have to be relative URIs in the request.
             */
            batchRequests: BatchRequest[];
            /**
             * Determines whether the ajax request is part of a background task.
             * If true the batch request will be pushed on to the background queue.
             */
            isBackgroundTask?: boolean;
            /**
             * Determines whether to append a telemetry header for the ARM calls.
             *
             * Set to a non-empty string to append the header. The value should be 60 characters or less and will be trimmed
             * if longer.
             */
            telemetryHeader?: string;
        }
        /**
         * Response for a request within a batch.
         */
        interface BatchResponseItem<T> {
            /**
             * The response content. Can be success or failure.
             */
            content: T;
            /**
             * The response headers.
             */
            headers: StringMap<string>;
            /**
             * The response status code.
             */
            httpStatusCode: number;
        }
        /**
         * Batch response.
         */
        interface BatchResponse {
            /**
             * The success response from ARM.
             */
            responses: BatchResponseItem<any>[];
        }
        /**
         * Individual batch request.
         */
        interface BatchRequest {
            /**
             * The URI to call.
             */
            uri: string;
            /**
             * The http method for the call. Defaults to GET
             * Note that ARM only supports GET calls in batch.
             */
            httpMethod?: string;
        }
        /**
         * Calls the API by batching multiple requests together.
         * Use this API if you have a single AJAX request but there is potential for batching this
         * with other requests.
         *
         * There are a few limitations when using this:
         *   - All requests must have absolute URIs
         *   - All requests to ARM must start with /providers/.. or /subscriptions/...
         *   - ARM only supports GET requests
         *
         * @param settings The settings to use to call batch.
         */
        function batch<T>(settings: Net2.NetAjaxSettings<T>): FxBase.PromiseV<BatchResponseItem<T>>;
        /**
         * Performs a batch ajax request using the given set of URIs.
         * This API is recommended if you have a set of URIs that can be called concurrently using batch.
          * There are a few limitations when using this:
         *   - All requests must have absolute URIs
         *   - All requests to ARM must start with /providers/.. or /subscriptions/...
         *   - ARM only supports GET requests
         *   - The max number of requests in a batch call is 20
         *
         * @param settings The settings that are to be passed to the batch call.
         * @return A promise for the batch call.
         */
        function batchMultiple(settings: BatchMultipleSettings): FxBase.PromiseV<BatchResponse>;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\Blade.d.ts
declare module "Fx/Composition/Blade" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import FxBladeBase = require("Fx/Composition/BladeBase");
    export = MsPortalFxBlade;
    module MsPortalFxBlade {
        import PartReference = MsPortalFx.Composition.PartReference;
        /**
         * The @Blade decorator.  Identifies a class within the extension as a Blade view model class.
         *
         * @options Metadata describing the Blade and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (bladeClass: BladeClass) => void;
        /**
         * Constrains the @Blade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface BladeClass extends FxBladeBase.BladeClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @Blade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxBladeBase.Contract<TParameters, TModel> {
            /**
             * The view model that the FX will bind into the view for this Blade.  This property must be set before 'container.revealContent()'
             * is called (if it is) and before the promise returned from 'onInitialize' is resolved.
             */
            viewModel: any;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' method.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Status bar for a Blade.
         */
        interface StatusBar extends FxBladeBase.StatusBar {
            /**
             * The state of the Blade.
             */
            state: ContentState;
        }
        /**
         * Specifies which content state decoration should be applied to a Blade.
         */
        export import ContentState = FxBladeBase.ContentState;
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' method.
         */
        interface Context<TParameters, TModel> extends FxBladeBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the Blade.
             */
            container: Container;
            /**
             * An API a Blade can use to interact with the Form Fields on the Blade.
             */
            form: FxBladeBase.FormManagement;
        }
        /**
         * Describes if/when to display an alert when the blade closes.
         */
        export import AlertLevel = FxBladeBase.AlertLevel;
        /**
         * Options supplied to the @Blade decorator.  Includes metadata describing the Blade and how it will be treated by
         * the FX.
         */
        interface Options extends FxBladeBase.Options, FxViewModelBase.AcceptsStyleSheetsOptions {
        }
        /**
         * Represents a container object that can be used to control the chrome of the Blade.
         */
        interface Container extends FxBladeBase.Container, FxBladeBase.CanHaveCommandBarContainer {
            /**
             * The status bar of the Blade.
             */
            statusBar: KnockoutObservable<StatusBar>;
            /**
             * The path to the help content file.
             */
            helpContentUri: KnockoutObservable<string>;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the Blade view model such that it implements an 'onRebind' method that will be
             * called when the Blade's parameters are changed.  Parameter changes are caused by, for example, the parent Blade/Part making
             * a call to a 'container.openBlade()'-related API or by the user updating browser's address bar.
             *
             * When this decorator is not used, whenever parameters change value, the Blade view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxBladeBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its persisted 'settings' values.  The 'settings'
             * values are made available in the view model's 'context', for use in the view model's 'onInitialize' and optional 'onRebind'
             * methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the Blade's settings.
             */
            type Options = FxBladeBase.Configurable.Options;
            /**
             * Metadata describing one setting of the Blade's persisted settings.
             */
            type SettingMetadata = FxBladeBase.Configurable.SettingMetadata;
            /**
             * The scope at which the Blade's settings are persisted.
             */
            export import SettingsScope = FxBladeBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the Blade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the Blade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include 'configuration' (the Blade's configuration
                 * API) as well as 'settings' (the Blade's persisted settings values).
                 */
                context: Context<TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the Blade's configuration API),
             * the 'parameters' of the Blade, as well as its persisted 'settings' values.
             */
            interface Context<TSettings> extends MsPortalFxBlade.Context<any, any>, FxBladeBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its settings.
                 */
                configuration: Configuration<TSettings>;
            }
            /**
             * The Blade's configuration API returned from 'context.configuration'.
             */
            type Configuration<TSettings> = FxBladeBase.Configurable.Configuration<TSettings>;
        }
        module ReturnsData {
            /**
             * The @ReturnsData decorator.  Adds a strongly-typed 'context.container.closeCurrentBlade(data: TData)' to the
             * Blade.
             */
            function Decorator(): (returnsDataClass: ReturnsDataClass) => void;
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface ReturnsDataClass {
                new (): Contract<any>;
            }
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract<TData> {
                /**
                 * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
                 * optional 'onRebind' methods.
                 */
                context: Context<TData>;
            }
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
             * 'onRebind' methods.
             */
            interface Context<TData> {
                /**
                 * A container object that can be used to control the chrome of the Blade.
                 */
                container: FxBladeBase.ReturnsData.Container<TData>;
            }
        }
        module Pinnable {
            /**
             * The @Pinnable decorator.  Requires that the Blade implement an 'onPin' method that determines what Part
             * to pin when the user pins the Blade.
             */
            function Decorator(): (pinnableClass: PinnableClass) => void;
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface PinnableClass {
                new (): Contract;
            }
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract {
                /**
                 * A callback that will be called when the user pins the Blade.  Returns a PartReference to the Part that will be pinned to the
                 * user's Dashboard.
                 */
                onPin(): PartReference<any>;
            }
        }
        module LegacyFeatures {
            /**
             * The @LegacyFeatures decorator.  Used to access legacy features for Blades, like defining an explicit Blade width.
             *
             * @param options Options used to configure the @LegacyFeatures decorator.
             */
            function Decorator(options: Options): (bladeClass: BladeClass) => void;
            /**
             * Options supplied to the @LegacyFeatures decorator.
             */
            interface Options {
                /**
                 * The width for this Blade.
                 */
                width?: Width;
            }
            /**
             * The available widths for the Blade.
             */
            export import Width = FxBladeBase.LegacyFeatures.Width;
        }
        /**
         * The @ProxiedMember decorator.  Identifies a public member of a Blade class that is to be proxied for use in the view.
         * This decorator is not necessary in most scenarios.
         * This decorator suppresses any compile-time errors that state "The '<MEMBER>' member is public and is not bound to the Blade's view."
         */
        export import ProxiedMember = FxViewModelBase.ProxiedMember;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\BladeBase.d.ts
declare module "Fx/Composition/BladeBase" {
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import { Container as PdlBladeContainer } from "Fx/Composition/Pdl/Blade";
    import { ItemType } from "Fx/Internal/Composition/CompositionItem";
    export = Main;
    module Main {
        import FxConfiguration = MsPortalFx.Composition.Configuration;
        import FxToolbars = MsPortalFx.ViewModels.Toolbars;
        /**
         * The class type to which the various Blade decorators can be applied.
         */
        interface BladeClass extends FxViewModelBase.ViewModelClass<any> {
            _fx?: {
                itemType?: ItemType;
                options?: Options;
                ownsEditScope?: boolean;
                rebindable?: boolean;
                parameterProvider?: boolean;
                configurableOptions?: FxViewModelBase.Configurable.Options;
            };
        }
        /**
         * A common interface type for various Blade view model classes.
         */
        interface Contract<TParameters, TModel> extends FxViewModelBase.Contract<TParameters, TModel> {
            /**
             * The displayed title of the Blade.
             * Supply 'null' if no title is desired for the Blade.
             */
            title: string | KnockoutObservableBase<string>;
            /**
             * The displayed subtitle of the Blade.
             * Supply 'null' if no subtitle is desired for the Blade.
             */
            subtitle: string | KnockoutObservableBase<string>;
        }
        /**
         * Status bar for a Blade.
         */
        interface StatusBar {
            /**
             * The text to display in the Blade's status bar.
             */
            text: string;
        }
        /**
         * Specifies which content state decoration should be applied to a Blade.
         */
        export import ContentState = MsPortalFx.ViewModels.ContentState;
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxViewModelBase.Context<TParameters, TModel> {
            /**
             * An API a Blade can use to interact with its host MenuBlade (if applicable).
             */
            menu: MenuBladeManagement;
        }
        /**
         * Represents a container object that can be used to control the chrome of the Blade.
         */
        interface Container extends FxViewModelBase.Container {
        }
        /**
         * Represents a container object that can be used to specify the CommandBar of the Blade.
         */
        interface CanHaveCommandBarContainer {
            /**
             * The command bar of the Blade.  If required, must be set before 'container.revealContent' is called and before the
             * Promise returned from 'onInitialized' is resolved.
             */
            commandBar: FxToolbars.Toolbar;
        }
        /**
         * Options passed to the various Blade decorators.
         */
        interface Options extends FxViewModelBase.Options {
            /**
             * Specifies whether the Blade is pinnable.  Defaults to 'true'.
             */
            isPinnable?: boolean;
        }
        module Rebindable {
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxViewModelBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the Blade's settings.
             */
            type Options = FxViewModelBase.Configurable.Options;
            /**
             * Metadata describing one setting of the Blade's persisted settings.
             */
            type SettingMetadata = FxViewModelBase.Configurable.SettingMetadata;
            /**
             * The scope at which the Blade's settings are persisted.
             */
            export import SettingsScope = FxViewModelBase.Configurable.SettingsScope;
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the Blades's
             * configuration API) as well as 'settings' (the Blade's persisted settings values).
             */
            type Context<TSettings> = FxViewModelBase.Configurable.Context<TSettings>;
            /**
             * The Blade's configuration API returned from 'context.configuration'.
             */
            type Configuration<TSettings> = FxConfiguration.Blade.Contract<TSettings>;
        }
        module ReturnsData {
            /**
             * Represents a container object that can be used to control the chrome of the Blade.
             */
            interface Container<TData> {
                /**
                 * Closes the Blade, returning 'data' to the parent Blade/Part.
                 *
                 * @param data The data to return to the parent Blade/Part.
                 * @return A promise indicating if the Blade was successfully closed.
                 */
                closeCurrentBlade(data: TData): Q.Promise<boolean>;
            }
        }
        module LegacyFeatures {
            /**
             * The available widths for the Blade.
             */
            export import Width = MsPortalFx.Blades.BladeWidth;
        }
        /**
         * An API available as 'context.form' that a Blade can use to interact with the Form Fields on the Blade.
         */
        type FormManagement = MsPortalFx.ViewModels.FormProperties;
        /**
         * Describes if/when to display an alert when the blade closes.
         */
        export import AlertLevel = MsPortalFx.ViewModels.AlertLevel;
        /**
         * An API available as 'context.menu' that a Blade can use to interact with its host MenuBlade (if applicable).
         */
        type MenuBladeManagement = MsPortalFx.ViewModels.MenuBladeManagement;
        /**.
         * The blade 'Container' API for all variations of blades. It's through this API that extensions
         * can interact with the blade's chrome UI.
         */
        type AnyBladeContainer = Container | PdlBladeContainer;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\ButtonPart.d.ts
declare module "Fx/Composition/ButtonPart" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import FxPartBase = require("Fx/Composition/PartBase");
    export = MsPortalFxButtonPart;
    module MsPortalFxButtonPart {
        /**
         * The @ButtonPart decorator.  Identifies a class within the extension as a ButtonPart view model class.
         *
         * @options Metadata describing the ButtonPart and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (partClass: ButtonPartClass) => void;
        /**
         * Constrains the @ButtonPart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface ButtonPartClass extends FxPartBase.PartClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @ButtonPart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> {
            /**
             * The title of the part.
             */
            title: string | KnockoutObservableBase<string>;
            /**
             * A shorter title of the part (for size: mini).
             */
            shortTitle: string | KnockoutObservableBase<string>;
            /**
             * The displayed subtitle for this Part, typically the Asset name for the asset/resource associated with this Part.
             * Supply 'null' if no subtitle is desired for the Part.
             */
            subtitle: string | KnockoutObservableBase<string>;
            /**
             * A description for the part.
             */
            description: string | KnockoutObservableBase<string>;
            /**
             * An icon for the the part.
             */
            icon: MsPortalFx.Base.Image | KnockoutObservableBase<MsPortalFx.Base.Image>;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
            /**
             * Called by the FX to initialize this ButtonPart.
             *
             * @return A promise that should be resolved by the ButtonPart when: (1) all the data is loaded for this view model and (2) the
             * ButtonPart state is updated to reflect the loaded data.
             */
            onInitialize(): Q.Promise<any>;
            /**
             * Describes the behavior of the ButtonPart when it is clicked by the user.
             * Supply 'null' if the Part is not clickable.
             */
            onClick: (() => void) | FxComposition.ClickableLink;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxPartBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the ButtonPart.
             */
            container: Container;
        }
        /**
         * Represents a container object that can be used to control the chrome of the ButtonPart.
         */
        interface Container extends FxPartBase.Container {
            /**
             * Detailed ButtonPart size information.
             * The ButtonPart class should subscribe to this observable to be notified of size changes.
             */
            size: KnockoutReadOnlyObservableBase<SizeInfo>;
            /**
             * Indicates the location of this ButtonPart (on a Dashboard, on a Blade, etc.).
             */
            location: Location;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        /**
         * Detailed ButtonPart size information.
         */
        interface SizeInfo extends FxPartBase.SizeInfo {
            /**
             * One of the defined ButtonPart sizes, including 'Custom' if the ButtonPart is configured to support arbitrary sizing.
             */
            partSize: Size;
        }
        /**
         * Indicates the location of this ButtonPart (on a Dashboard, on a Blade, etc.).
         */
        export import Location = FxPartBase.Location;
        /**
         * Options supplied to the @ButtonPart decorator.  Includes metadata describing the ButtonPart and how it will be treated by
         * the FX.
         */
        interface Options extends FxViewModelBase.Options {
            /**
             * The initial size with which the ButtonPart will be rendered.
             */
            initialSize?: Size;
        }
        /**
         * The available sizes for the ButtonPart.
         */
        export import Size = FxPartBase.Size;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the ButtonPart view model such that it implements an 'onRebind' method that will be
             * called when the ButtonPart's parameters are changed.  Parameter changes are caused by, for example, the user modifying a Dashboard
             * value ('timeRange', for instance) to which the ButtonPart is bound.
             *
             * When this decorator is not used, whenever parameters change value, the ButtonPart view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxPartBase.Rebindable.Changes;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\DataContext.d.ts
declare module "Fx/Composition/DataContext" {
    export = MsPortalFxDataContext;
    module MsPortalFxDataContext {
        /**
         * The @DataContext decorator.  Identifies a class within the extension as the DataContext class for a certain extension area.
         * The DataContext class loads and caches data for the area's contained Blades and Parts.
         *
         * @options Options supplied to the decorator, including the area for which the DataContext loads/caches data.
         */
        function Decorator(options?: Options): (dataContextClass: Function) => void;
        /**
         * Options supplied to the @DataContext decorator.
         */
        interface Options {
            /**
             * The extension area for which the DataContext loads and caches data for the area's contained Blades and Parts.
             */
            area: string;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\FrameBlade.d.ts
declare module "Fx/Composition/FrameBlade" {
    import FxComposition = require("Fx/Composition");
    import FxBladeBase = require("Fx/Composition/BladeBase");
    import FxFramePart = require("Fx/Composition/FramePart");
    export = MsPortalFxFrameBlade;
    module MsPortalFxFrameBlade {
        import PartReference = MsPortalFx.Composition.PartReference;
        /**
         * The @FrameBlade decorator.  Identifies a class within the extension as a FrameBlade view model class.
         *
         * @options Metadata describing the FrameBlade and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (frameBladeClass: FrameBladeClass) => void;
        /**
         * Constrains the @FrameBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface FrameBladeClass extends FxBladeBase.BladeClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @FrameBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxBladeBase.Contract<TParameters, TModel> {
            /**
             * The FrameBlade view model.  This property must be set before 'container.revealContent()'
             * is called (if it is) and before the promise returned from 'onInitialize' is resolved.
             */
            viewModel: ViewModel;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Status bar for a FrameBlade.
         */
        interface StatusBar extends FxBladeBase.StatusBar {
            /**
             * The state of the FrameBlade.
             */
            state: ContentState;
        }
        /**
         * Specifies which content state decoration should be applied to a FrameBlade.
         */
        export import ContentState = FxBladeBase.ContentState;
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxBladeBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the FrameBlade.
             */
            container: Container;
        }
        /**
         * Options supplied to the @FrameBlade decorator.  Includes metadata describing the FrameBlade and how it will be treated by
         * the FX.
         */
        type Options = FxBladeBase.Options;
        /**
         * Represents a container object that can be used to control the chrome of the FrameBlade.
         */
        interface Container extends FxBladeBase.Container, FxBladeBase.CanHaveCommandBarContainer {
            /**
             * The status bar of the FrameBlade.
             */
            statusBar: KnockoutObservable<StatusBar>;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the FrameBlade view model such that it implements an 'onRebind' method that will be
             * called when the FrameBlade's parameters are changed.  Parameter changes are caused by, for example, the parent Blade/Part making
             * a call to a 'container.openBlade()'-related API or by the user updating browser's address bar.
             *
             * When this decorator is not used, whenever parameters change value, the FrameBlade view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxBladeBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its persisted 'settings' values.  The 'settings'
             * values are made available in the view model's 'context', for use in the view model's 'onInitialize' and optional 'onRebind'
             * methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the FrameBlade's settings.
             */
            type Options = FxBladeBase.Configurable.Options;
            /**
             * Metadata describing one setting of the FrameBlade's persisted settings.
             */
            type SettingMetadata = FxBladeBase.Configurable.SettingMetadata;
            /**
             * The scope at which the FrameBlade's settings are persisted.
             */
            export import SettingsScope = FxBladeBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the FrameBlade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the FrameBlade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include 'configuration' (the FrameBlade's configuration
                 * API) as well as 'settings' (the FrameBlade's persisted settings values).
                 */
                context: Context<TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the FrameBlade's configuration API),
             * the 'parameters' of the FrameBlade, as well as its persisted 'settings' values.
             */
            interface Context<TSettings> extends MsPortalFxFrameBlade.Context<any, any>, FxBladeBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its settings.
                 */
                configuration: Configuration<TSettings>;
            }
            /**
             * The FrameBlade's configuration API returned from 'context.configuration'.
             */
            type Configuration<TSettings> = FxBladeBase.Configurable.Configuration<TSettings>;
        }
        module ReturnsData {
            /**
             * The @ReturnsData decorator.  Adds a strongly-typed 'context.container.closeCurrentBlade(data: TData)' to the
             * FrameBlade.
             */
            function Decorator(): (returnsDataClass: ReturnsDataClass) => void;
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface ReturnsDataClass {
                new (): Contract<any>;
            }
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract<TData> {
                /**
                 * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
                 * optional 'onRebind' methods.
                 */
                context: Context<TData>;
            }
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
             * 'onRebind' methods.
             */
            interface Context<TData> {
                /**
                 * A container object that can be used to control the chrome of the FrameBlade.
                 */
                container: FxBladeBase.ReturnsData.Container<TData>;
            }
        }
        module Pinnable {
            /**
             * The @Pinnable decorator.  Requires that the FrameBlade implement an 'onPin' method that determines what Part
             * to pin when the user pins the FrameBlade.
             */
            function Decorator(): (pinnableClass: PinnableClass) => void;
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface PinnableClass {
                new (): Contract;
            }
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract {
                /**
                 * A callback that will be called when the user pins the FrameBlade.  Returns a PartReference to the Part that will be pinned to the
                 * user's Dashboard.
                 */
                onPin(): PartReference<any>;
            }
        }
        module LegacyFeatures {
            /**
             * The @LegacyFeatures decorator.  Used to access legacy features for FrameBlades, like defining an explicit FrameBlade width.
             *
             * @param options Options used to configure the @LegacyFeatures decorator.
             */
            function Decorator(options: Options): (bladeClass: FrameBladeClass) => void;
            /**
             * Options supplied to the @LegacyFeatures decorator.
             */
            interface Options {
                /**
                 * The width for this FrameBlade.
                 */
                width?: Width;
            }
            /**
             * The available widths for the FrameBlade.
             */
            export import Width = FxBladeBase.LegacyFeatures.Width;
        }
        /**
         * Options used to configure the FrameBlade view model.
         */
        export import ViewModelOptions = FxFramePart.ViewModelOptions;
        /**
         * Defines the signature for a message handler.
         */
        export import MessageHandler = FxFramePart.MessageHandler;
        /**
         * The view model of the FrameBlade.
         */
        class ViewModel extends FxFramePart.ViewModel {
            /**
             * Creates the view model for a FrameBlade
             *
             * @param container The container for this FrameBlade.
             * @param options Options for the FrameBlade view model.
             */
            constructor(container: Container, options: ViewModelOptions);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\FramePart.d.ts
declare module "Fx/Composition/FramePart" {
    import FxComposition = require("Fx/Composition");
    import FxPartBase = require("Fx/Composition/PartBase");
    export = MsPortalFxFramePart;
    module MsPortalFxFramePart {
        /**
         * The @FramePart decorator.  Identifies a class within the extension as a FramePart view model class.
         *
         * @options Metadata describing the FramePart and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (framePartClass: FramePartClass) => void;
        /**
         * Constrains the @FramePart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface FramePartClass extends FxPartBase.PartClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @FramePart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxPartBase.Contract<TParameters, TModel> {
            /**
             * The view model that the FX will bind into the view for this FramePart.  This property must be set before 'container.revealContent()'
             * is called (if it is) and before the promise returned from 'onInitialize' is resolved.
             */
            viewModel: ViewModel;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxPartBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the FramePart.
             */
            container: Container;
        }
        /**
         * Represents a container object that can be used to control the chrome of the FramePart.
         */
        interface Container extends FxPartBase.Container {
            /**
             * Detailed Part size information.
             * The FramePart class should subscribe to this observable to be notified of size changes.
             */
            size: KnockoutReadOnlyObservableBase<SizeInfo>;
            /**
             * Indicates the location of this FramePart (on a Dashboard, on a Blade, etc.).
             */
            location: Location;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        /**
         * Detailed Part size information.
         */
        interface SizeInfo extends FxPartBase.SizeInfo {
            /**
             * One of the defined Part sizes, including 'Custom' if the FramePart is configured to support arbitrary sizing.
             */
            partSize: Size;
        }
        /**
         * Indicates the location of this FramePart (on a Dashboard, on a Blade, etc.).
         */
        export import Location = FxPartBase.Location;
        /**
         * Options supplied to the @FramePart decorator.  Includes metadata describing the FramePart and how it will be treated by
         * the FX.
         */
        interface Options extends FxPartBase.Options {
            /**
             * The sizes supported by this FramePart.
             */
            supportedSizes?: Size[];
            /**
             * The initial size with which the FramePart will be rendered.  Must be one of the 'supportedSizes'.
             */
            initialSize?: Size;
            /**
             * The resize mode for the FramePart.  If not supplied, the default value of 'Fixed' will be used.
             */
            resizeMode?: ResizeMode;
        }
        /**
         * The available sizes for the FramePart.
         */
        export import Size = FxPartBase.Size;
        /**
         * The available resize modes for the FramePart.
         */
        export import ResizeMode = FxPartBase.ResizeMode;
        /**
         * Metadata describing a parameter passed to this FramePart.
         */
        type ParameterMetadata = FxPartBase.ParameterMetadata;
        /**
         * Describes how the image should be stretched to fill allocated space in the Part Gallery entry.
         */
        export import PartGalleryThumbnailStretch = FxPartBase.PartGalleryThumbnailStretch;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the FramePart view model such that it implements an 'onRebind' method that will be
             * called when the FramePart's parameters are changed.  Parameter changes are caused by, for example, the user modifying a Dashboard
             * value ('timeRange', for instance) to which the FramePart is bound.
             *
             * When this decorator is not used, whenever parameters change value, the FramePart view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxPartBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its 'parameters' and persisted 'settings'
             * values.  A new 'settings' property is added to the view model's 'context' which -- along with 'parameters' -- are used in the
             * view model's 'onInitialize' and optional 'onRebind' methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the FramePart's settings.
             */
            type Options = FxPartBase.Configurable.Options;
            /**
             * Metadata describing one setting of the FramePart's persisted settings.
             */
            type SettingMetadata = FxPartBase.Configurable.SettingMetadata;
            /**
             * The scope at which the FramePart's settings are persisted.
             */
            export import SettingsScope = FxPartBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the FramePart's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any, any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the FramePart's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TParameters, TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include a 'configuration' (the FramePart's
                 * configuration API), as well as 'parameters' and 'settings' (the FramePart's persisted settings values).
                 */
                context: Context<TParameters, TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the FramePart's configuration
             * API), the 'parameters' of the FramePart, as well as its persisted 'settings' values.
             */
            interface Context<TParameters, TSettings> extends MsPortalFxFramePart.Context<TParameters, any>, FxPartBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its parameters and settings.
                 */
                configuration: Configuration<TParameters, TSettings>;
            }
            /**
             * The FramePart's configuration API returned from 'context.configuration'.
             */
            type Configuration<TParameters, TSettings> = FxPartBase.Configurable.Configuration<TParameters, TSettings>;
        }
        /**
         * The signature of messages used by the FramePart.
         */
        const signature: string;
        /**
         * The kind of message indicating that content can be revealed.
         */
        const revealContentMessageKind: string;
        /**
         * The kind of message indicating that initialization has completed.
         */
        const initializationCompleteMessageKind: string;
        module Internal {
            interface Data<T> {
                /**
                 * Data passed from the shell to the control.
                 */
                postMessage: KnockoutObservable<Message<T>>;
                /**
                 * Data passed from the control to the shell.
                 */
                receiveMessage: KnockoutObservable<Message<T>>;
                /**
                 * Indicates whether the iframe control has initialized.
                 */
                isFrameReady: KnockoutObservable<boolean>;
                /**
                 * The signature to be used for messages routed to/from the IFrame.
                 */
                signature: string;
            }
            interface ViewModelOptions extends MsPortalFxFramePart.ViewModelOptions {
                /**
                 * The signature of messages used by the FramePart.
                 */
                signature: string;
            }
        }
        /**
         * Defines the signature for a message handler.
         */
        type MessageHandler = (data: any) => void;
        /**
         * Defines a message sent between a frame part's view model and the frame.
         */
        interface Message<T> {
            /**
             * The message signature.
             */
            signature: string;
            /**
             * The message kind.
             */
            kind: string;
            /**
             * The message data.
             */
            data: T;
        }
        interface ViewModelOptions {
            /**
             * The URL of the page to load in the frame.
             */
            src: string;
        }
        class ViewModel {
            private _handlers;
            private _readyPromise;
            /**
             * The URL of the page to embed.
             */
            src: string;
            /**
             * Data passed to/from the shell and the control.
             */
            private _msPortalFxData;
            /**
             * Creates the view model for a frame part.
             *
             * @param container Container of the part.
             * @param options Options for this view model.
             */
            constructor(container: MsPortalFx.ViewModels.PartContainerContract | Container, options: ViewModelOptions);
            waitForFrameReady(): Q.Promise<void>;
            /**
             * Posts a message to the frame.
             *
             * @param kind The message kind.
             * @param data The data associated to the message.
             */
            postMessage: <T>(kind: string, data?: T) => void;
            /**
             * Attaches an event handler function for message events of the specified kind.
             *
             * @param kind The kind of message to listen to.
             * @param handler A function to execute when a message of the specified kind is received.
             */
            on(kind: string, handler: MessageHandler): void;
            /**
             * Removes an event handler.
             *
             * @param kind The kind of message.
             * @param handler A function previously attached to message events of the specified kind.
             */
            off(kind: string, handler: MessageHandler): void;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\MenuBlade.d.ts
declare module "Fx/Composition/MenuBlade" {
    import FxComposition = require("Fx/Composition");
    import FxBladeBase = require("Fx/Composition/BladeBase");
    import * as Menu from "Fx/Controls/Menu";
    export = MsPortalFxMenuBlade;
    module MsPortalFxMenuBlade {
        /**
         * The @MenuBlade decorator.  Identifies a class within the extension as a MenuBlade view model class.
         *
         * @options Metadata describing the MenuBlade and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (menuBladeClass: MenuBladeClass) => void;
        /**
         * Constrains the @MenuBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface MenuBladeClass extends FxBladeBase.BladeClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @MenuBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxBladeBase.Contract<TParameters, TModel> {
            /**
             * The view model that the FX will bind into the view for this MenuBlade.  This property must be set before 'container.revealContent()'
             * is called (if it is) and before the promise returned from 'onInitialize' is resolved.
             */
            viewModel: ViewModel2;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Status bar for a MenuBlade.
         */
        interface StatusBar extends FxBladeBase.StatusBar {
            /**
             * The state of the MenuBlade.
             */
            state: ContentState;
        }
        /**
         * Specifies which content state decoration should be applied to a MenuBlade.
         */
        export import ContentState = FxBladeBase.ContentState;
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxBladeBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the MenuBlade.
             */
            container: Container;
        }
        /**
         * Options supplied to the @MenuBlade decorator.  Includes metadata describing the MenuBlade and how it will be treated by
         * the FX.
         */
        type Options = FxBladeBase.Options;
        /**
         * Represents a container object that can be used to control the chrome of the MenuBlade.
         */
        interface Container extends FxBladeBase.Container {
            /**
             * The status bar of the MenuBlade.
             */
            statusBar: KnockoutObservable<StatusBar>;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the MenuBlade view model such that it implements an 'onRebind' method that will be
             * called when the MenuBlade's parameters are changed.  Parameter changes are caused by, for example, the parent Blade/Part making
             * a call to a 'container.openBlade()'-related API or by the user updating browser's address bar.
             *
             * When this decorator is not used, whenever parameters change value, the MenuBlade view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxBladeBase.Rebindable.Changes;
        }
        module ReturnsData {
            /**
             * The @ReturnsData decorator.  Adds a strongly-typed 'context.container.closeCurrentBlade(data: TData)' to the
             * MenuBlade.
             */
            function Decorator(): (returnsDataClass: ReturnsDataClass) => void;
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface ReturnsDataClass {
                new (): Contract<any>;
            }
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract<TData> {
                /**
                 * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
                 * optional 'onRebind' methods.
                 */
                context: Context<TData>;
            }
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
             * 'onRebind' methods.
             */
            interface Context<TData> {
                /**
                 * A container object that can be used to control the chrome of the MenuBlade.
                 */
                container: FxBladeBase.ReturnsData.Container<TData>;
            }
        }
        /**
         * The sort order used for groups in the menu.
         */
        export import SortOrder = Menu.SortOrder;
        namespace Internal {
            /**
             * Options supplied to the ViewModel constructor.
             */
            interface ViewModelOptions extends Menu.Options {
                /**
                 * The groups of menu items.
                 */
                groups: MenuGroup[] | KnockoutReadOnlyObservableBase<MenuGroup[]>;
                /**
                 * Specifies the sort order used for groups in the menu.
                 */
                groupSortOrder?: SortOrder;
            }
        }
        /**
         * Defines the view model for a menu blade.
         */
        class ViewModel2 {
            private _msPortalFxMenu;
            /**
             * Creates the view model for a menu blade.
             *
             * @param container The container for the view model.
             * @param options Options for the view model.
             * @return The view model.
             */
            static create<T extends Internal.ViewModelOptions>(container: Container, options: T): ViewModel2 & T;
            private _initialize(container, options);
        }
        /**
         * Defines an item in a group of the menu.
         */
        interface MenuItem extends Menu.MenuItem {
        }
        /**
         * Defines a group in the menu.
         */
        interface MenuGroup extends Menu.MenuGroup {
        }
        /**
         * This var has been relocated.
         * It is now in the Fx/Composition/Pdl/MenuBlade module.
         */
        const SortFunction: Obsolete;
        /**
         * This class has been relocated.
         * It is now in the Fx/Composition/Pdl/MenuBlade module.
         */
        var ViewModel: Obsolete;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\Part.d.ts
declare module "Fx/Composition/Part" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import FxPartBase = require("Fx/Composition/PartBase");
    export = MsPortalFxPart;
    module MsPortalFxPart {
        /**
         * The @Part decorator.  Identifies a class within the extension as a Part view model class.
         *
         * @options Metadata describing the Part and how it will be treated by the FX.
         */
        function Decorator(options?: Options): (partClass: PartClass) => void;
        /**
         * Constrains the @Part decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface PartClass extends FxPartBase.PartClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @Part decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxPartBase.Contract<TParameters, TModel> {
            /**
             * The view model that the FX will bind into the view for this Part.  This property must be set before 'container.revealContent()'
             * is called (if it is) and before the promise returned from 'onInitialize' is resolved.
             */
            viewModel: any;
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxPartBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the Part.
             */
            container: Container;
        }
        /**
         * Represents a container object that can be used to control the chrome of the Part.
         */
        interface Container extends FxPartBase.Container {
            /**
             * Detailed Part size information.
             * The Part class should subscribe to this observable to be notified of size changes.
             */
            size: KnockoutReadOnlyObservableBase<SizeInfo>;
            /**
             * Indicates the location of this Part (on a Dashboard, on a Blade, etc.).
             */
            location: Location;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        /**
         * Detailed Part size information.
         */
        interface SizeInfo extends FxPartBase.SizeInfo {
            /**
             * One of the defined Part sizes, including 'Custom' if the Part is configured to support arbitrary sizing.
             */
            partSize: Size;
        }
        /**
         * Indicates the location of this Part (on a Dashboard, on a Blade, etc.).
         */
        export import Location = FxPartBase.Location;
        /**
         * Options supplied to the @Part decorator.  Includes metadata describing the Part and how it will be treated by
         * the FX.
         */
        interface Options extends FxPartBase.Options, FxViewModelBase.AcceptsStyleSheetsOptions {
            /**
             * The sizes supported by this Part.
             */
            supportedSizes?: Size[];
            /**
             * The initial size with which the Part will be rendered.  Must be one of the 'supportedSizes'.
             */
            initialSize?: Size;
            /**
             * The resize mode for the Part.  If not supplied, the default value of 'Fixed' will be used.
             */
            resizeMode?: ResizeMode;
        }
        /**
         * The available sizes for the Part.
         */
        export import Size = FxPartBase.Size;
        /**
         * The available resize modes for the Part.
         */
        export import ResizeMode = FxPartBase.ResizeMode;
        /**
         * Metadata describing a parameter passed to this Part.
         */
        type ParameterMetadata = FxPartBase.ParameterMetadata;
        /**
         * Describes how the image should be stretched to fill allocated space in the Part Gallery entry.
         */
        export import PartGalleryThumbnailStretch = FxPartBase.PartGalleryThumbnailStretch;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the Part view model such that it implements an 'onRebind' method that will be
             * called when the Part's parameters are changed.  Parameter changes are caused by, for example, the user modifying a Dashboard
             * value ('timeRange', for instance) to which the Part is bound.
             *
             * When this decorator is not used, whenever parameters change value, the Part view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxPartBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its 'parameters' and persisted 'settings'
             * values.  A new 'settings' property is added to the view model's 'context' which -- along with 'parameters' -- are used in the
             * view model's 'onInitialize' and optional 'onRebind' methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the Part's settings.
             */
            type Options = FxPartBase.Configurable.Options;
            /**
             * Metadata describing one setting of the Part's persisted settings.
             */
            type SettingMetadata = FxPartBase.Configurable.SettingMetadata;
            /**
             * The scope at which the Part's settings are persisted.
             */
            export import SettingsScope = FxPartBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the Part's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any, any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the Part's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TParameters, TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include a 'configuration' (the Part's
                 * configuration API), as well as 'parameters' and 'settings' (the Part's persisted settings values).
                 */
                context: Context<TParameters, TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the Part's configuration
             * API), the 'parameters' of the Part, as well as its persisted 'settings' values.
             */
            interface Context<TParameters, TSettings> extends MsPortalFxPart.Context<TParameters, any>, FxPartBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its parameters and settings.
                 */
                configuration: Configuration<TParameters, TSettings>;
            }
            /**
             * The Part's configuration API returned from 'context.configuration'.
             */
            type Configuration<TParameters, TSettings> = FxPartBase.Configurable.Configuration<TParameters, TSettings>;
        }
        /**
         * The @ProxiedMember decorator.  Identifies a public member of a Part class that is to be proxied for use in the view.
         * This decorator is not necessary in most scenarios.
         * This decorator suppresses any compile-time errors that state "The '<MEMBER>' member is public and is not bound to the Part's view."
         */
        export import ProxiedMember = FxViewModelBase.ProxiedMember;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\PartBase.d.ts
declare module "Fx/Composition/PartBase" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import { ItemType } from "Fx/Internal/Composition/CompositionItem";
    export = Main;
    module Main {
        import FxConfiguration = MsPortalFx.Composition.Configuration;
        /**
         * The class type to which the various Part decorators can be applied.
         */
        interface PartClass extends FxViewModelBase.ViewModelClass<any> {
            _fx?: {
                itemType?: ItemType;
                options?: Options;
                ownsEditScope?: boolean;
                rebindable?: boolean;
                parameterProvider?: void;
                configurableOptions?: FxViewModelBase.Configurable.Options;
            };
        }
        /**
         * A common interface type for the various Part view model classes.
         */
        interface Contract<TParameters, TModel> extends FxViewModelBase.Contract<TParameters, TModel> {
            /**
             * The title text displayed for this part. Typically this specifies what kind of information
             * appears inside the part, e.g., "Deployment history", or if that is not applicable then the
             * type of the asset that the part relates to, e.g., "Website".
             * Supply 'null' if no title is desired for the Part.
             */
            title: string | KnockoutObservableBase<string>;
            /**
             * The displayed subtitle for this Part, typically the Asset name for the asset/resource associated with this Part.
             * Supply 'null' if no subtitle is desired for the Part.
             */
            subtitle: string | KnockoutObservableBase<string>;
            /**
             * Describes the behavior of the Part when it is clicked by the user.
             * Supply 'null' if the Part is not clickable.
             */
            onClick: (() => void) | FxComposition.ClickableLink;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        type Context<TParameters, TModel> = FxViewModelBase.Context<TParameters, TModel>;
        /**
         * Represents a container object that can be used to control the chrome of the Part.
         */
        interface Container extends FxViewModelBase.Container {
            /**
             * If allowed by ResizeMode, will adjust the size of the container to the size of the content, clamped to the grid constraints.
             *
             * The content must be enclosed in a single container div in the content area of the part.
             * If more than one div is found in the content area, the autoSize will be ignored, and a warning logged in Dev Mode.
             */
            autoSize(): void;
            /**
             * If allowed by ResizeMode, will adjust the size of the part to the size specified, clamped to the grid constraints.
             *
             * @param width The desired width, in grid steps, valid in range from 1 to 25.
             * @param height The desired height, in grid steps, valid in range from 1 to 25.
             */
            resizeTo(width: number, height: number): void;
        }
        /**
         * Detailed Part size information.
         */
        interface SizeInfo {
            /**
             * The width/height of the Part in terms of pixels.
             */
            dimensions: {
                width: number;
                height: number;
            };
        }
        /**
         * The location of a Part.
         */
        export import Location = MsPortalFx.ViewModels.PartLocation;
        /**
         * Options supplied to the specific Part decorator.  Includes metadata describing the Part and how it will be
         * treated by the FX.
         */
        interface Options extends FxViewModelBase.Options {
            /**
             * The initial height with which the Part will be rendered.
             * Is applicable only when the 'initialSize' doesn't include a fixed height.
             */
            initialHeight?: number;
            /**
             * The initial width with which the Part will be rendered.
             * Is applicable only when the 'initialSize' doesn't include a fixed width.
             */
            initialWidth?: number;
            /**
             * Metadata describing the parameters passed to this Part.
             */
            parameterMetadata?: {
                [key: string]: ParameterMetadata;
            };
            /**
             * Metadata that describes this Part in the Part Gallery.
             */
            galleryMetadata?: GalleryMetadata;
        }
        /**
         * The available sizes for the Part.
         */
        export import Size = MsPortalFx.Parts.PartSize;
        /**
         * The available resize modes for the Part.
         */
        export import ResizeMode = MsPortalFx.Parts.ResizeMode;
        /**
         * Metadata describing a parameter passed to this Part.
         */
        interface ParameterMetadata {
            /**
             * When a Part is added to a Dashboard, this type is used to determine compatible Dashboard values to which the
             * associated parameter can be bound.
             */
            valueType: FxConfiguration.ValueType;
        }
        /**
         * Metadata describing the parameters passed to this Part.
         */
        interface GalleryMetadata {
            /**
             * The title of the Part shown in the Part Gallery.
             */
            title: string;
            /**
             * The description of the Part shown in the Part Gallery.
             */
            description?: string;
            /**
             * The category to which the Part belongs.
             */
            category?: string;
            /**
             * A description of the thumbnail to be shown for the Part's entry in the Part Gallery.
             */
            thumbnail?: {
                /**
                 * The image to be shown for the Part's entry in the Part Gallery.
                 */
                image: MsPortalFx.Base.Image;
                /**
                 * Describes how the image should be stretched to fill allocated space in the Part Gallery entry.
                 */
                stretch?: PartGalleryThumbnailStretch;
            };
            /**
             * The feature name used to hide this Part in the Part Gallery.
             */
            feature?: string;
        }
        /**
         * Describes how the image should be stretched to fill allocated space in the Part Gallery entry.
         */
        export import PartGalleryThumbnailStretch = MsPortalFx.Widgets.PartGallery.ThumbnailStretch;
        module Rebindable {
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxViewModelBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the Part's settings.
             */
            type Options = FxViewModelBase.Configurable.Options;
            /**
             * Metadata describing one setting of the Part's persisted settings.
             */
            type SettingMetadata = FxViewModelBase.Configurable.SettingMetadata;
            /**
             * The scope at which the Part's settings are persisted.
             */
            export import SettingsScope = FxViewModelBase.Configurable.SettingsScope;
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the Part's configuration
             * API) as well as 'parameters' and 'settings' (the Part's persisted settings values).
             */
            type Context<TSettings> = FxViewModelBase.Configurable.Context<TSettings>;
            /**
             * The Part's configuration API returned from 'context.configuration'.
             */
            type Configuration<TParameters, TSettings> = FxConfiguration.Part.Contract<TParameters, TSettings>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\Pdl\Blade.d.ts
declare module "Fx/Composition/Pdl/Blade" {
    import FxComposition = require("Fx/Composition");
    export = Main;
    module Main {
        import FxConfiguration = MsPortalFx.Composition.Configuration;
        interface Container extends MsPortalFx.ViewModels.ContainerContract, MsPortalFx.ViewModels.BladeManagement {
            /**
             * Activates this Blade's 'Configuration', which is an API that enables the Blade to manage parameter and settings overrides/inheritance via
             * configuration UI (typically via a Context Blade).  See the MsPortalFx.Composition.Configuration.Contract interface for details.
             *
             * @param options Options used to initialize the Configuration API for this Part
             * @return The Configuration API for this Part
             */
            activateConfiguration<TSettings>(options?: FxConfiguration.Blade.Options<TSettings>): FxConfiguration.Blade.Contract<TSettings>;
            /**
             * Tracks the list of asynchronous operations being performed by the Blade.
             */
            operations: FxComposition.OperationList;
            /**
             * Moves the blade into a 'not found' display mode, allowing for an optional custom error message.
             *
             * @param message An optional custom error message.
             */
            notFound(message?: string): void;
            /**
             * Moves the blade into an 'unauthorized' display mode, allowing for an an optional custom error message.
             *
             * @param message A custom error message in place of the default.
             */
            unauthorized(message?: string): void;
            /**
             * Shows an error message.
             *
             * @param message A message that will be displayed to the user when the blade fails.
             */
            fail(message: string): void;
            /**
             * Removes any 'failed' error message and brings the blade back to 'ready' state.
             * If the blade was not already in a 'failed' state, this method does nothing.
             */
            recover(): void;
            /**
             * Causes the blades's content to be revealed immediately, regardless of any onInputsSet promise that
             * might not yet have completed. This removes the opaque 'loading' spinner and makes the blae interactive,
             * so you must also disable or hide any UI elements that the user should not be able to see or interact with
             * until data is fully loaded.
             */
            revealContent(): void;
            /**
             * The message displayed by the Part when it has no data to display.
             */
            noDataMessage: KnockoutObservable<string>;
            /**
             * Closes this blade
             *
             * @param data Optional value to return back to the parent blade
             * @return a promise that resolves to true if the this blade is successfully closed.
             */
            closeCurrentBlade(data?: any): Q.Promise<boolean>;
            /**
             * Closes the child blade that is currently open
             *
             * @return a promise that resolves to true if the child blade is successfully closed.
             */
            closeChildBlade(): Q.Promise<boolean>;
            /**
             * Closes the context blade that was opened by this part
             *
             * @returns a promise that resolves to true if the context blade is sucessfully closed.
             */
            closeContextBlade(): Q.Promise<boolean>;
            /**
             * Properties to track form validity, dirty state of forms on this blade and methods to trigger validation and modify alert behavior
             */
            form: MsPortalFx.ViewModels.FormProperties;
            /**
             * Interface for managing menu blade.   This property is null if the blade is not a opened by a menu blade.
             */
            menu: MsPortalFx.ViewModels.MenuBladeManagement;
            /**
             * The path to the help content file.
             */
            helpContentUri: KnockoutObservable<string>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\Pdl\MenuBlade.d.ts
declare module "Fx/Composition/Pdl/MenuBlade" {
    import * as Menu from "Fx/Controls/Menu";
    export = Main;
    module Main {
        /**
         * The options for the menu.
         */
        interface Options extends Menu.Options {
        }
        /**
         * The sort functions used to sort groups in the menu.
         */
        const SortFunction: typeof Menu.SortFunction;
        /**
         * Defines the view model for a menu blade.
         */
        class ViewModel extends MsPortalFx.ViewModels.Blade {
            menu: Menu.ViewModel;
            /**
             * Creates the view model for a menu blade.
             *
             * @param container The container for the view model.
             */
            constructor(container: MsPortalFx.ViewModels.ContainerContract);
        }
        /**
         * The sort order used for groups in the menu.
         */
        export import SortOrder = Menu.SortOrder;
        /**
         * Defines an item in a group of the menu.
         */
        interface MenuItem extends Menu.MenuItem {
        }
        /**
         * Defines a group in the menu.
         */
        interface MenuGroup extends Menu.MenuGroup {
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\Permissions.d.ts
declare module "Fx/Composition/Permissions" {
    export = Main;
    module Main {
        /**
         * Permissions that will be evaluated before rendering a Blade/Part.
         */
        type Permissions = (Permission | PermissionSet)[];
        /**
         * A permission that will be evaluated for a resource before the associated Blade/Part UI will be shown/enabled.
         */
        interface Permission {
            /**
             * The 'action' name for this permission ('read', 'write', etc.).
             */
            action: string;
            /**
             * An optional target of the permissions check.  If this is not supplied, then the target resource of this
             * permissions check is the asset associated with this Blade/Part.  To associate a Blade/Part with an asset,
             * use the 'Options.forAsset' property supplied to the Blade/Part decorator.
             */
            targetResource?: ResourceIdSource;
        }
        /**
         * A set of permissions that will be evaluated for a resource before the associated Blade/Part UI will be
         * shown/enabled.
         */
        interface PermissionSet {
            /**
             * The set of permissions and/or permission references.
             */
            permissions: Permission[];
            /**
             * Indicates how the result from each of the N permission checks will be considered before allowing the
             * associated Blade/Part UI to be shown/enabled.
             */
            requirement: SetRequirement;
        }
        /**
         * Specifies the target asset for a permission or permission reference.
         */
        interface ResourceIdSource {
            /**
             * A reference to an asset type definition that defines the resource that is the target of some permission or
             * permission reference.
             * If not supplied, then the asset type definition used here is that which is associated with the Blade/Part
             * (using the 'Options.forAsset' property supplied to the Blade/Part decorator).
             */
            assetType?: {
                /**
                 * The name of the asset type definition.
                 */
                assetType: string;
                /**
                 * The name of the extension in which the asset type is defined.  When this is not supplied, this defaults
                 * to the current extension.
                 */
                extensionName?: string;
            };
            /**
             * If supplied, this indicates that a "property provider service" associated with the asset type definition is
             * to be used to determine the resource id that is the target of a permission / permission reference.
             * When supplied, this value contains the 'key' and 'property' parameters passed to the "property provider
             * service".
             *
             * If this is not supplied, then it is assumed that the associated permission or permission reference will be
             * evaluated against the resource associated with the Blade/Part via the 'Options.forAsset' property passed to
             * the Blade/Part decorator.
             */
            providerParameters?: {
                /**
                 * The 'key' parameter passed to the "property provider service".
                 */
                key: string;
                /**
                 * The 'property' parameter passed to the "property provider service".  This is the view model property
                 * where the resource id is to be published.
                 */
                property: string;
            };
        }
        /**
         * Indicates how the result from each of the N permission checks will be considered before allowing the associated
         * Blade/Part UI to be shown/enabled.
         */
        type SetRequirement = MsPortalFx.Extension.SetRequirement;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\TemplateBlade.d.ts
declare module "Fx/Composition/TemplateBlade" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import FxBladeBase = require("Fx/Composition/BladeBase");
    export = MsPortalFxTemplateBlade;
    module MsPortalFxTemplateBlade {
        import PartReference = MsPortalFx.Composition.PartReference;
        /**
         * The @TemplateBlade decorator.  Identifies a class within the extension as a TemplateBlade view model class.
         *
         * @options Metadata describing the TemplateBlade and how it will be treated by the FX.
         */
        function Decorator(options: Options): (templateBladeClass: TemplateBladeClass) => void;
        /**
         * Constrains the @TemplateBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface TemplateBladeClass extends FxBladeBase.BladeClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @TemplateBlade decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxBladeBase.Contract<TParameters, TModel> {
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Status bar for a TemplateBlade.
         */
        interface StatusBar extends FxBladeBase.StatusBar {
            /**
             * The state of the TemplateBlade.
             */
            state: ContentState;
        }
        /**
         * Specifies which content state decoration should be applied to a TemplateBlade.
         */
        export import ContentState = FxBladeBase.ContentState;
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxBladeBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the TemplateBlade.
             */
            container: Container;
            /**
             * An API a TemplateBlade can use to interact with the Form Fields on the Blade.
             */
            form: FxBladeBase.FormManagement;
        }
        /**
         * Describes if/when to display an alert when the blade closes.
         */
        export import AlertLevel = FxBladeBase.AlertLevel;
        /**
         * Options supplied to the @TemplateBlade decorator.  Includes metadata describing the TemplateBlade and how it will be treated by
         * the FX.
         */
        interface Options extends FxBladeBase.Options, FxViewModelBase.RequiresHtmlTemplateOptions, FxViewModelBase.AcceptsStyleSheetsOptions {
        }
        /**
         * Represents a container object that can be used to control the chrome of the TemplateBlade.
         */
        interface Container extends FxBladeBase.Container, FxBladeBase.CanHaveCommandBarContainer {
            /**
             * The status bar of the TemplateBlade.
             */
            statusBar: KnockoutObservable<StatusBar>;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the TemplateBlade view model such that it implements an 'onRebind' method that will be
             * called when the TemplateBlade's parameters are changed.  Parameter changes are caused by, for example, the parent Blade/Part making
             * a call to a 'container.openBlade()'-related API or by the user updating browser's address bar.
             *
             * When this decorator is not used, whenever parameters change value, the TemplateBlade view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxBladeBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its persisted 'settings' values.  The 'settings'
             * values are made available in the view model's 'context', for use in the view model's 'onInitialize' and optional 'onRebind'
             * methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the TemplateBlade's settings.
             */
            type Options = FxBladeBase.Configurable.Options;
            /**
             * Metadata describing one setting of the TemplateBlade's persisted settings.
             */
            type SettingMetadata = FxBladeBase.Configurable.SettingMetadata;
            /**
             * The scope at which the TemplateBlade's settings are persisted.
             */
            export import SettingsScope = FxBladeBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the TemplateBlade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the TemplateBlade's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include 'configuration' (the TemplateBlade's configuration
                 * API) as well as 'settings' (the TemplateBlade's persisted settings values).
                 */
                context: Context<TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the TemplateBlade's configuration API),
             * the 'parameters' of the TemplateBlade, as well as its persisted 'settings' values.
             */
            interface Context<TSettings> extends MsPortalFxTemplateBlade.Context<any, any>, FxBladeBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its settings.
                 */
                configuration: Configuration<TSettings>;
            }
            /**
             * The TemplateBlade's configuration API returned from 'context.configuration'.
             */
            type Configuration<TSettings> = FxBladeBase.Configurable.Configuration<TSettings>;
        }
        module ReturnsData {
            /**
             * The @ReturnsData decorator.  Adds a strongly-typed 'context.container.closeCurrentBlade(data: TData)' to the
             * TemplateBlade.
             */
            function Decorator(): (returnsDataClass: ReturnsDataClass) => void;
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface ReturnsDataClass {
                new (): Contract<any>;
            }
            /**
             * Constrains the @ReturnsData decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract<TData> {
                /**
                 * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
                 * optional 'onRebind' methods.
                 */
                context: Context<TData>;
            }
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
             * 'onRebind' methods.
             */
            interface Context<TData> {
                /**
                 * A container object that can be used to control the chrome of the TemplateBlade.
                 */
                container: FxBladeBase.ReturnsData.Container<TData>;
            }
        }
        module Pinnable {
            /**
             * The @Pinnable decorator.  Requires that the TemplateBlade implement an 'onPin' method that determines what Part
             * to pin when the user pins the TemplateBlade.
             */
            function Decorator(): (pinnableClass: PinnableClass) => void;
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface PinnableClass {
                new (): Contract;
            }
            /**
             * Constrains the @Pinnable decorator so that it can be applied only to classes implementing 'Contract'.
             */
            interface Contract {
                /**
                 * A callback that will be called when the user pins the TemplateBlade.  Returns a PartReference to the Part that will be pinned to the
                 * user's Dashboard.
                 */
                onPin(): PartReference<any>;
            }
        }
        module LegacyFeatures {
            /**
             * The @LegacyFeatures decorator.  Used to access legacy features for TemplateBlades, like defining an explicit TemplateBlade width.
             *
             * @param options Options used to configure the @LegacyFeatures decorator.
             */
            function Decorator(options: Options): (bladeClass: TemplateBladeClass) => void;
            /**
             * Options supplied to the @LegacyFeatures decorator.
             */
            interface Options {
                /**
                 * The width for this TemplateBlade.
                 */
                width?: Width;
            }
            /**
             * The available widths for the TemplateBlade.
             */
            export import Width = FxBladeBase.LegacyFeatures.Width;
        }
        /**
         * The @ProxiedMember decorator.  Identifies a public member of a TemplateBlade class that is to be proxied for use in the view.
         * This decorator is not necessary in most scenarios.
         * This decorator suppresses any compile-time errors that state "The '<MEMBER>' member is public and is not bound to the TemplateBlade's HTML template."
         */
        export import ProxiedMember = FxViewModelBase.ProxiedMember;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\TemplatePart.d.ts
declare module "Fx/Composition/TemplatePart" {
    import FxComposition = require("Fx/Composition");
    import FxViewModelBase = require("Fx/Composition/ViewModelBase");
    import FxPartBase = require("Fx/Composition/PartBase");
    export = MsPortalFxTemplatePart;
    module MsPortalFxTemplatePart {
        /**
         * The @TemplatePart decorator.  Identifies a class within the extension as a TemplatePart view model class.
         *
         * @options Metadata describing the TemplatePart and how it will be treated by the FX.
         */
        function Decorator(options: Options): (partClass: TemplatePartClass) => void;
        /**
         * Constrains the @TemplatePart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface TemplatePartClass extends FxPartBase.PartClass {
            new (): Contract<any, any>;
        }
        /**
         * Constrains the @TemplatePart decorator so that it can be applied only to classes implementing 'Contract'.
         */
        interface Contract<TParameters, TModel> extends FxPartBase.Contract<TParameters, TModel> {
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and
             * optional 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> extends FxPartBase.Context<TParameters, TModel> {
            /**
             * A container object that can be used to control the chrome of the TemplatePart.
             */
            container: Container;
        }
        /**
         * Represents a container object that can be used to control the chrome of the TemplatePart.
         */
        interface Container extends FxPartBase.Container {
            /**
             * Detailed TemplatePart size information.
             * The TemplatePart class should subscribe to this observable to be notified of size changes.
             */
            size: KnockoutReadOnlyObservableBase<SizeInfo>;
            /**
             * Indicates the location of this TemplatePart (on a Dashboard, on a Blade, etc.).
             */
            location: Location;
        }
        /**
         * The type of shield to show when there is one or more operations in progress.
         */
        export import ShieldType = FxComposition.ShieldType;
        /**
         * Detailed TemplatePart size information.
         */
        interface SizeInfo extends FxPartBase.SizeInfo {
            /**
             * One of the defined TemplatePart sizes, including 'Custom' if the TemplatePart is configured to support arbitrary sizing.
             */
            partSize: Size;
        }
        /**
         * Indicates the location of this TemplatePart (on a Dashboard, on a Blade, etc.).
         */
        export import Location = FxPartBase.Location;
        /**
         * Options supplied to the @TemplatePart decorator.  Includes metadata describing the TemplatePart and how it will be treated by
         * the FX.
         */
        interface Options extends FxPartBase.Options, FxViewModelBase.RequiresHtmlTemplateOptions, FxViewModelBase.AcceptsStyleSheetsOptions {
            /**
             * The sizes supported by this TemplatePart.
             */
            supportedSizes?: Size[];
            /**
             * The initial size with which the TemplatePart will be rendered.  Must be one of the 'supportedSizes'.
             */
            initialSize?: Size;
            /**
             * The resize mode for the TemplatePart.  If not supplied, the default value of 'Fixed' will be used.
             */
            resizeMode?: ResizeMode;
        }
        /**
         * The available sizes for the TemplatePart.
         */
        export import Size = FxPartBase.Size;
        /**
         * The available resize modes for the TemplatePart.
         */
        export import ResizeMode = FxPartBase.ResizeMode;
        /**
         * Metadata describing a parameter passed to this TemplatePart.
         */
        type ParameterMetadata = FxPartBase.ParameterMetadata;
        /**
         * Describes how the image should be stretched to fill allocated space in the Part Gallery entry.
         */
        export import PartGalleryThumbnailStretch = FxPartBase.PartGalleryThumbnailStretch;
        module Rebindable {
            /**
             * The @Rebindable decorator.  This expands the TemplatePart view model such that it implements an 'onRebind' method that will be
             * called when the TemplatePart's parameters are changed.  Parameter changes are caused by, for example, the user modifying a Dashboard
             * value ('timeRange', for instance) to which the TemplatePart is bound.
             *
             * When this decorator is not used, whenever parameters change value, the TemplatePart view model will be disposed and
             * a new one instantiated and initialized.
             */
            function Decorator(): (rebindableClass: RebindableClass) => void;
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface RebindableClass {
                new (): Contract;
                _fx?: {
                    rebindable?: boolean;
                };
            }
            /**
             * Constrains the @Rebindable decorator so that it can be applied only to classes implementing 'Contract', requiring that the class
             * implement an 'onRebind' method.
             */
            interface Contract {
                /**
                 * A method called by the FX whenever the view model's parameters change value.  When called, the view model should
                 * be updated to reflect the new parameter/settings values.
                 *
                 * @param changes A description of the parameters that have changed.
                 * @return A promise that should be resolved once the view model has been entirely updated to reflect the new values for
                 * parameters/settings.
                 */
                onRebind(changes: Changes): Q.Promise<any>;
            }
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            type Changes = FxPartBase.Rebindable.Changes;
        }
        module Configurable {
            /**
             * The @Configurable decorator.  View models that use this decorator will make use of 'context.configuration' to
             * obtain the view model's configuration API, with which the view model can update its 'parameters' and persisted 'settings'
             * values.  A new 'settings' property is added to the view model's 'context' which -- along with 'parameters' -- are used in the
             * view model's 'onInitialize' and optional 'onRebind' methods.
             *
             * @param options Options used to configure the @Configurable decorator, supplying additional metadata for the view model's
             * settings.
             */
            function Decorator(options?: Options): (configurableClass: ConfigurableClass) => void;
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the TemplatePart's settings.
             */
            type Options = FxPartBase.Configurable.Options;
            /**
             * Metadata describing one setting of the TemplatePart's persisted settings.
             */
            type SettingMetadata = FxPartBase.Configurable.SettingMetadata;
            /**
             * The scope at which the TemplatePart's settings are persisted.
             */
            export import SettingsScope = FxPartBase.Configurable.SettingsScope;
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the TemplatePart's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface ConfigurableClass {
                new (): Contract<any, any>;
                _fx?: {
                    configurableOptions?: Options;
                };
            }
            /**
             * Constrains the @Configurable decorator so that it can only be applied to a class that implements the 'Contract' interface.
             * This adds to the view model's 'context':
             * - 'configuration', the TemplatePart's configuration API
             * - 'parameters' and persisted 'settings' values, used in the 'onInitialize' and optional 'onRebind' methods to render the view.
             */
            interface Contract<TParameters, TSettings> {
                /**
                 * Context injected by the FX into the view model.  This context will include a 'configuration' (the TemplatePart's
                 * configuration API), as well as 'parameters' and 'settings' (the TemplatePart's persisted settings values).
                 */
                context: Context<TParameters, TSettings>;
            }
            /**
             * Context injected by the FX into the view model.  This context will include 'configuration' (the TemplatePart's configuration
             * API), the 'parameters' of the TemplatePart, as well as its persisted 'settings' values.
             */
            interface Context<TParameters, TSettings> extends MsPortalFxTemplatePart.Context<TParameters, any>, FxPartBase.Configurable.Context<TSettings> {
                /**
                 * The view model's configuration API, with which the view model can update its parameters and settings.
                 */
                configuration: Configuration<TParameters, TSettings>;
            }
            /**
             * The TemplatePart's configuration API returned from 'context.configuration'.
             */
            type Configuration<TParameters, TSettings> = FxPartBase.Configurable.Configuration<TParameters, TSettings>;
        }
        /**
         * The @ProxiedMember decorator.  Identifies a public member of a TemplatePart class that is to be proxied for use in the view.
         * This decorator is not necessary in most scenarios.
         * This decorator suppresses any compile-time errors that state "The '<MEMBER>' member is public and is not bound to the TemplatePart's HTML template."
         */
        export import ProxiedMember = FxViewModelBase.ProxiedMember;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Composition\ViewModelBase.d.ts
declare module "Fx/Composition/ViewModelBase" {
    import FxComposition = require("Fx/Composition");
    import FxPermissions = require("Fx/Composition/Permissions");
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import FxViewModels = MsPortalFx.ViewModels;
        /**
         * Options that are common to various Blade/Part decorators.  Includes metadata describing the Blade/Part and how it will be treated by
         * the FX.
         */
        interface Options {
            /**
             * Specifies whether this Blade/Part should exported from this extension,
             * so it can be imported/reused by other extensions.  The default is 'false'.
             */
            forExport?: boolean;
            /**
             * Used to associate this Blade/Part with a defined AssetType.  This allows the FX to:
             * - When an asset is deleted, give special UX treatment to associated Parts/Blades (close Blades, disable Parts)
             * - Store per-asset Part/Blade settings
             */
            forAsset?: {
                /**
                 * Names a single Blade/Part parameter that the FX will treat as the 'id' of the associated asset.
                 */
                assetIdParameter: string;
                /**
                 * Names an AssetType definition.  Values here should be one of the string constant generated by the PDL compiler from
                 * <AssetType>.
                 */
                assetType: string;
            };
            /**
             * Permissions that will be evaluated against the resource associated with this Blade/Part (see 'forAsset' above) before the
             * Blade/Part UI is shown/enabled.
             */
            permissions?: FxPermissions.Permissions;
        }
        /**
         * A common class type for Blade/Part view model classes.
         * For unit-testing purposes, this class type specifies an optional 'createModel' method that can be used to narrow the view model's
         * TModel type down from DataContext to a more-specific type that is easier to mock.
         */
        interface ViewModelClass<TModel> {
            new (): Contract<any, TModel>;
        }
        /**
         * A common interface type for Blade/Part view model classes.
         */
        interface Contract<TParameters, TModel> {
            /**
             * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
             * 'onRebind' methods.
             */
            context: Context<TParameters, TModel>;
            /**
             * Called by the FX to initialize this view model.
             *
             * @return A promise that should be resolved by the view model when: (1) all the data is loaded for this view model and (2) the
             * view model is updated to reflect the loaded data.
             */
            onInitialize(): Q.Promise<any>;
        }
        /**
         * Context injected by the FX into the view model.  This context should be used within the view model's 'onInitialize' and optional
         * 'onRebind' methods.
         */
        interface Context<TParameters, TModel> {
            /**
             * The container used by this view model.
             */
            container: Container;
            /**
             * The model used by this view model.
             */
            model: TModel;
            /**
             * Parameters supplied by the caller of this Blade/Part.
             */
            parameters: TParameters;
        }
        /**
         * Represents a container object that can be used to control the chrome of the Blade/Part.
         */
        interface Container extends FxBase.LifetimeManager, FxViewModels.BladeManagement {
            /**
             * Removes the blocking loading indicator from the Blade/Part.
             */
            revealContent(): void;
            /**
             * Closes this blade.
             *
             * @param data Use the @ReturnsData<TData> decorator to supply TData-typed 'data' here. This 'data' will be returned to the
             * BladeReference with which this Blade was opened, via the BladeReference's 'onClosed' callback.
             * @return a promise that resolves to true if the this blade is successfully closed.
             */
            closeCurrentBlade(data?: void): Q.Promise<boolean>;
            /**
             * Closes the child blade that is currently open.
             *
             * @return a promise that resolves to true if the child blade is successfully closed.
             */
            closeChildBlade(): Q.Promise<boolean>;
            /**
             * Closes the context blade that was opened by this part
             *
             * @returns a promise that resolves to true if the context blade is sucessfully closed.
             */
            closeContextBlade(): Q.Promise<boolean>;
            /**
             * Tracks the list of asynchronous operations being performed by the Part.
             */
            operations: FxComposition.OperationList;
            /**
             * An observable whose value determines the message displayed when there is no data to be displayed in the
             * Blade/Part.
             * This message will be displayed if it is non-null, non-empty.
             */
            noDataMessage: KnockoutObservable<string>;
            /**
             * Shows an error message in place of the Part.
             *
             * @param message A message that will be displayed to the user when the part fails.
             */
            fail(message: string): void;
            /**
             * Used to put a failed Blade/Part back into an operational state.
             */
            recover(): void;
            /**
             * Moves the container into a 'not found' display mode, allowing for an optional custom error message.
             *
             * @param message An optional custom error message.
             */
            notFound(message?: string): void;
            /**
             * Moves the container into an 'unauthorized' display mode, allowing for an optional custom error message.
             *
             * @param message A custom error message in place of the default.
             */
            unauthorized(message?: string): void;
        }
        /**
         * Shared by the decorator options of @TemplateBlade/@TemplatePart.  Requires that the extension supply an HTML template to which the
         * view model will be bound.
         */
        interface RequiresHtmlTemplateOptions {
            /**
             * The HTML template to which the associated view model will be bound.  This can be either an HTML string or an HTML filename.
             */
            htmlTemplate: string;
        }
        /**
         * Shared by decorator options that accept a 'styleSheets' option.
         */
        interface AcceptsStyleSheetsOptions {
            /**
             * The CSS style sheets containing styles used by HTML templates of this Blade/Part.
             */
            styleSheets?: string[];
        }
        module Rebindable {
            /**
             * Passed to the view model's 'onRebind' method, reflecting the changes to the view model's parameters.
             */
            interface Changes {
                /**
                 * The keys of those view model parameters whose values have changed.
                 */
                parameterKeys: string[];
            }
        }
        module Configurable {
            /**
             * Options supplied to the @Configurable decorator.  Used to supply metadata describing the Blade/Part's settings.
             */
            interface Options {
                /**
                 * Metadata describing the settings that will be persisted for this Blade/Part.
                 */
                settings?: {
                    /**
                     * The scope at which the settings will be persisted.  If not supplied, a default value of 'PerPartOrBladeType' will be
                     * used.
                     */
                    scope?: SettingsScope;
                    /**
                     * A StringMap of metadata describing individual settings that will be persisted.
                     */
                    metadata?: {
                        [key: string]: SettingMetadata;
                    };
                };
            }
            /**
             * Metadata describing one setting of the Blade/Part's persisted settings.
             */
            interface SettingMetadata {
                /**
                 * Specifies whether this setting is one that can be shared across different Part and Blade types (that is, isn't used by a
                 * single Part or Blade type).  If not supplied, a default value of 'false' will be used.
                 */
                isSharedAcrossPartAndBladeTypes?: boolean;
                /**
                 * When 'isSharedAcrossPartAndBladeTypes' is 'true', this is the key under which the setting will be saved.  This key will
                 * be used in the different Parts and Blades that share the setting value.
                 */
                sharedKey?: string;
            }
            /**
             * The scope at which the Blade/Part's settings are persisted.
             */
            enum SettingsScope {
                /**
                 * The settings are saved under a single key for all instances of the associated Blade/Part.
                 */
                PerPartOrBladeType = 0,
                /**
                 * The settings are saved under a discrete key for each 'id' with which the associated Blade/Part
                 * is rendered.  For instance, the 'Freezing Fog' website would have different settings values than those of the
                 * 'Jasmine Dancer' website on the 'WebsiteDetails' Blade.
                 */
                PerId = 1,
            }
            /**
             * Context injected by the FX into the view model.  This context will include a 'configuration' (the
             * Blade/Part's configuration API) as well as 'parameters' and 'settings' (the
             * Blade/Part's persisted settings values).
             */
            interface Context<TSettings> {
                /**
                 * The persisted settings values.
                 */
                settings: TSettings;
            }
        }
        /**
         * The @ProxiedMember decorator.  Identifies a public member of a Blade/Part class that is to be proxied for use in the view.
         * This decorator is not necessary in most scenarios.
         * This decorator suppresses any compile-time errors that state "The '<MEMBER>' member is public and is not bound to the Blade/Part's view."
         */
        function ProxiedMember(target: Object, key: string): void;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\BaseResourceDropDown.d.ts
declare module "Fx/Controls/BaseResourceDropDown" {
    import { CustomV, Required, ValidationResult } from "Fx/Controls/Validations";
    export = Main;
    module Main {
        import FxAzure = MsPortalFx.Azure;
        /**
         * The validations accepted by the resource dropdowns
         */
        type Validation<TValue> = CustomV<TValue> | Required;
        /**
         * The options accepted by all resource dropdowns
         */
        interface Options<TValue> {
            /**
             * The label of the control
             */
            label?: string | KnockoutObservableBase<string>;
            filter?: boolean;
            /**
             * Sets the filter TextBox’s placeholder text.
             * Default is blank.
             */
            filterPlaceholder?: string;
            /**
             * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
             */
            suppressDirtyBehavior?: boolean;
            /**
             * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
             */
            value?: TValue | KnockoutObservableBase<TValue>;
            /**
             * Validations on the control
             */
            validations?: Validation<TValue>[] | KnockoutObservableBase<Validation<TValue>[]>;
            /**
             * An object which will map values to groups and sort the groups.
             */
            grouping?: {
                /**
                 * A function which takes an item and returns the display name of the group it will belong to
                 * @param item An object of the type for this dropdown
                 * @returns The display name for the group it belongs to. If empty, item will be on top level of the dropdown
                 */
                map(item: TValue): string;
                /**
                 * A comparator to display the groups in the order desired (does not sort values within groups)
                 */
                sort?: Comparator<string>;
            };
            /**
             * An object which will hide values
             */
            hiding?: {
                /**
                 * A callback for to determine if an item is hidden
                 * @param item An object of the type for this dropdown
                 * @returns A flag for if the item should be hidden
                 */
                hide(item: TValue): boolean;
                /**
                 * A message explaining why values are hidden
                 */
                reason: string;
            };
            /**
             * A callback which will disable an item if a reason is returned to disable it.
             * Values will be grouped by the reason the item is disabled
             * @param item An object of the type for this dropdown
             * @return The reason this item is disabled. If empty the item will be enabled.
             */
            disable?(item: TValue): string;
            /**
             * A comparator to display the values in the order desired (does not sort groups if you have any)
             */
            sort?: Comparator<TValue>;
        }
        /**
         * The contract all resource dropdowns fulfill
         */
        interface Contract<TValue> {
            /**
             * The dirty state of the control.  This will only change when the user performs an action to change the value, or the dirty state is set explicitly by the extension.
             */
            readonly dirty: KnockoutObservableBase<boolean>;
            /**
             * The validation state of the control.
             */
            readonly valid: KnockoutReadOnlyObservableBase<boolean>;
            /**
             * The label of the control
             */
            readonly label: KnockoutObservable<string>;
            /**
             * validations on the control
             */
            readonly validations: KnockoutObservableArray<Validation<TValue>>;
            /**
             * Latest validation results.
             */
            readonly validationResults: KnockoutReadOnlyObservableArray<ValidationResult>;
            /**
             * The disabled state of the control.
             */
            readonly disabled: KnockoutObservableBase<boolean>;
            /**
             * Triggers validation on this control when called.  Returns a promise that resolves once validation on this control has completed.
             */
            readonly triggerValidation: () => Q.Promise<void>;
            /**
             * the value of the control
             */
            readonly value: KnockoutObservableBase<TValue>;
            /**
             * The available values for the control
             */
            readonly fetchedValues: KnockoutReadOnlyObservableArray<TValue>;
            /**
             * Puts the control into a loading state.  When in the loading state, the control will be disabled and have the text "Loading..." shown.
             */
            readonly loading: KnockoutReadOnlyObservable<boolean>;
        }
        /**
         * Subscription dropdown interfaces
         */
        module Subscription {
            import FxGalleryItem = MsPortalFx.Services.Gallery.GalleryItem;
            import ResourceManager = FxAzure.ResourceManager;
            import RequiredPermissions = FxAzure.RequiredPermissions;
            import Subscription = FxAzure.Subscription;
            /**
             * Options for the legacy dropdown which doesn't have the property initialSubscriptionId
             */
            interface BaseOptions extends Main.Options<Subscription> {
                /**
                 * The gallery item to validate against.
                 */
                filterByGalleryItem?: FxGalleryItem | ResourceManager.GalleryItemExtract | KnockoutObservableBase<FxGalleryItem | ResourceManager.GalleryItemExtract>;
                /**
                 * The list of required permissions the subscription must have. (If you need to check
                 * for resource provider registration permissions, use the 'resourceProviders' option
                 * instead.)
                 */
                requiredPermissions?: RequiredPermissions | KnockoutObservableBase<RequiredPermissions>;
                /**
                 * A list of resource providers that the
                 * subscription needs to be registered with. Providing the list will NOT register
                 * the subscription with the resource provider, but will only check if the user has
                 * the necessary permissions to register them (only if they aren't registered already).
                 */
                resourceProviders?: string[] | KnockoutObservableBase<string[]>;
            }
            /**
             * Options for the subscirption dropdown.
             */
            interface Options extends BaseOptions {
                /**
                 * The initial subscription id to be set as a default value for the dropdown if it's a member of the values fetched from ARM.
                 * Create Blades will receive this value as a Blade parameter.
                 * If an array is passed here, the first item in the array which is is a member of the values fetched from ARM will be used.
                 */
                initialSubscriptionId: string | string[] | KnockoutObservableBase<string | string[]>;
            }
            /**
             * This is the contract for the subscription dropdown
             */
            interface Contract extends Main.Contract<Subscription> {
            }
        }
        /**
         * Location dropdown interfaces module
         */
        module Location {
            import Location = MsPortalFx.Azure.Location;
            /**
             * Options for the legacy dropdown which doesn't have properties initialLocationName and subscriptionId
             */
            type BaseOptions = Main.Options<Location>;
            /**
             * Options for the location dropdown.
             */
            interface Options extends BaseOptions {
                /**
                 * The initial location name to be set as a default value for the dropdown if it's a member of the values fetched from ARM.
                 * Create blades will receive this as a parameter, so supplying this as initialLocationName is required
                 * If an array is passed here, the first item in the array which is is a member of the values fetched from ARM will be used.
                 */
                initialLocationName: string | string[] | KnockoutObservableBase<string | string[]>;
                /**
                 * The subscription used to look up available locations
                 */
                subscriptionId: KnockoutObservableBase<string>;
                /**
                 * Optional. The observable that holds the list of resource types used to filter locations.
                 */
                resourceTypes?: string[] | KnockoutObservableBase<string[]>;
            }
            /**
             * This is the contract for the location dropdown
             */
            interface Contract extends Main.Contract<Location> {
            }
        }
        /**
         * ResourceGroup dropdown interfaces module
         */
        module ResourceGroup {
            import RequiredPermissions = FxAzure.RequiredPermissions;
            /**
             * The modes possible for the dropdown
             */
            const enum Mode {
                UseExisting = 0,
                CreateNew = 1,
                Both = 2,
            }
            /**
             * The mode of the value returned by the control
             */
            type SelectedMode = Mode.CreateNew | Mode.UseExisting;
            /**
             * The ARM resource group value
             */
            type ResourceGroup = FxAzure.ResourceGroup;
            /**
             * The value of the resource group dropdown
             */
            interface Value {
                /**
                 * The mode of the dropdown, create new or use existing
                 */
                mode: SelectedMode;
                /**
                 * The ARM value for the resource group
                 */
                value: ResourceGroup;
            }
            /**
             * Options for the resource group dropdown.
             */
            interface Options extends BaseOptions {
                /**
                 * The inital resourceGroupId to be set as a default value for the dropdown if it's an existing resource group in the dropdown.
                 * If an array is passed, will select the first available in the list
                 */
                initialResourceGroupName?: string | string[] | KnockoutObservableBase<string | string[]>;
                /**
                 * The subscription used to look up available resource groups
                 */
                subscriptionId: KnockoutObservableBase<string>;
            }
            /**
             * Options for the legacy dropdown (which doesn't have 'initialResourceGroupName' and 'subscriptionId' properties)
             */
            interface BaseOptions extends Main.Options<Value> {
                /**
                 * The default value for a new resource group name. If set, the +New text box will
                 * default to that value. If a resource group already exists with the same value, this
                 * string will be incremented ("val", "val_1", "val_2", etc.). If not set, the text
                 * box will be left blank (default).
                 */
                defaultNewValue?: string;
                /**
                 * The list of required permissions the subscription must have.
                 */
                requiredPermissions?: RequiredPermissions | KnockoutObservableBase<RequiredPermissions>;
                /**
                 * The mode allowed for the resource group dropdown
                 */
                allowedMode?: Mode | KnockoutObservableBase<Mode>;
            }
            /**
             * This is the contract for the resource group dropdown
             */
            interface Contract extends Main.Contract<Value> {
                /**
                 * Set which mode the dropdown is in, create or use existing
                 */
                switchMode(mode?: SelectedMode): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Batch\HeatMap.d.ts
declare module "Fx/Controls/Batch/HeatMap" {
    export = Main;
    module Main {
        /**
         * Represent an item in the heatMap
         */
        interface Item {
            /**
             * Id of an item in the heatmap. This NEED to be unique.
             */
            id: string;
            /**
             * State of the item
             */
            state: string;
            /**
             * Optional setting to make the item less opaque on the heatmap.
             * Default: 1
             */
            opacity?: number;
        }
        /**
         * Possible position of the legend relative to the heatmap.
         * i.e. LegendLocation.Left means the legend will be on the left of the heatmap.
         *
         * LegendLocation.None will not show the legend
         */
        enum LegendLocation {
            None = 0,
            Top = 1,
            Right = 2,
            Bottom = 3,
            Left = 4,
        }
        /**
         * Represent a possible state an item can have
         */
        interface State {
            /**
             * State id, Item added to the Heatmap should have their state match this id
             */
            id: string;
            /**
             * Label for the legend
             */
            label: KnockoutObservableBase<string>;
            /**
             * Color the tile with this state will have
             */
            color: MsPortalFx.ColorUtil.ColorCode;
            /**
             * Color opacity
             * @default 1
             */
            opacity?: number;
        }
        interface Options {
            /**
             * Message to be displayed in the heatmap if the item list is empty
             */
            noItemsMessage?: KnockoutObservableBase<string>;
            /**
             * List of available states. Every state that might be used in an item later on should be here.
             */
            states?: State[];
            /**
             * When one of the item has a state not defined in the lis_t above it will use this color
             */
            unknownStateColor?: MsPortalFx.ColorUtil.ColorCode;
            /**
             * Enable selection on the heatmap
             * @default true
             */
            isSelectable?: boolean;
            /**
             * If the heatmap control should expand automatically if the number of items don't fit in the initial window
             * @default false
             */
            isExpandable?: boolean;
            /**
             * Minimum number of pixel a tile side can be in the heatmap
             * Cannot be less that 1
             * @default 10
             */
            minTileSize?: number;
            /**
             * Maximum number of pixel a tile side can be in the heatmap
             * @default 100
             */
            maxTileSize?: number;
            /**
             * Legend location relative to the heatmap.
             * None will not show the legend.
             * @default Right
             */
            legendLocation?: KnockoutObservableBase<LegendLocation>;
        }
        interface ItemListDiff {
            added: Item[];
            updated: Item[];
            removed: Item[];
        }
        class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel {
            states: State[];
            unknownStateColor: MsPortalFx.ColorUtil.ColorCode;
            noItemsMessage: KnockoutObservableBase<string>;
            errorMessage: string;
            minTileSize: number;
            maxTileSize: number;
            /**
             * Enable selection on the heatmap
             * @default true
             */
            isSelectable: boolean;
            /**
             * If the heatmap control should expand automatically if the number of items don't fit in the initial window
             * @default false
             */
            isExpandable: boolean;
            /**
             * Cache of the items used to compute the edits
             */
            private itemMap;
            /**
             * Legend location relative to the heatmap.
             * None will not show the legend.
             * @default Right
             * @see LegendOptions
             */
            legendLocation: KnockoutObservableBase<LegendLocation>;
            /**
             * Internal mapping of state by ID.
             * Used in the widget.
             */
            stateMap: StringMap<State>;
            /**
             * Internal callback that will pass the difference of items everytime setItems is called
             */
            _msPortalFxUpdateCallback: KnockoutObservable<(diffs: ItemListDiff) => void>;
            /**
             * Internal update to ask for a canvas redraw
             */
            _msPortalFxUpdateCanvas: KnockoutObservable<number>;
            /**
             * Observable containing the currently selected item.
             * Seleletable must be set to true in the options for this to be updated
             */
            selectedItem: KnockoutObservable<Item>;
            selectable: MsPortalFx.ViewModels.Selectable<Item>;
            /**
             * Buffer for to keep the last setItems args until the implementation set the callback
             */
            private _lastItemsBuffer;
            private defaultOptions;
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options);
            setItems(items: Item[]): void;
            /**
             * Force a render of the heatmap.
             * Use this if you have enableAutoRendering to false.
             */
            render(): void;
            private _createStateMap();
            private _createItemMap(items);
            private _computeDifference(oldMap, newMap);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Button.d.ts
declare module "Fx/Controls/Button" {
    /**
     * Styling of the button
     */
    export const enum Style {
        /**
         * primary button style (default)
         */
        Primary = 0,
        /**
         * secondary button style
         */
        Secondary = 1,
    }
    /**
     * Options used to dynamically configure the button.
     */
    export interface Options {
        /**
         * Callback invoked when the button is clicked.
         */
        onClick: Function;
        /**
         * The text shown on the button
         */
        text: string | KnockoutObservableBase<string>;
        /**
         * Style of the button
         */
        style?: Style | KnockoutObservableBase<Style>;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
    }
    /**
     * Button control
     */
    export interface Contract {
        /**
         * The disabled state of the control.
         */
        readonly disabled: KnockoutObservableBase<boolean>;
        /**
         * The text shown on the button
         */
        readonly text: KnockoutObservableBase<string>;
        /**
         * Style of the button
         */
        readonly style: KnockoutObservableBase<Style>;
    }
    /**
     * Creates a button control viewmodel.
     * Note: The only options that you will be able to dynamically update are the ones that are passed in as observables.
     * ie: if you pass in { text: ko.observable("myLabel") }, the label property on your viewmodel will be observable.
     * similarly, if you pass in { text: "myLabel" } as your options, and you will not be able to update your label dynamically.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a button viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\CheckBox.d.ts
declare module "Fx/Controls/CheckBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a checkbox control.
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * The aria-label on the control.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * if set to true, the label will be placed to the right of the control
         */
        labelOnRight?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * CheckBox control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<boolean>;
    }
    /**
     * Creates a checkbox control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a checkbox control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\CustomHtml.d.ts
declare module "Fx/Controls/CustomHtml" {
    /**
     * Options for creating a custom html form control
     */
    export interface Options {
        /**
         * The html template to display as the body of the form.
         */
        htmlTemplate: string;
        /**
         * The object to bind to the template.
         */
        innerViewModel?: any;
        /**
         * Uses a new binding context for the template such that $root is innerViewModel instead of the blade/part view model.
         * Defaults to true.
         */
        isolated?: boolean;
        /**
         * The label of the control.
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sub label of the control.
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * sanitized html string shown in the info balloon popup.
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * Custom html control viewmodel
     */
    export interface Contract {
        /**
         * The label of the control.
         */
        readonly label: KnockoutObservable<string>;
        /**
         * The sub label of the control.
         */
        readonly subLabel: KnockoutObservable<string>;
        /**
         * sanitized html string shown in the info balloon popup.
         */
        readonly infoBalloonContent: KnockoutObservable<string>;
    }
    /**
     * Creates a custom html control viewmodel.
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DatePicker.d.ts
declare module "Fx/Controls/DatePicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import DateTimeRange = MsPortalFx.DateUtil.DateTimeRange;
    /**
     * Options for configuring a date picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Aria label for the DatePicker.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: DateTimeRange | KnockoutObservable<DateTimeRange>;
        /**
        * Whether the control should allow empty(null) value as valid.
        */
        allowEmpty?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: Date | KnockoutObservableBase<Date>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * DatePicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<Date>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        readonly enabledDateTimeRange: KnockoutObservable<DateTimeRange>;
    }
    /**
     * Creates a date picker control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a date picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DateTimePicker.d.ts
declare module "Fx/Controls/DateTimePicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import DateTimeRange = MsPortalFx.DateUtil.DateTimeRange;
    /**
     * Options for configuring a date time picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Aria label for the DateTimePicker.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: DateTimeRange | KnockoutObservable<DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown?: boolean | KnockoutObservable<boolean>;
        /**
         * Timezone offset.
         */
        timezoneOffset?: number | KnockoutObservable<number>;
        /**
        * Whether the control should allow empty(null) value as valid.
        */
        allowEmpty?: boolean;
        /**
         * Empty value text for time.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * If true displays hours, minutes, and seconds. If false displays only hours and minutes.
         */
        showSeconds?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: Date | KnockoutObservableBase<Date>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * DateTimePicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<Date>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        readonly enabledDateTimeRange: KnockoutObservable<DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        readonly showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Timezone offset.
         */
        readonly timezoneOffset: KnockoutObservable<number>;
        /**
         * Empty value text for time.
         */
        readonly placeHolderText: KnockoutObservable<string>;
    }
    /**
     * Creates a date/time picker control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a date time picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DateTimeRangePicker.d.ts
declare module "Fx/Controls/DateTimeRangePicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import DateTimeRange = MsPortalFx.DateUtil.DateTimeRange;
    /**
     * Options for configuring a date time range picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Aria label for the DateTimeRangePicker.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Enabled range for start date/time
         */
        startDateTimeEnabledRange?: DateTimeRange | KnockoutObservable<DateTimeRange>;
        /**
         * Enabled range for end date/time
         */
        endDateTimeEnabledRange?: DateTimeRange | KnockoutObservable<DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown?: boolean | KnockoutObservable<boolean>;
        /**
         * Timezone offset.
         */
        timezoneOffset?: number | KnockoutObservable<number>;
        /**
         * Display start/end date/time fields inline (false by default).
         */
        displayFieldsInline?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: DateTimeRange | KnockoutObservableBase<DateTimeRange>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * DateTimeRangePicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<DateTimeRange>;
        /**
         * Enabled range for start date/time
         */
        readonly startDateTimeEnabledRange: KnockoutObservable<DateTimeRange>;
        /**
         * Enabled range for end date/time
         */
        readonly endDateTimeEnabledRange: KnockoutObservable<DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        readonly showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Timezone offset. Defaults to the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC).
         */
        readonly timezoneOffset: KnockoutObservable<number>;
    }
    /**
     * Creates a date/time range picker control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a date time range picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DayPicker.d.ts
declare module "Fx/Controls/DayPicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a day picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Aria label for the DayPicker.
         */
        ariaLabel?: string | KnockoutObservable<string>;
        /**
         * Validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * Sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: number[] | KnockoutObservableBase<number[]>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * DayPicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<number[]>;
    }
    /**
     * Creates a day picker control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a day picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DropDown.d.ts
declare module "Fx/Controls/DropDown" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export = Main;
    module Main {
        interface Item<TValue> {
            text: string | KnockoutObservableBase<string>;
            selectedItemOverride?: string | KnockoutObservableBase<string>;
            value: TValue;
            disabled?: boolean | KnockoutObservableBase<boolean>;
            /**
             * Aria label for item.
             */
            ariaLabel?: string | KnockoutObservableBase<string>;
        }
        interface Group<TValue> {
            text: string | KnockoutObservableBase<string>;
            children?: Array<Item<TValue> | Group<TValue>> | KnockoutObservableBase<Array<Item<TValue> | Group<TValue>>>;
            disabled?: boolean | KnockoutObservableBase<boolean>;
            /**
             * Aria label for group.
             */
            ariaLabel?: string | KnockoutObservableBase<string>;
        }
        interface Options<TValue> {
            /**
             * The label of the control
             */
            label?: string | KnockoutObservable<string>;
            /**
             * The sublabel of the control
             */
            subLabel?: string | KnockoutObservable<string>;
            /**
             * validations on the control
             */
            validations?: Validation[] | KnockoutObservableArray<Validation>;
            /**
             * sanitized html string shown in the info balloon popup
             */
            infoBalloonContent?: string | KnockoutObservable<string>;
            items?: Array<Item<TValue> | Group<TValue>> | KnockoutObservableBase<Array<Item<TValue> | Group<TValue>>>;
            filter?: boolean;
            /**
            * Sets the filter textbox's placeholder.
            * Default is blank.
            */
            filterPlaceholder?: string;
            /**
             * Callback which will override our simple substring filtering.
             * Return list of items you wish to filter.
             * Doesn't do anything unless filter is true.
             */
            customFilter?: (value: string) => MsPortalFx.Base.PromiseV<TValue[]>;
            multiselect?: boolean;
            /**
             * Multiple items text format (multiselect only).
             * By default the format string is "{0} selected"
             */
            multiItemDisplayText?: string | KnockoutObservableBase<string>;
            selectAll?: boolean;
            /**
             * Callback which will override our selectAll functionality.
             * Allows you to select any items you wish, we don't do any selecting when you provide this override.
             */
            selectAllOverride?: () => MsPortalFx.Base.PromiseV<any>;
            /**
             * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
             */
            suppressDirtyBehavior?: boolean;
            /**
             * The loading state of the control. Defaults to false.
             */
            loading?: boolean | KnockoutObservableBase<boolean>;
            /**
             * The disabled state of the control.
             */
            disabled?: boolean | KnockoutObservableBase<boolean>;
            /**
             * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
             */
            value?: TValue | Array<TValue> | KnockoutObservableBase<TValue> | KnockoutObservableBase<Array<TValue>>;
            /**
             * The visible state of the control.
             */
            visible?: boolean | KnockoutObservableBase<boolean>;
            /**
             * A custom css class to apply to the control.
             */
            cssClass?: string | KnockoutObservable<string>;
        }
        /**
         * DropDown control view model
         */
        interface Contract<TValue> extends Base.Contract {
            /**
             * Popup state of of the dropdown.
             */
            readonly isPopUpOpen: KnockoutReadOnlyObservableBase<boolean>;
            readonly items: KnockoutObservableBase<Array<Item<TValue> | Group<TValue>>>;
            /**
             * Puts the control into a loading state.  When in the loading state, the control will be disabled and have the text "Loading..." shown.
             */
            readonly loading: KnockoutObservableBase<boolean>;
            /**
             * Multiple items text format (multiselect only).
             * By default the format string is "{0} selected"
             */
            readonly multiItemDisplayText: KnockoutObservableBase<string>;
            /**
             * the value of the control
             */
            readonly value: KnockoutObservableBase<TValue> & KnockoutObservableBase<Array<TValue>>;
        }
        /**
         * Creates a dropdown control viewmodel.
         *
         * @param lifetime The lifetime of the control
         * @param items The items shown in the dropdown
         * @param options Options that modify the appearance and behavior of the control.
         *
         * @returns a dropdown control viewmodel
         */
        function create<TValue>(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options<TValue>): Contract<TValue>;
        /**
         * Options used in old construction pattern.  For new controls, please use the new create pattern.
         */
        interface ObsoleteOptions<T> {
            /**
             * The label of the control
             */
            label?: string | KnockoutObservable<string>;
            /**
             * The sublabel of the control
             */
            subLabel?: string | KnockoutObservable<string>;
            /**
             * validations on the control
             */
            validations?: Validation[] | KnockoutObservableArray<Validation>;
            /**
             * sanitized html string shown in the info balloon popup
             */
            infoBalloonContent?: string | KnockoutObservable<string>;
            items?: KnockoutObservableBase<Array<Item<T> | Group<T>>>;
            filter?: boolean | KnockoutObservableBase<boolean>;
            /**
            * Sets the filter textbox's placeholder.
            * Default is blank.
            */
            filterPlaceholder?: string | KnockoutObservable<string>;
            /**
             * Callback which will override our simple substring filtering.
             * Return list of items you wish to filter.
             * Doesn't do anything unless filter is true.
             */
            customFilter?: (value: string) => MsPortalFx.Base.PromiseV<T[]>;
            multiselect?: boolean | KnockoutObservableBase<boolean>;
            selectAll?: boolean | KnockoutObservableBase<boolean>;
            /**
             * Callback which will override our selectAll functionality.
             * Allows you to select any items you wish, we don't do any selecting when you provide this override.
             */
            selectAllOverride?: () => MsPortalFx.Base.PromiseV<any>;
            /**
             * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
             */
            suppressDirtyBehavior?: boolean;
            /**
             * The disabled state of the control.
             */
            disabled?: KnockoutObservableBase<boolean>;
            /**
             * Show validation error message below the control.
             */
            showValidationMessagesBelowControl?: boolean;
            /**
             * Aria label for dropdown.
             */
            ariaLabel?: string | KnockoutObservableBase<string>;
            /**
             * Display text format for multiselect.
             * By default the format string is "{0} selected"
             */
            multiItemDisplayText?: string | KnockoutObservableBase<string>;
            /**
             * The visible state of the control.
             */
            visible?: boolean | KnockoutObservableBase<boolean>;
            /**
             * A custom css class to apply to the control.
             */
            cssClass?: string | KnockoutObservableBase<string>;
        }
        /**
         * Old construction pattern.  Instead of creating instances of this class, please use the create methods in this module instead.
         */
        class ViewModel<TValue> extends MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<TValue> {
            items: KnockoutObservableBase<Array<Item<TValue> | Group<TValue>>>;
            filter: boolean | KnockoutObservableBase<boolean>;
            /**
            * Sets the filter textbox's placeholder.
            * Default is blank.
            */
            filterPlaceholder: string | KnockoutObservable<string>;
            /**
             * Callback which will override our simple substring filtering.
             */
            customFilter: (value: string) => MsPortalFx.Base.PromiseV<TValue[]>;
            multiselect: boolean | KnockoutObservableBase<boolean>;
            /**
             * Multiple items text format (multiselect only).
             * By default the format string is "{0} selected"
             */
            multiItemDisplayText: string | KnockoutObservableBase<string>;
            selectAll: boolean | KnockoutObservableBase<boolean>;
            /**
             * Callback which will override our selectAll functionality.
             */
            selectAllOverride: () => MsPortalFx.Base.PromiseV<any>;
            /**
             * Value is of type T or Array<TValue> depending on whether multiselect is set;
             */
            value: KnockoutObservableBase<TValue> & KnockoutObservableBase<Array<TValue>>;
            /**
             * Aria label for dropdown.
             */
            readonly ariaLabel: KnockoutObservableBase<string>;
            /**
             * Popup state of of the dropdown.
             */
            readonly isPopUpOpen: KnockoutReadOnlyObservableBase<boolean>;
            /**
             * This is an old construction pattern.  Please use the create method in this module instead.
             *
             * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
             * @param options Optional The set of options to configure the Dropdown control.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: ObsoleteOptions<TValue> & MsPortalFx.ViewModels.Forms.Base.Input.Options<TValue>);
            /**
             * This is an old construction pattern.  Please use the create method in this module instead.
             *
             * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
             * @param form The form element within which the Dropdown is contained.
             * @param observablePath The path to the value on the EditScope to be bound to this field.
             * @param options Optional The set of options to configure the Dropdown control.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: ObsoleteOptions<TValue> & MsPortalFx.ViewModels.Forms.Base.Input.Options<TValue>);
            /**
             * This is an old construction pattern.  Please use the create method in this module instead.
             *
             * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
             * @param form The form element within which the Dropdown is contained.
             * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
             * @param options Optional The set of options to configure the Dropdown control.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<any>, options?: ObsoleteOptions<TValue> & MsPortalFx.ViewModels.Forms.Base.Input.Options<TValue>);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\DurationPicker.d.ts
declare module "Fx/Controls/DurationPicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a duration picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: number | KnockoutObservableBase<number>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * DurationPicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<number>;
    }
    /**
     * Creates a duration picker control viewmodel.
     * Note: The only options that you will be able to dynamically update are the ones that are passed in as observables.
     * ie: if you pass in { label: ko.observable("myLabel") }, the label property on your viewmodel will be observable, but the sublabel property will not be.
     * similarly, if you pass in { label: "myLabel" } as your options, and you will not be able to update your label dynamically.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a duration picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Essentials.d.ts
declare module "Fx/Controls/Essentials" {
    import * as FxCompositionBlade from "Fx/Composition/Blade";
    import * as FxCompositionPdlBlade from "Fx/Composition/Pdl/Blade";
    import * as FxCompositionTemplateBlade from "Fx/Composition/TemplateBlade";
    import { ClickableLink } from "Fx/Composition";
    export = Main;
    module Main {
        import BaseViewModel = MsPortalFx.ViewModels.Controls.Base.ViewModel;
        type Container = FxCompositionBlade.Container | FxCompositionPdlBlade.Container | FxCompositionTemplateBlade.Container;
        /**
         * Essentials type of options.
         */
        const enum OptionType {
            /**
             * Default options with resource id.
             */
            Default = 1,
            /**
             * Custom layout capable options with resource id.
             */
            CustomLayout = 2,
            /**
             * Non-resource options.
             */
            NonResource = 3,
        }
        /**
         * Built-In properties those can be obtained from resource data.
         */
        const enum BuiltInType {
            /**
             * Built-in resource group property.
             */
            ResourceGroup = 1,
            /**
             * Built-in status property.
             */
            Status = 2,
            /**
             * Built-in location property.
             */
            Location = 3,
            /**
             * Built-in subscription name property.
             */
            SubscriptionName = 4,
            /**
             * Built-in subscription id property.
             */
            SubscriptionId = 5,
        }
        /**
         * Blade close options.
         */
        interface BladeCloseOptions {
            /**
             * Built-in type to know who called the onBladeClose.
             */
            builtInType: BuiltInType;
            /**
             * A callback funtion called when the resource blade is closed.
             */
            onBladeClose: (type: BuiltInType) => void;
        }
        /**
         * Base options.
         */
        interface Options {
            /**
             * Expanded state of the essentials control.
             */
            expanded?: KnockoutObservableBase<boolean>;
            /**
             * This function is called when the expander is clicked.
             */
            onExpanderClick?: (isExpanded: boolean) => void;
            /**
             * Show all items without blocking them with "Show All/Collpase" button.
             */
            showAllItems?: boolean;
        }
        /**
         * Most common default options with resource.
         */
        interface DefaultOptions extends Options {
            /**
             * Resource id.
             */
            resourceId: string;
            /**
             * List of built-in types to hide.
             */
            hiddenBuiltInTypes?: BuiltInType[];
            /**
             * List of built-in types to hide the "change", move resource, button.
             */
            hiddenChangeLink?: BuiltInType[];
            /**
             * Additional static properties on the left besides the usual 5 items.
             */
            additionalLeft?: (Item | MultiLineItem)[];
            /**
             * Additional static properties on the right.
             */
            additionalRight: (Item | MultiLineItem)[];
            /**
             * This callback function is called when the resource blade is opened.
             */
            onBladeOpen?: (type: BuiltInType) => void;
            /**
             * This callback function is called when the resource blade is closed.
             */
            onBladeClose?: (type: BuiltInType) => void;
        }
        /**
         * Custom layout options with resource.
         */
        interface CustomLayoutOptions extends Options {
            /**
             * Resource id.
             */
            resourceId: string;
            /**
             * List of items to render on the left pane.
             */
            left: (Item | MultiLineItem | BuiltInType)[];
            /**
             * List of items to render on the right pane.
             */
            right: (Item | MultiLineItem | BuiltInType)[];
            /**
             * List of built-in types to hide the "change" button, move resource blade opening button, right next to the built-in type label.
             */
            hiddenChangeLink?: BuiltInType[];
            /**
             * This callback function is called when the resource blade is opened.
             */
            onBladeOpen?: (type: BuiltInType) => void;
            /**
             * This callback function is called when the resource blade is closed.
             */
            onBladeClose?: (type: BuiltInType) => void;
        }
        /**
         * Non-resource options.
         */
        interface NonResourceOptions extends Options {
            /**
             * List of items to render on the left pane.
             */
            left: (Item | MultiLineItem)[];
            /**
             * List of items to render on the right pane.
             */
            right: (Item | MultiLineItem)[];
        }
        /**
         * Properties of an item.
         */
        interface ItemProperty {
            /**
             * Item value to show.
             */
            value: string | KnockoutObservableBase<string>;
            /**
             * OnClick handler for the item.
             */
            onClick?: (() => void) | ClickableLink;
        }
        /**
         * Single-line item.
         */
        interface Item extends ItemProperty {
            /**
             * Label for the item.
             */
            label: string;
        }
        /**
         * Multi-line item.
         */
        interface MultiLineItem {
            /**
             * Label for the multi-line item.
             */
            label: string;
            /**
             * Arrays of item properties.
             * Multi-line item contains one label and multiple item properties.
             */
            lines: ItemProperty[];
        }
        /**
         * Essentials control viewModel.
         */
        class ViewModel extends BaseViewModel {
            /**
             * Expanded state.
             */
            expanded: KnockoutObservableBase<boolean>;
            /**
             * Essentials disabled state.
             */
            disabled: KnockoutObservableBase<boolean>;
            /**
             * Show all items without blocking them with "Show All/Collpase" button.
             */
            showAllItems: boolean;
            private _container;
            private _msPortalFxPrivates;
            /**
             * Constructs essentials viewModel.
             * The most common essentials control with resource id.
             *
             * @param container A template blade container.
             * @param options The set of options to configure the essentials.
             */
            constructor(container: Container, options: DefaultOptions);
            /**
             * Constructs essentials viewModel.
             * Essentials control with resource id and flexible layout capability.
             *
             * @param container A template blade container.
             * @param options The set of options to configure the essentials.
             */
            constructor(container: Container, options: CustomLayoutOptions);
            /**
             * Constructs essentials viewModel.
             * Essentials control without resource id and flexible layout capability.
             *
             * @param container A template blade container.
             * @param options The set of options to configure the essentials.
             */
            constructor(container: Container, options: NonResourceOptions);
            /**
             * Add items dynamically to the essentials control.
             *
             * @param left An array of item to add.
             * @param right An array of item to add.
             */
            addDynamicProperties(left: (Item | MultiLineItem)[], right: (Item | MultiLineItem)[]): void;
            /**
             * Set "Status" property.
             * No effect with NonResourceOptions essentials control.
             *
             * @param status A string value to set the "Status" property value.
             */
            modifyStatus(status: string): void;
            private _openBlade(resourceId, bladeCloseOptions?);
            private _runOnBladeClose(bladeCloseOptions);
            private _openMoveResourceBlade(bladeReference);
            private _getResourceInfo(resourceId);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\FileUpload.d.ts
declare module "Fx/Controls/FileUpload" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import UploadContext = MsPortalFx.ViewModels.FileUpload.UploadContext;
    export import UploadType = MsPortalFx.ViewModels.FileUpload.UploadType;
    export import ContentType = MsPortalFx.ViewModels.FileUpload.ContentType;
    export import SelectedFileContract = MsPortalFx.ViewModels.FileUpload.SelectedFileContract;
    export import AsyncUploadTaskContract = MsPortalFx.ViewModels.FileUpload.AsyncUploadTaskContract;
    /**
     * Options for configuring a file upload control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The text shown when no value is set in the control.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * A comma-separated list of allowed file mime-types, excluding extensions.
         * This maps directly to the HTML accept attribute for file input controls and filters the file based on specified mime-types in the file browse dialog.
         * The file filtering  behavior depends on native browser support.
         */
        accept?: string | KnockoutObservableBase<string>;
        /**
         * A comma-separated list of allowed file extensions.
         * This is upload control specific validations that will validate if the selected file is in the allowed file extension list.
         * If the selected file is not in the extension list, a validation error will be flagged and the selected file will be marked as invalid.
         * Eg: "pfx,cer"
         */
        allowedFileExtensions?: string | KnockoutObservableBase<string>;
        /**
         * The maximum number of files allowed to be uploaded at once.
         * This limit is applied post-selection.
         */
        maxFiles?: number;
        /**
         * The upload context options around how/where to upload and size limits.
         */
        uploadContext: UploadContext | KnockoutObservableBase<UploadContext>;
        /**
         * The user selected files via browse dialog is surfaced as SelectedFile in the selectedFiles array.
         * For scenarios where selected files should automatically be associated with an UploadTask, set this value to true.
         * If this option is set to false, the extension author is responsible for explicitly adding the selectedFile to uploadTasks by invoking
         * the addUploadTasks() method on view model to create an UploadTask representation and have it available in uploadTasks array.
         * By default, this option is set to true.
         */
        autoAddUploadTasks?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * FileUpload control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
         * Each time user clicks on the browse dialog, user can choose one or multiple files and each selected file is represented as SelectedFile on the extension iframe.
         * The selected files are surfaced in the selectedFiles array.
         * The array will be cleared if user chooses to click browse dialog to pick a different set of files.
         * Setting the value property null or calling resetUploadTasks() will clear the array.
         */
        readonly selectedFiles: KnockoutReadOnlyObservableArray<SelectedFileContract>;
        /**
         * Observable array holds all the current file upload tasks. Each task represent the file details, status, upload progress etc.
         * UploadTask is used to initiate the file upload, pause/resume uploads, cancel and dispose the file upload.
         */
        readonly uploadTasks: KnockoutReadOnlyObservableArray<AsyncUploadTaskContract>;
        /**
         * A comma-separated list of allowed file mime-types, excluding extensions.
         * This maps directly to the HTML accept attribute for file input controls and filters the file based on specified mime-types in the file browse dialog.
         * The file filtering  behavior depends on native browser support.
         */
        readonly accept: KnockoutObservableBase<string>;
        /**
         * A comma-separated list of allowed file extensions.
         * This is upload control specific validations that will validate if the selected file is in the allowed file extension list.
         * If the selected file is not in the extension list, a validation error will be flagged and the selected file will be marked as invalid.
         * Eg: "pfx,cer"
         */
        readonly allowedFileExtensions: KnockoutObservableBase<string>;
        /**
         * The upload context options around how/where to upload and size limits.
         */
        readonly uploadContext: KnockoutObservableBase<UploadContext>;
        /**
         * The text shown when no value is set in the control.
         */
        readonly placeHolderText: KnockoutObservable<string>;
    }
    /**
     * Creates a FileUpload control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a file upload control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\FormBase.d.ts
declare module "Fx/Controls/FormBase" {
    import { Validation, ValidationResult } from "Fx/Controls/Validations";
    /**
     * Base Properties on all form controls
     */
    export interface Contract {
        /**
         * The dirty state of the control.  This will only change when the user performs an action to change the value, or the dirty state is set explicitly by the extension.
         */
        readonly dirty: KnockoutObservableBase<boolean>;
        /**
         * The validation state of the control.
         */
        readonly valid: KnockoutReadOnlyObservableBase<boolean>;
        /**
         * The visible state of the control.
         */
        readonly visible: KnockoutReadOnlyObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        readonly cssClass: KnockoutReadOnlyObservableBase<string>;
        /**
         * The label of the control
         */
        readonly label: KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        readonly subLabel: KnockoutObservable<string>;
        /**
         * The aria-label on the control.
         */
        readonly ariaLabel: KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        readonly validations: KnockoutObservableArray<Validation>;
        /**
         * Latest validation results.
         */
        readonly validationResults: KnockoutReadOnlyObservableArray<ValidationResult>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        readonly infoBalloonContent: KnockoutObservable<string>;
        /**
         * The disabled state of the control.
         */
        readonly disabled: KnockoutObservableBase<boolean>;
        /**
         * Triggers validation on this control when called.  Returns a promise that resolves once validation on this control has completed.
         */
        readonly triggerValidation: () => Q.Promise<void>;
    }
    export const enum ValueUpdateTrigger {
        /**
         * (default) Trigger value update when the control widget value changes
         */
        Input = 4,
        /**
         * Trigger value update on blur.
         */
        Blur = 3,
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\HotSpot.d.ts
declare module "Fx/Controls/HotSpot" {
    import Selectable = require("Fx/Composition/Selectable");
    export = Main;
    module Main {
        import BaseViewModel = MsPortalFx.ViewModels.Controls.HotSpot.BaseViewModel;
        /**
         * Hotspot options.
         */
        interface ViewModelOptions {
            /**
             * A function to be called when the hotspot is clicked.
             */
            onClick?: () => void;
            /**
             * Whether to activate the hotspot during customize or not.
             */
            clickableDuringCustomize?: boolean;
            /**
             * Disabled state of the hotspot.
             */
            disabled?: KnockoutObservable<boolean>;
        }
        /**
         * View model for hotspots.
         */
        class ViewModel extends BaseViewModel {
            private _msPortalFxOnClick;
            /**
             * Creates a HotSpot ViewModel.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: ViewModelOptions);
        }
        class ViewModel2 extends FxImpl.Controls.HotSpot.ViewModel2 {
            /**
             * Creates a HotSpot ViewModel.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, selectableOptions?: Selectable.Selectable2Options<any>, clickableDuringCustomize?: boolean);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Legend.d.ts
declare module "Fx/Controls/Legend" {
    export = Main;
    module Main {
        /**
         * Defines hatching patterns.
         */
        enum Pattern {
            /**
             * The area is solid.
             */
            Solid = 0,
            /**
             * The area is cross hatched.
             */
            CrossHatching = 1,
            /**
             * The area is diagonal hatched.
             */
            DiagonalHatching = 2,
            /**
             * The area is hatched horizontally.
             */
            DottedHatching = 3,
        }
        /**
         * Options for Legend ViewModel.
         */
        interface Options {
            /**
             * Data being displayed.
             */
            data?: KnockoutObservableArray<any>;
            /**
             * Data key used to identify the row index. Leave unset to use the index within data.
             */
            indexKey?: string;
            /**
             * Data key used to identify the color.
             */
            colorKey: string;
            /**
             * Data key of the hatching pattern.
             */
            hatchingKey?: string;
            /**
             * Data key used to identify the boolean column indicating if the row is selected.
             */
            selectedKey?: string;
            /**
             * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
             */
            labelKey: string;
            /**
             * Index of current hovered row in the legend.
             */
            hoveredIndex?: KnockoutObservable<string>;
            /**
             * Aria label for the legend.
             */
            ariaLabel?: string | KnockoutObservableBase<string>;
        }
        class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel {
            /**
             * Data being displayed.
             */
            data: KnockoutObservableArray<any>;
            /**
             * Data key used to identify the row index. Leave unset to use the index within data.
             */
            indexKey: string;
            /**
             * Data key used to identify the color.
             */
            colorKey: string;
            /**
             * Data key of the hatching pattern.
             */
            hatchingKey: string;
            /**
             * Data key used to identify the boolean column indicating if the row is selected.
             */
            selectedKey: string;
            /**
             * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
             */
            labelKey: string;
            /**
             * Index of current hovered row in the legend.
             */
            hoveredIndex: KnockoutObservable<string>;
            /**
             * Aria label for the legend.
             */
            readonly ariaLabel: KnockoutObservableBase<string>;
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\LocationDropDown.d.ts
declare module "Fx/Controls/LocationDropDown" {
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { Location, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        /**
         * The contract for the values returned by the location dropdown
         */
        export import Location = MsPortalFx.Azure.Location;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<Location>;
        /**
         * The contract for options to create the location drop down
         */
        type Options = Location.Options;
        /**
         * The contract for the location dropdown
         */
        interface Contract extends Location.Contract {
        }
        /**
         * This creates a location dropdown control.
         * @param container The container associated with the part or blade.
         * @param options The location dropdown options. See interface
         */
        function create(container: AnyBladeContainer, options?: Options): Contract;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Menu.d.ts
declare module "Fx/Controls/Menu" {
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import FxControls = FxViewModels.Controls;
        /**
         * Attributes common to all items and groups in the menu.
         */
        interface MenuItemBase extends FxImpl.Controls.Menu.MenuItemBase {
        }
        /**
         * Defines an item in a group of the menu.
         */
        interface MenuItem extends FxImpl.Controls.Menu.MenuItem {
        }
        /**
         * Defines a group in the menu.
         */
        interface MenuGroup extends FxImpl.Controls.Menu.MenuGroup {
        }
        /**
         * The options for the menu.
         */
        interface Options extends FxImpl.Controls.Menu.Options {
        }
        /**
         * The sort order used for groups in the menu.
         */
        export import SortOrder = MsPortalFx.ViewModels.Controls.Lists.Grid.SortOrder;
        /**
         * The sort functions used to sort groups in the menu.
         */
        enum SortFunction {
            /**
             * Uses the built-in Array.sort() function.
             */
            Default = 0,
            /**
             * Uses the getTime() value of Date object to sort.
             */
            DateTime = 1,
            /**
             * Uses custom sorting, that ensures that the support group is prioritized over others.
             */
            SupportFirst = 9999,
        }
        /**
         * Defines the view model for the menu control.
         */
        class ViewModel extends FxControls.Base.ViewModel {
            /**
             * The groups of menu items.
             */
            groups: KnockoutObservableArray<MenuGroup>;
            /**
             * Specifies the sort order used for groups in the menu.
             */
            groupSortOrder: SortOrder;
            /**
             * Specifies the sort function used to order groups in the menu.
             */
            groupSortFunction: SortFunction;
            /**
             * A value indicating whether or not to show the search box.
             */
            showSearch: boolean;
            private _msPortalFxData;
            constructor(lifetime: MsPortalFx.Base.LifetimeManager, groupSortFunction?: SortFunction);
            /**
             * Sets the options for the menu.
             *
             * @param options The options to configure the menu.
             */
            setOptions: (options: Options) => void;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\MonitorChart.d.ts
declare module "Fx/Controls/MonitorChart" {
    import * as FxCompositionBlade from "Fx/Composition/Blade";
    import * as FxCompositionPdlBlade from "Fx/Composition/Pdl/Blade";
    import * as FxCompositionPart from "Fx/Composition/Part";
    import * as FxCompositionTemplate from "Fx/Composition/TemplateBlade";
    import BladeContainer = FxCompositionBlade.Container;
    import PdlBladeContainer = FxCompositionPdlBlade.Container;
    import PartContainer = FxCompositionPart.Container;
    import TemplateContainer = FxCompositionTemplate.Container;
    /**
     * Defines how data points are aggregated for a metric.
     */
    export const enum AggregationType {
        /**
         * No aggregation is done.
         */
        None = 0,
        /**
         * Data points are aggregated by taking the average of their values.
         */
        Average = 1,
        /**
         * Data points are aggregated by taking the min of their values.
         */
        Minimum = 2,
        /**
         * Data points are aggregated by taking the max of their values.
         */
        Maximum = 3,
        /**
         * Data points are aggregated by taking the total of their values.
         */
        Total = 4,
    }
    /**
     * Defines what visualization to use when rendering the chart.
     */
    export const enum ChartType {
        /**
         * Line chart.
         */
        Line = 0,
        /**
         * Bar chart.
         */
        Bar = 1,
    }
    /**
     * Defines the unit of a metric.
     */
    export const enum Unit {
        /**
         * Count unit.
         */
        Count = 0,
        /**
         * Bytes unit.
         */
        Bytes = 1,
        /**
         * Seconds unit.
         */
        Seconds = 2,
        /**
         * CountPerSecond unit.
         */
        CountPerSecond = 3,
        /**
         * BytesPerSecond unit.
         */
        BytesPerSecond = 4,
        /**
         * Percent unit.
         */
        Percent = 5,
        /**
         * MilliSeconds unit.
         */
        MilliSeconds = 6,
        /**
         * ByteSeconds unit.
         */
        ByteSeconds = 7,
    }
    /**
     * Defines the timespan over which data points are fetched and plotted.
     */
    export interface Timespan {
        /**
         * A relative timespan indicates that data points are plotted for a moving timespan, whose
         * end time is always now().
         */
        relative?: {
            /**
             * Length of time over which metrics are plotted.
             */
            durationMs: number;
        };
        /**
         * An absolute timespan indicates that data points are plotted for a fixed timespan.
         */
        absolute?: {
            /**
             * The start time of the timespan.
             */
            start: Date;
            /**
             * The end time of the timespan.
             */
            end: Date;
        };
        /**
         * How frequently the data points shown on the chart should be updated.
         */
        refreshIntervalMs?: number;
    }
    export interface ResourceMetadata {
        /**
         * The resource id of the resource.
         */
        resourceId: string;
        /**
         * The kind of the resource.
         */
        kind?: string;
        /**
         * The sku of the resource.
         */
        sku?: {
            /**
             * The sku name.
             */
            name?: string;
            /**
             * The sku tier.
             */
            tier?: string;
            /**
             * The sku size.
             */
            size?: string;
            /**
             * The sku family.
             */
            family?: string;
            /**
             * The sku model.
             */
            model?: string;
            /**
             * The sku capacity.
             */
            capacity?: string;
        };
        /**
         * Additional properties for the resource.
         */
        properties?: any;
    }
    export interface Metric {
        /**
         * Resource information about the resource to which this metric belongs.
         */
        resourceMetadata: ResourceMetadata;
        /**
         * The non-localized metric name.
         */
        name: string;
        /**
         * The aggregation type to use for this metric.
         */
        aggregationType?: AggregationType;
        /**
         * The time grain to use for this metric.
         */
        timeGrainMs?: number;
        /**
         * The unit of this metric.
         */
        unit?: Unit;
        /**
         * The type of this metric.
         *
         * This propery should be used when dealing with resource types that have subcontainers (e.g. Storage Accounts or Virtual Machines).
         */
        type?: string;
        /**
         * Css class to apply to this metric series.
         *
         * This css class should be one of the built in msportalfx-bgcolor-* colors.
         *
         * @see https://github.com/Azure/portaldocs/blob/334634c8a7601f729c4ee6fa673eb00d25045c60/portal-sdk/generated/portalfx-style-guide-color-palette.md#coloring-to-differentiate-data
         * @see https://df.onecloud.azure-test.net/?SamplesExtension=true#blade/SamplesExtension/SDKMenuBlade/styleguidecolorpalettetitle
         */
        cssClass?: string;
    }
    export interface ChartDefinition {
        /**
         * The metrics to plot on this chart.
         */
        metrics: Metric[];
        /**
         * The visualization to use for this chart.
         *
         * Defaults to line chart.
         */
        chartType?: ChartType;
        /**
         * The timespan to use for this chart.
         *
         * Note: This overrides the top-level timespan provided in the Options object.
         */
        timespan?: Timespan;
        /**
         * The title of this chart.
         *
         * Defaults to a string generated from the metrics plotted on this chart.
         */
        title?: string;
        /**
         * The subtitle of this chart.
         *
         * Defaults to a string generated from the resources plotted on this chart.
         */
        subtitle?: string;
        /**
         * Message to display if no data can be loaded for this chart.
         */
        noDataMessage?: string;
        /**
         * Disables pinning for this chart.
         */
        disablePinning?: boolean;
        /**
         * Callback that's executed when the user clicks this chart while
         * the chart is functioning normally.
         *
         * Defaults to opening the Metrics blade.
         */
        onClick?: () => void;
        /**
         * Css class to apply to this chart.
         *
         * Multiple css classes can be added by separating them with a space.
         */
        cssClass?: string;
    }
    /**
     * MonitorChart options.
     */
    export interface Options {
        /**
         * The charts to render.
         */
        charts?: ChartDefinition[] | KnockoutObservableArray<ChartDefinition>;
        /**
         * The timespan used for all charts, unless overriden in an individual chart.
         *
         * Defaults to relative duration of 24 hours.
         */
        timespan?: Timespan | KnockoutObservable<Timespan>;
    }
    /**
     * MonitorChart control.
     */
    export interface Contract {
        /**
         * The charts rendered.
         */
        readonly charts: KnockoutObservableArray<ChartDefinition>;
        /**
         * The timespan used for all charts, unless overriden in an individual chart.
         */
        readonly timespan: KnockoutObservableBase<Timespan>;
    }
    /**
     * Creates a MonitorChart viewmodel.
     *
     * @param lifetime The lifetime of the control. This must be a container object.
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a MonitorChart viewmodel.
     */
    export function create(container: BladeContainer | PartContainer | PdlBladeContainer | TemplateContainer, options?: Options): Contract;
    export module Internal {
        interface BladeManagementApiContainer extends MsPortalFx.ViewModels.BladeManagement, MsPortalFx.Base.LifetimeManager {
        }
        /**
         * Internal viewmodel used for monitor charts.
         */
        class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
            /**
             * Charts property that stores the charts array provided by the consumer of this control and
             * is **not** proxied across to the widget.
             *
             * This is to prevent the Javascript array provided by the consumer from being frozen
             * by the PO layer.
             */
            charts: KnockoutObservableArray<ChartDefinition>;
            /**
             * Charts property that mirrors the charts property and **is proxied** to the widget.
             */
            _msPortalFxCharts: KnockoutObservableBase<ChartDefinition[]>;
            /**
             * Timespan property that stores the timespan provided by the consumer of this control and
             * is **not** proxied across to the widget.
             *
             * This is to prevent the Javascript array provided by the consumer from being frozen
             * by the PO layer.
             */
            timespan: KnockoutObservableBase<Timespan>;
            /**
             * Timespan property that mirrors the timespan property and **is proxied** to the widget.
             */
            _msPortalFxTimespan: KnockoutObservableBase<Timespan>;
            private _container;
            constructor(container: BladeManagementApiContainer, options?: Options);
            /**
             * Allows the MonitorChart widget to open a blade when it's clicked.
             *
             * This openBlade api exists in the ViewModel because the widget does not have the container context on
             * which this control resides (which is important so the shell knows whether to open a blade in a journey
             * or to start a new journey).
             */
            openBlade(bladeReference: FxImpl.Composition.Selectable.BladeReference<any>, options?: MsPortalFx.ViewModels.OpenBladeOptions): Q.Promise<boolean>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\MultiLineTextBox.d.ts
declare module "Fx/Controls/MultiLineTextBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import ValueUpdateTrigger = Base.ValueUpdateTrigger;
    /**
     * Options for configuring a multiline textbox control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The text shown when no value is set in the control.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * the number of lines in the control.
         */
        rows?: number | KnockoutObservable<number>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * Controls when the control will update it's value in response to the user typing into it.
         */
        valueUpdateTrigger?: ValueUpdateTrigger;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: string | KnockoutObservableBase<string>;
        /**
         * Aria label for the textbox.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * Multiline textbox control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
         * The text shown when no value is set in the control.
         */
        readonly placeHolderText: KnockoutObservable<string>;
        /**
         * the number of lines in the control.
         */
        readonly rows: KnockoutObservable<number>;
    }
    /**
     * Creates a mulitline textbox control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a multiline textbox control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\NumericTextBox.d.ts
declare module "Fx/Controls/NumericTextBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import ValueUpdateTrigger = Base.ValueUpdateTrigger;
    /**
     * Options for configuring a numeric textbox control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The text shown when no value is set in the control.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * Minimum number allowed.
         */
        min?: number | KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max?: number | KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint?: number | KnockoutObservable<number>;
        /**
         * Text to display when entered text is not numeric.
         */
        notANumberErrorMessage?: string;
        /**
         * Specifies whether an empty value should be allowed or if it should be replaced with a 0 value.  Defaults to false.
         */
        allowEmpty?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * Controls when the control will update it's value in response to the user typing into it.
         */
        valueUpdateTrigger?: ValueUpdateTrigger;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: number | KnockoutObservableBase<number>;
        /**
         * Aria label for the textbox.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * Numeric TextBox control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<number>;
        /**
         * Minimum number allowed.
         */
        readonly min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        readonly max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        readonly decimalPoint: KnockoutObservable<number>;
    }
    /**
     * Creates a Numeric TextBox control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a numeric textbox control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\OptionsGroup.d.ts
declare module "Fx/Controls/OptionsGroup" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export interface Item<TValue> {
        text: string;
        value: TValue;
        disabled?: KnockoutObservableBase<boolean>;
        /**
         * Optional alternate text for screen readers if the text is not explicit enough.
         */
        ariaLabel?: KnockoutObservableBase<string>;
    }
    /**
     * Options for configuring a options group control
     */
    export interface Options<TValue> {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * If true, sets each item to equal width and the total size of the control to the size of the element.
         * Otherwise, sets the width of each item in the options group to the size of the content. Defaults to false.
         */
        uniformItemWidth?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The list of items of the options group
         */
        items?: Array<Item<TValue>> | KnockoutObservableArray<Item<TValue>>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: TValue | KnockoutObservableBase<TValue>;
        /**
         * Optional alternate text for screen readers.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * ItemPicker control view model
     */
    export interface Contract<TValue> extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<TValue>;
        /**
         * The list of items of the options group
         */
        readonly items: KnockoutObservableArray<Item<TValue>>;
    }
    /**
     * Creates a options group control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns an options group control viewmodel
     */
    export function create<TValue>(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options<TValue>): Contract<TValue>;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\PairedTimeline.d.ts
declare module "Fx/Controls/PairedTimeline" {
    export = Main;
    import * as PairedTimelineBadges from "Fx/Controls/PairedTimelineBadges";
    import * as RangeSelection from "Fx/Controls/RangeSelection";
    module Main {
        import Controls = MsPortalFx.ViewModels.Controls;
        import Visualization = Controls.Visualization;
        import Chart = Visualization.Chart;
        import Metrics = Visualization.Metrics;
        import ListView = Controls.Lists.ListView;
        import Loadable = Controls.Loadable;
        /**
            * Contract container for the Chart and Metrics controls
            */
        interface PairedTimelineChartContract<TX, TY> extends Loadable.Contract {
            /**
                * Identifier of chart
                */
            id: string;
            /**
                * Chart control contract
                */
            chart: Chart.Contract<TX, TY>;
            /**
                * Chart height in number of units(integer). Each unit is 45 px.
                */
            chartHeight: KnockoutObservableBase<number>;
            /**
                * The message to display when chart is un-configured or there is no chart data.
                */
            noDataMessage: KnockoutObservableBase<string>;
            /**
                * CSS class to be applied to the List View item
                */
            cssClass: KnockoutObservableBase<string>;
            /**
                * Selectable for the buttons in the PT
                */
            buttonSelectables: MsPortalFx.ViewModels.Selectable<string>[];
            /**
                * The title for the chart.
                */
            title: KnockoutObservableBase<string>;
            /**
                * Whether or not the title is shown.
                */
            showTitle: KnockoutObservableBase<boolean>;
        }
        /**
            * Container for the Chart and Metrics controls
            */
        class PairedTimelineChart<TX, TY> extends Loadable.ViewModel implements PairedTimelineChartContract<TX, TY> {
            /**
                * Identifier of chart
                */
            id: string;
            /**
                * Chart control
                */
            chart: Chart.ViewModel<TX, TY>;
            /**
                * Chart height in number of units(integer). Each unit is 45 px.
                */
            chartHeight: KnockoutObservableBase<number>;
            /**
                * The message to display when the chart is un-configured or there is no chart data.
                */
            noDataMessage: KnockoutObservableBase<string>;
            /**
                * CSS class to be applied to the List View item
                */
            cssClass: KnockoutObservableBase<string>;
            /**
                * Selectable for the buttons in the PT
                */
            buttonSelectables: MsPortalFx.ViewModels.Selectable<string>[];
            /**
                * The title for the chart.
                */
            title: KnockoutObservableBase<string>;
            /**
                * Whether or not the title is shown.
                * Title will only be shown for >1 chart height charts.
                */
            showTitle: KnockoutObservableBase<boolean>;
            /**
                * Creates a paired timeline.
                *
                * @param lifetimeManager Lifetime manager for this view model.
                * @param id Id of this view model.
                */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, id: string);
            dispose(): void;
        }
        const enum PairedTimelineButtonVisibilityOptions {
            ShowOnHover = 1,
            AlwaysShow = 2,
        }
        interface PairedTimelineButtonOptions {
            /**
                * Whether the Edit buttons should be shown.
                */
            enabled: KnockoutObservable<boolean>;
            /**
                * Text to use for the edit button, default is "Edit"
                */
            text: KnockoutObservable<string>;
            /**
                * Controls the visibility of the buttons. (always vs onhover)
                */
            visibility: KnockoutObservable<PairedTimelineButtonVisibilityOptions>;
        }
        interface Contract<TX, TY> extends Loadable.Contract {
            /**
                * The collection of Paired Timeline charts.
                */
            ptCharts: KnockoutObservableArray<PairedTimelineChart<TX, TY>>;
            /**
                * Options used to configure the loaded plugins for selection.
                * Updating this property after the widget is initialized will have no effect.
            * A null or undefined value disables selection.
            */
            extensionOptions: ListView.ExtensionOptions;
            /**
                * Enable metrics rules.
                */
            enableMetricsRules: KnockoutObservableBase<boolean>;
            /**
                * Metrics options
                */
            metricsOptions: Metrics.VisualContract;
            /**
                * Enables sliders to select a range on the x axis.
                */
            enableRangeSelection: KnockoutObservableBase<boolean>;
            /**
                * Range selection view model.
                */
            rangeSelectionViewModel: RangeSelection.ViewModel<TX>;
            /**
                * Options for the buttons defined in the PT.
                */
            buttonOptions: PairedTimelineButtonOptions[];
            /**
                * Badges View model
                */
            badgesViewModel: PairedTimelineBadges.ViewModel<TX>;
        }
        class ViewModel<TX, TY> extends Loadable.ViewModel implements Contract<TX, TY> {
            /**
                * The collection of Paired Timeline charts.
                */
            ptCharts: KnockoutObservableArray<PairedTimelineChart<TX, TY>>;
            /**
                * Options used to configure the loaded plugins for selection.
                * Updating this property after the widget is initialized will have no effect.
                */
            extensionOptions: ListView.ExtensionOptions;
            /**
                * Enable Metrics Rules
                */
            enableMetricsRules: KnockoutObservableBase<boolean>;
            /**
                * MetricsOptions
                */
            metricsOptions: Metrics.VisualContract;
            /**
                * Enables sliders to select a range on the x axis.
                */
            enableRangeSelection: KnockoutObservableBase<boolean>;
            /**
                * Range selection view model.
                */
            rangeSelectionViewModel: RangeSelection.ViewModel<TX>;
            /**
                * Badges View model
                */
            badgesViewModel: PairedTimelineBadges.ViewModel<TX>;
            /**
                * Options for the buttons defined in the PT.
                */
            buttonOptions: PairedTimelineButtonOptions[];
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, ptCharts: KnockoutObservableArray<PairedTimelineChart<TX, TY>>, extensionOptions: ListView.ExtensionOptions, rangeSelectionOptions?: RangeSelection.Options<TX>, pairedTimelineBadgesOptions?: PairedTimelineBadges.Options<TX>);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\PairedTimelineBadges.d.ts
declare module "Fx/Controls/PairedTimelineBadges" {
    export = Main;
    module Main {
        import DockedBalloon = MsPortalFx.ViewModels.Controls.DockedBalloon;
        import FxViewModelsControlsBase = MsPortalFx.ViewModels.Controls.Base;
        /**
            * Contract for an individual displayable badge.
            */
        interface BadgeContract<TX> {
            /**
                * Badge Identifier
                */
            id: string;
            /**
                * Unique class name for this badge.
                */
            className: KnockoutObservableBase<string>;
            /**
                * The badge text
                */
            text: string;
            /**
                * The x value corresponding to the event this badge is reporting.
                */
            xValue: TX;
            /**
                * The coordinate where the badge is rendered.
                */
            coordinate?: KnockoutObservableBase<number>;
            /**
                * The icon to display for the badge.
                */
            icon: KnockoutObservableBase<MsPortalFx.Base.Image>;
            /**
                * Whether the badge is displayed.
                */
            visible?: KnockoutObservableBase<boolean>;
        }
        /**
            * Class for an individual Badge.
            */
        class Badge<TX> extends FxViewModelsControlsBase.ViewModel implements BadgeContract<TX> {
            /**
                * Badge Identifier
                */
            id: string;
            /**
                * Unique class name for this badge.
                */
            className: KnockoutObservableBase<string>;
            /**
                * The badge text
                */
            text: string;
            /**
                * The x value corresponding to the event this badge is reporting.
                */
            xValue: TX;
            /**
                * The icon to display for the badge.
                */
            icon: KnockoutObservableBase<MsPortalFx.Base.Image>;
            /**
                * Whether the badge is displayed.
                */
            visible: KnockoutObservableBase<boolean>;
            /**
                * The coordinate where the badge is rendered.
                */
            coordinate: KnockoutObservableBase<number>;
            /**
                * Creates a paired timeline.
                *
                * @param lifetimeManager Lifetime manager for this view model.
                * @param id Id of this view model.
                */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: BadgeContract<TX>);
        }
        interface Options<TX> {
            /**
                * The collection of badges
                */
            badges: KnockoutObservableArray<BadgeContract<TX>>;
            /**
                * Height of the badges when displayed on the paired timeline
                */
            height: KnockoutObservableBase<number>;
            /**
                * Balloon for displaying badge information.
                */
            balloon: KnockoutObservableBase<DockedBalloon.ViewModel>;
            /**
                * Enables badges that will be displayed at top of paired timeline
                */
            visible: KnockoutObservableBase<boolean>;
        }
        class ViewModel<TX> extends FxViewModelsControlsBase.ViewModel {
            /**
                * The collection of badges
                */
            badges: KnockoutObservableArray<BadgeContract<TX>>;
            /**
                * Height of the badges when displayed on the paired timeline
                */
            height: KnockoutObservableBase<number>;
            /**
                * Balloon for displaying badge information.
                */
            balloon: KnockoutObservableBase<DockedBalloon.ViewModel>;
            /**
                * Enables badges that will be displayed at top of paired timeline
                */
            visible: KnockoutObservableBase<boolean>;
            /**
                * An optional selectableSet to make the badges selectable
            */
            selectableSet: KnockoutObservableBase<MsPortalFx.ViewModels.SelectableSet<any, any>>;
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options<TX>);
            /**
                * Set the viewmodel's array of badges to the incoming badges. Optionally set up a selectableSet on these badges with the given callbacks.
                */
            pushAllBadges(newBadges: BadgeContract<TX>[], useSelectableSet?: boolean, itemMatchesSelection?: (item: BadgeContract<TX>, selection: any) => boolean, createSelection?: (item: BadgeContract<TX>) => any): void;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\PasswordBox.d.ts
declare module "Fx/Controls/PasswordBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a password textbox control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The text shown when no value is set in the control.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: string | KnockoutObservableBase<string>;
        /**
         * Shows validation as a popup.
         */
        showValidationsAsPopup?: boolean;
        /**
         * Aria label for the control.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * Password box control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
         * The text shown when no value is set in the control.
         */
        readonly placeHolderText: KnockoutObservable<string>;
    }
    /**
     * Creates a password box control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a password box control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\RadioButtons.d.ts
declare module "Fx/Controls/RadioButtons" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export interface Item<TValue> {
        text: string;
        value: TValue;
        disabled?: KnockoutObservableBase<boolean>;
        /**
         * Optional alternate text for screen readers if the text is not explicit enough.
         */
        ariaLabel?: KnockoutObservableBase<string>;
    }
    /**
     * Options for configuring a radio button control
     */
    export interface Options<TValue> {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * If set, each button will each appear on their own line.  Defaults to false.
         */
        singleItemPerLine?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The list of items of the radio buttons
         */
        items?: Array<Item<TValue>> | KnockoutObservableArray<Item<TValue>>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: TValue | KnockoutObservableBase<TValue>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
        /**
         * Optional alternate text for screen readers.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
    }
    /**
     * RadioButtons control view model
     */
    export interface Contract<TValue> extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<TValue>;
        /**
         * The list of items of the radio button
         */
        readonly items: KnockoutObservableArray<Item<TValue>>;
    }
    /**
     * Creates a radio buttons control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a radio buttons control viewmodel
     */
    export function create<TValue>(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options<TValue>): Contract<TValue>;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\RangeSelection.d.ts
declare module "Fx/Controls/RangeSelection" {
    export = Main;
    module Main {
        import FxControls = MsPortalFx.ViewModels.Controls;
        const enum LabelPosition {
            /**
                * Range selection labels will be oriented on the inside of the selection range
                */
            Inside = 0,
            /**
                * Range selection labels will be oriented on the outside of the selection range
                */
            Outside = 1,
        }
        interface Range<T> {
            /**
                * The beginning of the range selection.  May be null to indicate open beginning of range.
                */
            start: T;
            /**
                * The end of the range selection.  May be null to indicate open ended range.
                */
            end: T;
        }
        interface Options<T> {
            /**
                * Specifies position of range selection labels.
                */
            labelPosition?: KnockoutObservableBase<LabelPosition>;
            /**
                * The range selected if enableRangeSelection was enabled.
                */
            rangeSelection?: KnockoutObservableBase<Range<T>>;
        }
        class ViewModel<T> extends FxControls.Base.ViewModel {
            /**
                * Specifies position of range selection labels.
                */
            labelPosition: KnockoutObservableBase<LabelPosition>;
            /**
                * The range selected if enableRangeSelection was enabled.
                */
            rangeSelection: KnockoutObservableBase<Range<T>>;
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options<T>);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\RangeSlider.d.ts
declare module "Fx/Controls/RangeSlider" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a range slider control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The aria label of the control, for screen reader
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * Sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
        * Minimum value of the range slider.
        */
        min?: number | KnockoutObservableBase<number>;
        /**
         * Maximum value of the range slider.
         */
        max?: number | KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the range slider takes between min and max.
         */
        step?: number | KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers?: boolean | KnockoutObservableBase<boolean>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservable<string>;
    }
    /**
     * RangeSlider control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
        * Start value of the range.
        */
        readonly start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        readonly end: KnockoutObservableBase<number>;
        /**
         * Minimum value of the range slider.
         */
        readonly min: KnockoutObservableBase<number>;
        /**
         * Maximum value of the range slider.
         */
        readonly max: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the range slider takes between min and max.
         */
        readonly step: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        readonly showStepMarkers: KnockoutObservableBase<boolean>;
    }
    /**
     * Options for configuring the range slider control
     */
    export interface CustomValueOptions {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The aria label of the control, for screen reader
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Validations on the control.
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * Sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers?: boolean | KnockoutObservableBase<boolean>;
        /**
         * Custom range slider clickstop values.
         */
        customValues: Array<number> | KnockoutObservableBase<Array<number>>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * CustomRangeSlider control view model
     */
    export interface CustomValueContract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
         * Displays a marker for each step.
         */
        readonly showStepMarkers: KnockoutObservableBase<boolean>;
        /**
         * Custom slider clickstop values.
         */
        readonly customValues: KnockoutObservableBase<number[]>;
    }
    /**
     * Creates a range slider control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a range slider control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
    /**
     * Creates a range slider control viewmodel with custom values.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a range slider control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options: CustomValueOptions): CustomValueContract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\ResourceGroupDropDown.d.ts
declare module "Fx/Controls/ResourceGroupDropDown" {
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { ResourceGroup, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        /**
         * The modes possible for the dropdown
         */
        export import Mode = ResourceGroup.Mode;
        /**
         * The mode of the value returned by the control
         */
        export import SelectedMode = ResourceGroup.SelectedMode;
        /**
         * The contract for the values returned by the resource group dropdown
         * It contains the ARM Value and a flag for if you are in create mode
         */
        export import Value = ResourceGroup.Value;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<Value>;
        /**
         * The contract for options to create the resource group drop down
         */
        type Options = ResourceGroup.Options;
        /**
         * The contract for the resource group dropdown
         */
        interface Contract extends ResourceGroup.Contract {
        }
        /**
         * This creates a resource group dropdown control.
         * @param container The container associated with the part or blade.
         * @param options The resource group dropdown options. See interface
         */
        function create(container: AnyBladeContainer, options?: Options): Contract;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Section.d.ts
declare module "Fx/Controls/Section" {
    /**
     * Options for configuring a form section
     */
    export interface Options {
        /**
         * The name of the section.  This will be displayed as a tab header if the section is inside a tab control.
         */
        name?: string;
        /**
         * The sections & controls to nest within the section.
         */
        children?: any[];
        /**
         * The minimum height of the section in pixels.  Use this to reduce jumpiness in forms.
         */
        minHeight?: number;
        /**
         * Labels will appear to the left of child controls when this is set to true.
         */
        leftLabelPosition?: boolean;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
    }
    /**
     * Section view model
     */
    export interface Contract {
        /**
         * The sections & controls to nest within the section.
         */
        readonly children: KnockoutObservableArray<any>;
    }
    /**
     * Creates a section view model
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Slider.d.ts
declare module "Fx/Controls/Slider" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options for configuring a slider control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The aria label of the control, for screen reader
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
        * Minimum value of the slider.
        */
        min?: number | KnockoutObservableBase<number>;
        /**
         * Maximum value of the slider.
         */
        max?: number | KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step?: number | KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers?: boolean | KnockoutObservableBase<boolean>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: number | KnockoutObservableBase<number>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservable<string>;
    }
    /**
     * Slider control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<number>;
        /**
         * Minimum value of the range slider.
         */
        readonly min: KnockoutObservableBase<number>;
        /**
         * Maximum value of the range slider.
         */
        readonly max: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the range slider takes between min and max.
         */
        readonly step: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        readonly showStepMarkers: KnockoutObservableBase<boolean>;
    }
    /**
     * Options for configuring the slider control
     */
    export interface CustomValueOptions {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The aria label of the control, for screen reader
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers?: boolean | KnockoutObservableBase<boolean>;
        /**
         * Custom slider clickstop values.
         */
        customValues: number[] | KnockoutObservableBase<number[]>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: number | KnockoutObservableBase<number>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    export interface CustomValueContract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        readonly showStepMarkers: KnockoutObservableBase<boolean>;
        /**
         * Custom slider clickstop values.
         */
        readonly customValues: KnockoutObservableBase<number[]>;
    }
    /**
     * Creates a slider control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a slider control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
    /**
     * Creates a slider control viewmodel with custom values.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a slider control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options: CustomValueOptions): CustomValueContract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\SubscriptionDropDown.d.ts
declare module "Fx/Controls/SubscriptionDropDown" {
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { Subscription, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        /**
         * The contract for the values returned by the subscription dropdown
         */
        export import Subscription = MsPortalFx.Azure.Subscription;
        /**
         * The contract for options to create the subscription drop down
         */
        type Options = Subscription.Options;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<Subscription>;
        /**
         * The contract for the subscription dropdown
         */
        interface Contract extends Subscription.Contract {
        }
        /**
         * This creates a subscription dropdown control.
         * @param container The container associated with the part or blade.
         * @param options The subscription dropdown options. See interface
         */
        function create(container: AnyBladeContainer, options?: Options): Contract;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\TabControl.d.ts
declare module "Fx/Controls/TabControl" {
    import { Contract as SectionContract } from "Fx/Controls/Section";
    /**
     * Options for configuring a tab control
     */
    export interface Options {
        /**
         * The section view models containing the contents of each tab.
         */
        tabs?: SectionContract[];
        /**
         * A custom css class to apply to the tab control.
         */
        cssClass?: string;
        /**
         * The minimum height of the tab control in pixels.  Use this to reduce jumpiness in forms.
         */
        minHeight?: number;
    }
    /**
     * Tab control view model
     */
    export interface Contract {
        /**
         * The section view models containing the contents of each tab.
         */
        readonly tabs: KnockoutObservableArray<SectionContract>;
        /**
         * Gets and sets the currently active tab.
         */
        readonly activeTab: KnockoutObservableBase<SectionContract>;
    }
    /**
     * Creates a tab control view model
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\TextBox.d.ts
declare module "Fx/Controls/TextBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import ValueUpdateTrigger = Base.ValueUpdateTrigger;
    /**
     * Options for configuring a textbox control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The text shown when no value is set in the control.
         */
        placeHolderText?: string | KnockoutObservable<string>;
        /**
         * When set, the textbox will be read only.
         */
        readonly?: boolean | KnockoutObservable<boolean>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * Controls when the control will update it's value in response to the user typing into it.
         */
        valueUpdateTrigger?: ValueUpdateTrigger;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: string | KnockoutObservableBase<string>;
        /**
         * Aria label for the textbox.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * TextBox control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<string>;
        /**
         * The text shown when no value is set in the control.
         */
        readonly placeHolderText: KnockoutObservable<string>;
        /**
         * When set, the textbox will be read only.
         */
        readonly readonly: KnockoutObservable<boolean>;
    }
    /**
     * Creates a TextBox control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a textbox viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\TimePicker.d.ts
declare module "Fx/Controls/TimePicker" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import DateTimeRange = MsPortalFx.DateUtil.DateTimeRange;
    /**
     * Options for configuring a time picker control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * Aria label for the DatePicker.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: DateTimeRange | KnockoutObservable<DateTimeRange>;
        /**
        * Whether the control should allow empty(null) value as valid.
        */
        allowEmpty?: boolean;
        /**
         * If true displays hours, minutes, and seconds. If false displays only hours and minutes.
         */
        showSeconds?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: Date | KnockoutObservableBase<Date>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * TimePicker control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<Date>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        readonly enabledDateTimeRange: KnockoutObservable<DateTimeRange>;
    }
    /**
     * Creates a time picker control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a time picker control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Toolbar\MoveResourceToolbarButton.d.ts
declare module "Fx/Controls/Toolbar/MoveResourceToolbarButton" {
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import Toolbars = FxViewModels.Toolbars;
        interface Options {
            /**
             * Resource id.
             */
            resourceId: string;
        }
        /**
         * Creates the move resource toolbar button.
         */
        class ViewModel extends Toolbars.DialogButton implements Toolbars.ToolbarButtonContract {
            /**
             * Creates the move resource toolbar button for moving resources acrooss resource groups/subscriptions.
             *
             * @param container container for the toolbar.
             * @param resourceId resource Id of the resource to be moved.
             *
             * @return A toolbar button which allows moving resources across resource groups/subscriptions.
             */
            constructor(container: AnyBladeContainer, options: Options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\TriStateCheckBox.d.ts
declare module "Fx/Controls/TriStateCheckBox" {
    import * as Base from "Fx/Controls/FormBase";
    import { Validation } from "Fx/Controls/Validations";
    export import Value = MsPortalFx.ViewModels.Forms.TriStateCheckBox.Value;
    /**
     * Options for configuring a tri-state textbox control
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * The aria-label on the control.
         */
        ariaLabel?: string | KnockoutObservableBase<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * if set to true, the label will be placed to the right of the control
         */
        labelOnRight?: boolean;
        /**
         * if set to true, the user can set the indeterminate state of the control
         */
        userCanSetIndeterminate?: boolean;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
        /**
         * The disabled state of the control.
         */
        disabled?: boolean | KnockoutObservableBase<boolean>;
        /**
         * The initial value of the control.  If an observable is provided, there will be a 2 way binding set up between the observable and the value of the control.
         */
        value?: Value | KnockoutObservableBase<Value>;
        /**
         * The visible state of the control.
         */
        visible?: boolean | KnockoutObservableBase<boolean>;
        /**
         * A custom css class to apply to the control.
         */
        cssClass?: string | KnockoutObservableBase<string>;
    }
    /**
     * TriStateCheckBox control view model
     */
    export interface Contract extends Base.Contract {
        /**
         * The value of the control
         */
        readonly value: KnockoutObservableBase<Value>;
    }
    /**
     * Creates a tristate checkbox control viewmodel.
     *
     * @param lifetime The lifetime of the control
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a tristate checkbox control viewmodel
     */
    export function create(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options): Contract;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Validations.d.ts
declare module "Fx/Controls/Validations" {
    export import CaseInsensitiveComparison = MsPortalFx.ViewModels.CaseInsensitiveComparisonValidation;
    export import Contains = MsPortalFx.ViewModels.ContainsValidation;
    export import ContainsCharacters = MsPortalFx.ViewModels.ContainsCharactersValidation;
    export import Custom = MsPortalFx.ViewModels.CustomValidation;
    export import CustomV = MsPortalFx.ViewModels.CustomValidationV;
    export import Equals = MsPortalFx.ViewModels.EqualsValidation;
    export import HasDigit = MsPortalFx.ViewModels.HasDigitValidation;
    export import HasLetter = MsPortalFx.ViewModels.HasLetterValidation;
    export import HasLowerCaseLetter = MsPortalFx.ViewModels.HasLowerCaseLetterValidation;
    export import HasPunctuation = MsPortalFx.ViewModels.HasPunctuationValidation;
    export import HasUpperCaseLetter = MsPortalFx.ViewModels.HasUpperCaseLetterValidation;
    export import Invalid = MsPortalFx.ViewModels.InvalidValidation;
    export import LengthRange = MsPortalFx.ViewModels.LengthRangeValidation;
    export import LocaleAwareCaseInsensitiveComparison = MsPortalFx.ViewModels.LocaleAwareCaseInsensitiveComparisonValidation;
    export import MaxLength = MsPortalFx.ViewModels.MaxLengthValidation;
    export import MaxValue = MsPortalFx.ViewModels.MaxValueValidation;
    export import MinLength = MsPortalFx.ViewModels.MinLengthValidation;
    export import MinValue = MsPortalFx.ViewModels.MinValueValidation;
    export import NotContains = MsPortalFx.ViewModels.NotContainsValidation;
    export import NotContainsCharacters = MsPortalFx.ViewModels.NotContainsCharactersValidation;
    export import NotRegExMatch = MsPortalFx.ViewModels.NotRegExMatchValidation;
    export import Numeric = MsPortalFx.ViewModels.NumericValidation;
    export import Range = MsPortalFx.ViewModels.RangeValidation;
    export import RegExMatch = MsPortalFx.ViewModels.RegExMatchValidation;
    export import Required = MsPortalFx.ViewModels.RequiredValidation;
    export import StaticMessage = MsPortalFx.ViewModels.StaticMessageValidation;
    export import Uri = MsPortalFx.ViewModels.UriValidation;
    export import Validation = MsPortalFx.ViewModels.FormValidation;
    export import ValidationResult = MsPortalFx.ViewModels.ValidationResult;
    export import ValidationState = MsPortalFx.ViewModels.Controls.Validators.ValidationState;
    export import ValidationType = MsPortalFx.ViewModels.FormValidationType;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Controls\Video.d.ts
declare module "Fx/Controls/Video" {
    export = Main;
    module Main {
        /**
         * Options that can be set on the Video control
         */
        interface Options {
            /**
             * Source of the video
             */
            src?: KnockoutObservableBase<string> | string;
            /**
             * Play video immediatly after load
             */
            autoplay?: KnockoutObservableBase<boolean> | boolean;
            /**
             * On first play callback function
             */
            onFirstPlay?: KnockoutObservableBase<Callback> | Callback;
        }
        /**
         * Callback function type for events
         */
        type Callback = () => void;
        /**
         * Video control view model
         */
        class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel {
            /**
             * URL of the desired video (Supports HTML5 video, YouTube, Channel9, TedxTalks)
             */
            src: KnockoutObservableBase<string> | string;
            /**
             * Play video immediatly after load (only works for HTML5 and YouTube)
             */
            autoplay: KnockoutObservableBase<boolean> | boolean;
            /**
             * True if current video type supports autoplay
             */
            canAutoplay: KnockoutReadOnlyObservable<boolean>;
            /**
             * Called when the video is played in first time (only works for HTML5, YouTube and Channel9)
             */
            onFirstPlay: KnockoutObservableBase<Callback> | Callback;
            /**
             * Constructs Video view model
             *
             * @param lifetime - Lifetime Manager for the view model
             * @param options - Set of options to configure video control
             */
            constructor(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Cryptography.d.ts
declare module "Fx/Cryptography" {
    import FxBase = MsPortalFx.Base;
    import FxRpc = FxImpl.Rpc;
    import FxPromiseV = FxBase.PromiseV;
    export module Internal {
        const getHmacSha256EndPoint: FxRpc.FuncEndPointDefinition<GetHmacSha256Options, string>;
        /**
         * Returns an hmac sha256 token generated by hashing the provided string with the specified key.
         *
         * @param options Parameters required by the function.
         * @param client The rpc client from which this call originates. Defaults to the current iFrame.
         *  Note: the default behavior should only be overridden for testing.
         * @return A promise that resolves to a hmac sha256 hashed string.
         */
        function getHmacSha256(options: GetHmacSha256Options, client?: FxRpc.Client): FxPromiseV<string>;
    }
    /**
     * Options that must be passed when calling the getHmacSha256 function.
     */
    export interface GetHmacSha256Options {
        /**
         * The string to hash, can be any length.
         */
        stringToHash: string;
        /**
         * The key, encoded in base 64.
         */
        key: string;
    }
    /**
     * HmacSha256 RPC endpoint response interface
     */
    export interface HmacSha256ResponseModel {
        data: string;
    }
    /**
     * Returns an hmac sha256 token generated by hashing the provided string with the specified key.
     *
     * @param options Parameters required by the function.
     * @return A promise that resolves to a hmac sha256 hashed string.
     */
    export function getHmacSha256(options: GetHmacSha256Options): FxBase.PromiseV<string>;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Feedback.d.ts
declare module "Fx/Feedback" {
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import Rpc = FxImpl.Rpc;
        interface NpsDetails {
            /**
             * The display name of the product to be shown in the NPS survey.
             * The question will be of the form:
             *     How likely are you to recommend {your product name} to a friend or colleague?
             */
            productDisplayName: string;
            /**
             * The product id that will be logged in the portal telemetry table.
             */
            productId: string;
        }
        module Internal {
            /**
             * RPC endpoint to show survey.
             */
            const showNpsEndpoint: Rpc.FuncEndPointDefinition<NpsDetails, void>;
            /**
             * RPC endpoint to check if survey can be shown.
             */
            const canShowNpsEndpoint: Rpc.FuncEndPointDefinition<void, boolean>;
        }
        /**
         * Requests an NPS toast to be displayed. The response to the feedback will be recorded in the portal telemetry tables.
         *
         * Note that the NPS survey will only be shown once per session. Calling this API does not guarantee that the survey will be shown.
         *
         * @param params NPS parameters.
         */
        function showNps(params: NpsDetails): void;
        /**
         * Checks if an NPS survey can be shown. If this returns true, extensions can call the showNPSSurvey to show NPS.
         * If this returns false, an NPS survey has already been shown and calling the showNPSSurvey will result in a no-op.
         *
         */
        function canShowNps(): FxBase.PromiseV<boolean>;
        /**
         * DEPRECATED - no longer opens a feedback pane
         */
        var openResourceDeletedFeedbackPane: Obsolete;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Commands\ListCommand.d.ts
declare module "Fx/Internal/Commands/ListCommand" {
    export = Main;
    module Main {
        class ListCommand extends MsPortalFx.ViewModels.ListCommand implements FxImpl.ListCommand2Contract {
            lc2: boolean;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Composition\CompositionItem.d.ts
declare module "Fx/Internal/Composition/CompositionItem" {
    /**
     * These are the composition items that have TypeScript decorator support.
     */
    export enum ItemType {
        Blade = 0,
        FrameBlade = 1,
        MenuBlade = 2,
        TemplateBlade = 3,
        ButtonPart = 4,
        FramePart = 5,
        Part = 6,
        TemplatePart = 7,
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Composition\MenuBlade.d.ts
declare module "Fx/Internal/Composition/MenuBlade" {
    import MenuBlade = require("Fx/Composition/MenuBlade");
    export = Main;
    module Main {
        /**
         * Defines an item in a group of the menu.
         */
        interface MenuItem extends MenuBlade.MenuItem {
            /**
             * A value indicating whether or not the item should be visible in the menu.
             */
            visible?: KnockoutObservable<boolean>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Composition\ViewModel.d.ts
declare module "Fx/Internal/Composition/ViewModel" {
    /**
     * Returns true if the given extension view model is using V2 of the view model API.
     *
     * @param viewModel The extension view model.
     * @return true if the extension view model is using V2 of the view model API.
     */
    export function isV2(viewModel: any): boolean;
    /**
     * Marks the given extension view model as using V2 of the view model API.
     *
     * @param viewModel The extension view model.
     */
    export function markAsV2(viewModel: any): V2Contract;
    /**
     * Indicates that a view model is one using V2 of the view model API.
     */
    export interface V2Contract {
        /**
         * Indicates that a view model is one using V2 of the view model API.
         */
        _msPortalFx_viewModelApiV2: true;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Composition\ViewModelAdapters.d.ts
declare module "Fx/Internal/Composition/ViewModelAdapters" {
    import Blade = require("Fx/Composition/Blade");
    import FrameBlade = require("Fx/Composition/FrameBlade");
    import MenuBlade = require("Fx/Composition/MenuBlade");
    import TemplateBlade = require("Fx/Composition/TemplateBlade");
    import ButtonPart = require("Fx/Composition/ButtonPart");
    import FramePart = require("Fx/Composition/FramePart");
    import Part = require("Fx/Composition/Part");
    import TemplatePart = require("Fx/Composition/TemplatePart");
    import ViewModel = require("Fx/Internal/Composition/ViewModel");
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import ViewModels = MsPortalFx.ViewModels;
        import ActionBars = ViewModels.ActionBars;
        type ViewModelClass = Blade.BladeClass | FrameBlade.FrameBladeClass | MenuBlade.MenuBladeClass | TemplateBlade.TemplateBladeClass | ButtonPart.ButtonPartClass | FramePart.FramePartClass | Part.PartClass | TemplatePart.TemplatePartClass;
        /**
         * Exported for code generated by precompiler/pdc. Do not reference otherwise.
         */
        class ViewModelAdapter<TParameters, TModel> implements ViewModels.BladeContract, ViewModels.ButtonPartContract, FxImpl.ViewModels.ViewModelV2, ViewModel.V2Contract {
            private _viewModelClass;
            title: KnockoutObservableBase<string>;
            subtitle: KnockoutObservableBase<string>;
            icon: KnockoutObservableBase<FxBase.Image>;
            actionBar: ActionBars.Base.Contract;
            parameterProvider: ViewModels.ParameterProvider<any, any>;
            commandBar: MsPortalFx.ViewModels.Toolbars.Toolbar;
            statusBar: KnockoutObservable<MsPortalFx.ViewModels.BladeStatusBar>;
            helpContentUri?: KnockoutObservableBase<string>;
            shortTitle: KnockoutObservableBase<string>;
            description: KnockoutObservableBase<string>;
            size: KnockoutObservable<MsPortalFx.Parts.PartSize>;
            isV2: boolean;
            _msPortalFx_viewModelApiV2: true;
            private _container;
            private _calledInitialize;
            private _finalizedContent;
            private _viewModel;
            private _isPart;
            private _itemType;
            constructor(container: ViewModels.ContainerContract | ViewModels.PartContainerContract, initialState: any, dataContext: TModel, _viewModelClass: ViewModelClass);
            onInputsSet(inputs: any, settings: any, dontCallOnRebind?: boolean): FxBase.Promise;
            private _finalizeContent();
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\BaseResourceDropDown.d.ts
declare module "Fx/Internal/Controls/BaseResourceDropDown" {
    import FxDropDown = require("Fx/Controls/DropDown");
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { Contract, Options, Validation } from "Fx/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxAzure = MsPortalFx.Azure;
        import FxViewModels = MsPortalFx.ViewModels;
        import Section = FxViewModels.Forms.Section.ViewModel;
        /**
         * The contract for the control to fulfill the widget
         */
        interface WidgetContract {
            /**
             * The control type of the control to find the widget
             */
            readonly controlType: MsPortalFx.ViewModels.ControlType;
            /**
             * The control with a section to pass to the widget
             */
            readonly control: KnockoutReadOnlyObservable<MsPortalFx.ViewModels.Forms.Section.ViewModel>;
        }
        /**
         * Determines if the user has the arm permissions to perform a set of actions
         * @param resourceId: The resource to check permissions on
         * @param requiredPermissions: The permissions to check for
         * @param errorMessage: An optional custom validation message
         */
        function hasPermission(resourceId: string, requiredPermissions: FxAzure.RequiredPermissions | KnockoutObservableBase<FxAzure.RequiredPermissions>, errorMessage?: string): Q.Promise<MsPortalFx.ViewModels.ValidationResult>;
        /**
         * A drop down for picking resources
         * @internal
         */
        class ViewModel<TValue> implements Contract<TValue>, WidgetContract {
            /**
             * see interface
             */
            control: KnockoutObservable<Section>;
            /**
             * see interface
             */
            controlType: FxViewModels.ControlType;
            protected _cloudName: Q.Promise<string>;
            protected _fxDropDown: FxDropDown.Contract<TValue>;
            protected _initialPromise: Q.Promise<string | string[]>;
            protected _fetching: KnockoutObservable<boolean>;
            protected constructor(container: AnyBladeContainer | FxViewModels.ContainerContract, options: Options<TValue>, valueToItem: (item: TValue) => FxDropDown.Item<TValue>, childrenMap?: (controls: any[]) => any[]);
            /**
             * see interface
             */
            readonly fetchedValues: KnockoutObservableArray<TValue>;
            /**
             * see interface
             */
            readonly dirty: KnockoutObservableBase<boolean>;
            /**
             * see interface
             */
            readonly valid: KnockoutReadOnlyObservableBase<boolean>;
            /**
             * see interface
             */
            readonly label: KnockoutObservable<string>;
            /**
             * see interface
             */
            readonly validations: KnockoutObservableArray<Validation<TValue>>;
            /**
             * see interface
             */
            readonly validationResults: KnockoutReadOnlyObservableArray<FxViewModels.ValidationResult>;
            /**
             * see interface
             */
            readonly disabled: KnockoutObservableBase<boolean>;
            /**
             * see interface
             */
            triggerValidation(): Q.Promise<void>;
            /**
             * see interface
             */
            readonly value: KnockoutObservableBase<TValue>;
            /**
             * see interface
             */
            readonly loading: KnockoutReadOnlyObservable<boolean>;
            /**
             * Sets the current value or initial value if available
             * @param available The available values to select from
             * @param valueKeyMap The value to key map for comparison
             * @param emptyValue if no value is selected, what value should be placed in the value observable
             * @param selectFirstAvailable A flag to select the first available from the dropdown if no initial selections are provided
             */
            protected selectInitialOrCurrent(available: TValue[], valueKeyMap: (val: TValue) => string, emptyValue?: TValue, selectFirstAvailable?: boolean): Q.Promise<void>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\FormsBase.d.ts
declare module "Fx/Internal/Controls/FormsBase" {
    import { Validation } from "Fx/Controls/Validations";
    /**
     * Options shared by all form controls
     */
    export interface Options {
        /**
         * The label of the control
         */
        label?: string | KnockoutObservable<string>;
        /**
         * The sublabel of the control
         */
        subLabel?: string | KnockoutObservable<string>;
        /**
         * validations on the control
         */
        validations?: Validation[] | KnockoutObservableArray<Validation>;
        /**
         * sanitized html string shown in the info balloon popup
         */
        infoBalloonContent?: string | KnockoutObservable<string>;
        /**
         * The position of the label.  Not currently on public api.  Used by sections to control label position.
         */
        labelPosition?: MsPortalFx.ViewModels.Forms.LabelPosition | KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
        /**
         * the position of the sublabel.  Not currently on public api.
         */
        subLabelPosition?: MsPortalFx.ViewModels.Forms.SubLabelPosition | KnockoutObservable<MsPortalFx.ViewModels.Forms.SubLabelPosition>;
        /**
         * If set, the control will never be in a dirty state.  This means it will not display dirty highlighting, nor will it trigger an alert when blades are closed.  Validation is not affected.
         */
        suppressDirtyBehavior?: boolean;
    }
    export function setDefaultOptions(options: Options): Options;
    export function bindValue<TValue>(lifetime: MsPortalFx.Base.LifetimeManager, control: {
        value: KnockoutObservableBase<TValue>;
    }, options: {
        value?: TValue | KnockoutObservableBase<TValue>;
    }): void;
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\Grid2.d.ts
declare module "Fx/Internal/Controls/Grid2/Grid2" {
    export = Main;
    module Main {
        import Lists = FxImpl.ViewModels.Controls.Lists;
        import Grid2 = Lists.Grid2;
        /**
         * Data for a Grid2 Row
         */
        interface Row<T, TId> extends Grid2.Row<T, TId> {
        }
        /**
         * Data for a Grid2 Column
         */
        interface Column extends Grid2.Column {
        }
        /**
         * Grid2 initialization options
         */
        interface Options<T, TId> extends Grid2.Options<T, TId> {
        }
        /**
         * Grid2 context menu initialization options
         */
        interface ContextMenuOptions extends Grid2.ContextMenuOptions {
        }
        /**
         * Grid2 demand loading initialization options
         */
        interface DemandLoadingOptions extends Grid2.DemandLoadingOptions {
        }
        /**
         * Grid2 editing initialization options
         */
        interface EditingOptions extends Grid2.EditingOptions {
        }
        /**
         * Grid2 focus initialization options
         */
        interface FocusOptions extends Grid2.FocusOptions {
        }
        /**
         * Grid2 grouping initialization options
         */
        interface GroupingOptions extends Grid2.GroupingOptions {
        }
        /**
         * Grid2 hierarchical initialization options
         */
        interface HierarchicalOptions extends Grid2.HierarchicalOptions {
        }
        /**
         * Grid2 hover initialization options
         */
        interface HoverOptions extends Grid2.HoverOptions {
        }
        /**
         * Grid2 paging initialization options
         */
        interface PagingOptions extends Grid2.PagingOptions {
        }
        /**
         * Grid2 resizing initialization options
         */
        interface ResizingOptions extends Grid2.ResizingOptions {
        }
        /**
         * Grid2 scrolling initialization options
         */
        interface ScrollingOptions extends Grid2.ScrollingOptions {
        }
        /**
         * Grid2 search initialization options
         */
        interface SearchOptions extends Grid2.SearchOptions {
        }
        /**
         * Grid2 selection initialization options
         */
        interface SelectionOptions extends Grid2.SelectionOptions {
        }
        /**
         * Grid2 sorting initialization options
         */
        interface SortingOptions extends Grid2.SortingOptions {
        }
        /**
         * View model class for Grid2
         */
        class ViewModel<T, TId> extends Lists.Base.ViewModel<T, TId> implements Grid2.Contract<T, TId>, Lists.Base.ActionHandler {
            /**
             * Shows the column header.
             */
            showHeader: boolean;
            /**
             * Column definitions.
             */
            columns: KnockoutObservableArray<Grid2.Column>;
            /**
             * Aria label of the table.
             */
            ariaLabel: KnockoutObservable<string>;
            /**
             * No rows message when no items are displayed.
             */
            noRowsMessage: KnockoutObservable<string>;
            /**
             * Message displayed while loading of the table begins.
             * This occurs while retieving the count of items to obtain from the data source.
             */
            loadingMessage: KnockoutObservable<string>;
            /**
             * Row ids of all currently disabled rows.
             */
            disabledRowIds: KnockoutObservableArray<any>;
            contextMenu: Grid2.ContextMenuContract;
            demandLoading: Grid2.DemandLoadingContract;
            editing: Grid2.EditingContract;
            focus: Grid2.FocusContract;
            hover: Grid2.HoverContract;
            grouping: Grid2.GroupingContract;
            hierarchical: Grid2.HierarchicalContract;
            paging: Grid2.PagingContract;
            reordering: Grid2.ReorderingContract;
            resizing: Grid2.ResizingContract;
            scrolling: Grid2.ScrollingContract;
            search: Grid2.SearchContract;
            selection: Grid2.SelectionContract<T, TId>;
            sorting: Grid2.SortingContract;
            _filterActions: boolean;
            getRowAriaLabel: (item: T) => string;
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options<T, TId>);
            dispose(): void;
            private _initialize(options);
            private _validate();
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Base.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base" {
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Base class for grid2 plugins
             */
            class BasePlugin {
                _contract: Grid2.Contract<any, any>;
                constructor(contract: Grid2.Contract<any, any>);
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.ContextMenu.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.ContextMenu" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 context menu plugin
             */
            class ContextMenuPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.DemandLoading.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.DemandLoading" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 demand loading plugin
             */
            class DemandLoadingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Editing.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Editing" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 editing plugin
             */
            class EditingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Focus.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Focus" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 focus plugin
             */
            class FocusPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Grouping.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Grouping" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 grouping plugin
             */
            class GroupingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Hierarchical.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Hierarchical" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 hierarchical plugin
             */
            class HierarchicalPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Hover.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Hover" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 hover plugin
             */
            class HoverPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Paging.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Paging" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 paging plugin
             */
            class PagingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Reordering.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Reordering" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 reordering plugin
             */
            class ReorderingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Resizing.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Resizing" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 resizing plugin
             */
            class ResizingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Scrolling.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Scrolling" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 scrolling plugin
             */
            class ScrollingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Search.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Search" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 search plugin
             */
            class SearchPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Selection.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Selection" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        import Selection2 = MsPortalFx.ViewModels.Internal.Selection2;
        module Internal {
            /**
             * Selectable set used by grids to handle different columns activating different blades.
             */
            class GridSelectionViewModel<T, TId> implements Grid2.SelectionContract<T, TId> {
                /**
                 * Data item dynamic selection provider.
                 */
                dynamicSelectionProvider: Selection2.DynamicSelectionProvider<any, T, any>;
                /**
                 * Data item command group provider.
                 */
                commandGroupProvider: Selection2.CommandGroupProvider<T>;
                /**
                 * Set selection mode.
                 * Single (Default), Multiple, or None.
                 */
                selectionMode: Selection2.SelectionMode;
                /**
                 * Set activation mode.
                 * Single (Default), Multiple, or None.
                 */
                activationMode: Selection2.ActivationMode;
                /**
                 * Indicates when all items in the set are selected.
                 */
                selectedAll: KnockoutReadOnlyObservable<boolean>;
                /**
                 * Currently activated data item ids and column information in the set.
                 */
                activatedIdsWithColumnInformation: KnockoutReadOnlyObservableArray<{
                    id: TId;
                    column: string;
                }>;
                /**
                 * Enables selection.
                 * Default is true.
                 */
                enabled: boolean;
                /**
                 * The property containing the uri of the website it should open when activated.
                 */
                linkUriProperty: string;
                /**
                 * A flag to indicate if the selection checkbox needs to be shown or hidden when the grid width is collapsed.
                 */
                hiddenInCollapsed: boolean;
                _msPortalFxSelectableSet: Selection2.SelectableSet<T, {
                    id: TId;
                    column: string;
                }>;
                private _selectedIds;
                private _unselectedIds;
                private _activatedIds;
                /**
                 * Constructs a list base selection view model.
                 *
                 * @param lifetime Lifetime manager.
                 * @param options Selection options.
                 */
                constructor(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.SelectionOptions);
                /**
                 * Currently selected data item ids in the set.
                 */
                readonly selectedIds: KnockoutReadOnlyObservableArray<TId>;
                /**
                 * Currently unselected data items when selectAll is applied.
                 */
                readonly unselectedIds: KnockoutReadOnlyObservableArray<TId>;
                /**
                 * Currently activated data item ids in the set.
                 */
                readonly activatedIds: KnockoutReadOnlyObservableArray<TId>;
            }
            class SelectionPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\Grid2\ViewModels.Grid2.Sorting.d.ts
declare module "Fx/Internal/Controls/Grid2/ViewModels.Grid2.Sorting" {
    import Base = require("Fx/Internal/Controls/Grid2/ViewModels.Grid2.Base");
    export = Main;
    module Main {
        import Grid2 = FxImpl.ViewModels.Controls.Lists.Grid2;
        module Internal {
            /**
             * Grid2 sorting plugin
             */
            class SortingPlugin extends Base.Internal.BasePlugin implements Grid2.Internal.Plugin {
                constructor(contract: Grid2.Contract<any, any>);
                initialize(lifetime: MsPortalFx.Base.LifetimeManager, options: Grid2.Options<any, any>): void;
                isEnabled(): boolean;
                validate(plugins: Grid2.Internal.Plugins): void;
            }
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\IntuneAppFileUpload.d.ts
declare module "Fx/Internal/Controls/IntuneAppFileUpload" {
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import Base = MsPortalFx.ViewModels.Forms.Base;
        import FxFileUpload = MsPortalFx.ViewModels.FileUpload;
        import FxPromise = FxBase.Promise;
        /**
         *  Specifies the types of App Platforms
         */
        const enum AppOSPlatform {
            /**
             *  iOS
             */
            iOS = 1,
            /**
             * Android
             */
            Android = 2,
            /**
             * Windows 8 Desktop
             */
            Windows8Desktop = 4,
            /**
             * Windows 8 Phone
             */
            Windows8Phone = 8,
            /**
             * Windows 10 Desktop
             */
            Windows10Desktop = 16,
            /**
             * Windows 10 Mobile
             */
            Windows10Mobile = 32,
        }
        /**
         *  Specifies the types of App PlatformArchitecture
         */
        const enum AppPlatformArchitecture {
            /**
             *  x86
             */
            X86 = 1,
            /**
             * x64
             */
            X64 = 2,
            /**
             * Arm architecture
             */
            Arm = 4,
            /**
              * Neutral architecture
              */
            Neutral = 8,
        }
        /**
         * App content file class which contains all the properties
         * needed to make related Graph API calls
         */
        interface LobAppContentFile {
            /**
             * Intune app id
             */
            appId: string;
            /**
             * Intune app type, e.g. microsoft.graph.iosLobApp
             */
            appType: string;
            /**
             * Intune content file id
             */
            fileId: string;
            /**
             * Original app file name
             */
            fileName: string;
            /**
             * Intune app content version
             */
            contentVersion: number;
            /**
             * creation date/time for content entity created in the Intune service
             */
            createdDateTime: Date;
            /**
             * Sas Uri upload location for the app content file
             */
            sasUri: string;
            /**
             * Is content version committed
             */
            isCommitted: boolean;
            /**
             * File size of the unencrypted content file
             */
            size: number;
            /**
             * Expiration date/time of the Sas Uri
             */
            sasUriExpirationDateTime: Date;
            /**
            * Manifest XML as a base 64 string
            */
            manifest: string;
            /**
            * Dictionary of changed app properties
            */
            appProperties: StringMap<string>;
        }
        /**
         * Graph entity for receiving the required upload properties of a content file
         */
        interface ILobAppContentFileEntity {
            /**
             * Sas Uri upload location for the app content file
             */
            azureStorageUri: string;
            /**
             * Identifies if file is already committed
             */
            isCommitted: boolean;
            /**
             * Intune app content file id
             */
            id: string;
            /**
             * Date & time when file entity is created
             */
            createdDateTime: string;
            /**
             * Original app file name
             */
            name: string;
            /**
             * Expiration date/time of the Sas Uri
             */
            azureStorageUriExpirationDateTime: string;
        }
        /**
         * Encrypted app content file properties
         */
        interface EncryptedFileResult {
            /**
             * The key used for file encryption as as a Base64 string
             */
            encryptKey: string;
            /**
             * The key used for encrypting the hmac as a Base64 string
             */
            hmacKey: string;
            /**
             * Hash value of the unencrypted file as a Base64 string
             */
            hash: string;
            /**
             * HMAC of the full encrypted file as a Base64 string
             */
            hmac: string;
            /**
             * Detailed error message if encryption failed as a Base64 string
             */
            iv: string;
            /**
             * Detailed error message if encryption failed
             */
            errorMessage?: string;
        }
        /**
         * Lob App content parameters used in App Rpc Endpoint calls
         */
        interface LobAppContentParams {
            /**
             * App details related to the content file
             */
            lobAppContentFile: LobAppContentFile;
            /**
             * File encryption details for the encrypted content file
             */
            encryptFileResult?: EncryptedFileResult;
        }
        /**
         * Intune App Context
         * This is an optional property in ResumeContext and presence of this property in ResumeContext indicates the intent to resume an upload after browser refresh/crash/close.
         */
        interface IntuneAppContext {
            /**
             * Intune application id (guid) associated with the uploaded file content
             */
            appId: string;
            /**
             * Intune application type
             */
            appType: string;
            /**
             * Intune application name (optional)
             */
            appName?: string;
            /**
             * Manifest XML as a base 64 string
             */
            manifest: string;
            /**
             * App properties in the UX that can be updated with final patch
             */
            appProperties: StringMap<string>;
            /**
             * the notification Uri which links back to the app instance (optional)
             */
            notificationUri?: string;
        }
        /**
         * Optional context information passed to the resume API.
         * Resume is called to start a new upload, start a new upload overriding upload context, resume an in-memory paused upload and resume an upload across browser session.
         * Intune context provides information specific to creating apps in the Microsoft Intune cloud service.
         */
        interface IntuneContext extends FxFileUpload.ResumeContext {
            /**
             * Used to pass information to the Intune App uploader which is needed to complete the creation of an Intune application after the file content has been uploaded.
             */
            intuneAppContext?: IntuneAppContext;
        }
        /**
         * App metadata information.
         */
        interface AppMetadataContract {
            /**
             * Primary identifier of the app used for detection
             */
            appId: string;
            /**
             * Version identifier of the app used for detection
             */
            versionId: string;
            /**
             * The name of app package
             */
            appName: string;
            /**
             * Publisher of the app package
             */
            appPublisher: string;
            /**
             * Description of the app package
             */
            appDescription: string;
            /**
             * The name of app package file
             */
            appFileName: string;
            /**
             * The total size of the app in bytes
             */
            appPackageSize: number;
            /**
             * The type of app package
             */
            appPackageType: string;
            /**
             * App version for display
             */
            appVersion: string;
            /**
             * The device platform for the package
             */
            appOSPlatform: AppOSPlatform;
            /**
             * Applicable Architecture (ORing of AppArchitecture)
             */
            appApplicableArchitecture: number;
            /**
             * The minimum platform OS version supported by the app package
             */
            minPlatformVersion: string;
            /**
             * Is the app package MAM enabled
             */
            mamEnabled: boolean;
            /**
             * Intune MAM SDK version (if MAM enabled)
             */
            mamSDKVersion: string;
            /**
             * The date the app expires and can no longer be installed
             */
            expirationDate: string;
            /**
             * Manifest XML as a base 64 string
             * -- Simple Appx/Xap package will have one.
             * -- Bundle Appx/Universal pacakage will have multiple one. appManifests[0] will have a bundle manifest.
             */
            appManifests: string[];
            /**
             * Array of app metadata properties parsed from the app package
             * which are unique to the platform or package type
             */
            appProperties: StringMap<string>;
            /**
             * Method to parse the selected app content files
             */
            parse: () => Q.Promise<any>;
        }
        interface AppInfoContract {
            /**
             * The name of app package, typically the filename of the app package
             */
            appName: string;
            /**
             * The total size of the app package
             */
            appSize: string;
            /**
             * Upload category tag provided by extension.
             */
            appVersion: string;
            /**
             * The device platform for the package
             */
            appPlatformDescription: string;
            /**
             * Is the app package MAM enabled
             */
            mamEnabledDescription: string;
            /**
             * Expiration date of the app package
             */
            expirationDate: string;
            /**
             * Error messages to indicate the runtime errors.
             */
            errorMessage?: string;
        }
        /**
         * Options to initialize the file upload view model.
         */
        interface Options extends Base.Options.Options<string> {
            /**
             * A comma-separated list of allowed file extensions.
             * This is upload control specific validations that will validate if the selected file is in the allowed file extension list.
             * If the selected file is not in the extension list, a validation error will be flagged and the selected file will be marked as invalid.
             * Eg: "pfx,cer"
             */
            allowedFileExtensions?: string | KnockoutObservableBase<string>;
            /**
             * The maximum number of files allowed to be uploaded at once.
             * This limit is applied post-selection.
             */
            maxFiles?: number;
            /**
             * The upload context options around how/where to upload and size limits.
             */
            uploadContext?: KnockoutObservableBase<FxFileUpload.UploadContext>;
        }
        /**
         * IntuneApp file upload ViewModel.
         */
        class ViewModel extends Base.Options.ViewModel<string> {
            /**
             * A comma-separated list of allowed app file extensions.
             * This is upload control specific validations that will validate if the selected app package file is in the allowed file extension list.
             * If the selected file is not in the extension list, a validation error will be flagged and the selected file will be marked as invalid.
             * Eg: "ipa,apk,appx"
             */
            allowedFileExtensions: string | KnockoutObservableBase<string>;
            /**
             * The maximum number of files allowed to be uploaded at once.
             * This limit is applied post-selection.
             */
            maxFiles: number;
            /**
             * The upload context options around how/where to upload and size limits.
             */
            uploadContext: KnockoutObservableBase<FxFileUpload.UploadContext>;
            /**
             * Each time user clicks on the browse dialog, user can choose one or multiple files and each selected file is represented as SelectedFile on the extension iframe.
             * The selected files are surfaced in the selectedFiles array.
             * The array will be cleared if user chooses to click browse dialog to pick a different set of files.
             * Setting the value property null or calling resetUploadTasks() will clear the array.
             */
            selectedFiles: KnockoutReadOnlyObservableArray<FxFileUpload.SelectedFileContract>;
            /**
             * Observable array holds all the app upload tasks. Each task represents the file details, status, and upload progress, etc.
             * UploadTask is used to initiate the file upload, pause/resume uploads, cancel and dispose the upload.
             */
            uploadTasks: KnockoutReadOnlyObservableArray<FxFileUpload.AsyncUploadTaskContract>;
            /**
             * The app information available to the UI
             */
            appInfo: KnockoutObservableBase<AppInfoContract>;
            /**
             * The app metadata read from the application package file (App version, platform, MinOS, etc.)
             */
            appMetadata: KnockoutObservableBase<AppMetadataContract>;
            /**
             * Callback to handle upload management operations. The callback is populated by the upload widget which will then delegate the needed action to the global upload manager.
             */
            _msPortalFxUploadActionCallback: KnockoutObservableBase<FxFileUpload.UploadActionCallback>;
            /**
             * Constructs a standalone instance of a TextBox form field.
             *
             * @param lifetime A lifetime object that will notify when the data is no longer being used by the caller.
             * @param options Optional The set of options to configure the TextField control.
             */
            constructor(lifetime: MsPortalFx.Base.LifetimeManager, options?: Options);
            /**
             * Method to create an UploadTask associated with the selected file and populate that in the uploadTasks array.
             * File browse selections can be made any number of times. When autoAddUploadTaks is set to true, the selected files will be added automatically to the uploadTasks array.
             * If autoAddploadTasks is false, the selected file should be explicitly added to uploadTasks array by calling the addUploadTasks() method.
             * Extension authors will then be able to start the upload.
             *
             * @param selectedFiles User selected files to add to uploadTasks array to prepare for the file upload.
             */
            addUploadTasks(selectedFiles: FxFileUpload.SelectedFile[]): FxPromise;
            /**
             * Method to reset the uploadTasks array. This method will use the widget callback to intialize the uploadTasks array with empty array.
             * Calling this method will not dispose(abort) the uploads.
             * Uploads which have already started will continue upload in the background.
             * Uploads which have not been started will be cleaned up.
             * Invoking this method will clear the uploadTasks array, selectedFiles array and the value property.
             */
            resetUploadTasks(): FxPromise;
        }
        function registerGetLobAppContentVersion(callback: (lobAppFile: LobAppContentFile) => Q.Promise<number>): void;
        function registerGetLobAppContentFile(callback: (lobAppFile: LobAppContentFile) => Q.Promise<ILobAppContentFileEntity>): void;
        function registerSaveLobAppContentFile(callback: (lobAppFile: LobAppContentFile, encryptResult: EncryptedFileResult) => FxPromise): void;
        function registerRenewLobAppContentSasUri(callback: (lobAppFile: LobAppContentFile) => Q.Promise<Date>): void;
        function registerPatchLobApp(callback: (lobAppFile: LobAppContentFile) => FxPromise): void;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\LocationDropDown.d.ts
declare module "Fx/Internal/Controls/LocationDropDown" {
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { Location } from "Fx/Controls/BaseResourceDropDown";
    import { ViewModel as BaseDropDown, WidgetContract } from "Fx/Internal/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import Location = MsPortalFx.Azure.Location;
        /**
         * A drop down for picking locations
         * @internal
         */
        class ViewModel extends BaseDropDown<Location> implements Location.Contract, WidgetContract {
            /**
             * Creates a dropdown control viewmodel to select a subscripton.
             * @param container The container associated with the part or other composition item
             * @param options The dropdown options. See interface
             */
            protected constructor(container: AnyBladeContainer | FxViewModels.ContainerContract, options: Location.Options);
            private _fetchItems(options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\MonitorChart.d.ts
declare module "Fx/Internal/Controls/MonitorChart" {
    import * as FxCompositionBlade from "Fx/Composition/Blade";
    import * as FxCompositionPdlBlade from "Fx/Composition/Pdl/Blade";
    import * as FxCompositionPart from "Fx/Composition/Part";
    import * as FxCompositionTemplate from "Fx/Composition/TemplateBlade";
    import BladeContainer = FxCompositionBlade.Container;
    import PdlBladeContainer = FxCompositionPdlBlade.Container;
    import PartContainer = FxCompositionPart.Container;
    import TemplateContainer = FxCompositionTemplate.Container;
    /**
     * Defines how data points are aggregated for a metric.
     */
    export const enum AggregationType {
        /**
         * No aggregation is done.
         */
        None = 0,
        /**
         * Data points are aggregated by taking the average of their values.
         */
        Average = 1,
        /**
         * Data points are aggregated by taking the min of their values.
         */
        Minimum = 2,
        /**
         * Data points are aggregated by taking the max of their values.
         */
        Maximum = 3,
        /**
         * Data points are aggregated by taking the total of their values.
         */
        Total = 4,
    }
    /**
     * Defines what visualization to use when rendering the chart.
     */
    export const enum ChartType {
        /**
         * Line chart.
         */
        Line = 0,
        /**
         * Bar chart.
         */
        Bar = 1,
    }
    /**
     * Defines the unit of a metric.
     */
    export const enum Unit {
        /**
         * Count unit.
         */
        Count = 0,
        /**
         * Bytes unit.
         */
        Bytes = 1,
        /**
         * Seconds unit.
         */
        Seconds = 2,
        /**
         * CountPerSecond unit.
         */
        CountPerSecond = 3,
        /**
         * BytesPerSecond unit.
         */
        BytesPerSecond = 4,
        /**
         * Percent unit.
         */
        Percent = 5,
        /**
         * MilliSeconds unit.
         */
        MilliSeconds = 6,
        /**
         * ByteSeconds unit.
         */
        ByteSeconds = 7,
    }
    /**
     * Defines the timespan over which data points are fetched and plotted.
     */
    export interface Timespan {
        /**
         * A relative timespan indicates that data points are plotted for a moving timespan, whose
         * end time is always now().
         */
        relative?: {
            /**
             * Length of time over which metrics are plotted.
             */
            durationMs: number;
        };
        /**
         * An absolute timespan indicates that data points are plotted for a fixed timespan.
         */
        absolute?: {
            /**
             * The start time of the timespan.
             */
            start: Date;
            /**
             * The end time of the timespan.
             */
            end: Date;
        };
        /**
         * How frequently the data points shown on the chart should be updated.
         */
        refreshIntervalMs?: number;
    }
    export interface ResourceMetadata {
        /**
         * The resource id of the resource.
         */
        resourceId: string;
        /**
         * The kind of the resource.
         */
        kind?: string;
        /**
         * The sku of the resource.
         */
        sku?: {
            /**
             * The sku name.
             */
            name?: string;
            /**
             * The sku tier.
             */
            tier?: string;
            /**
             * The sku size.
             */
            size?: string;
            /**
             * The sku family.
             */
            family?: string;
            /**
             * The sku model.
             */
            model?: string;
            /**
             * The sku capacity.
             */
            capacity?: string;
        };
        /**
         * Additional properties for the resource.
         */
        properties?: any;
    }
    export interface Dimension {
        /**
         * The dimension name.
         */
        name: string;
        /**
         * The dimension value.
         */
        value: string;
    }
    export interface Metric {
        /**
         * Resource information about the resource to which this metric belongs.
         */
        resourceMetadata: ResourceMetadata;
        /**
         * The non-localized metric name.
         */
        name: string;
        /**
         * The dimensions for this metric.
         *
         * Note: Separate time series are plotted for each dimension.
         */
        dimensions?: Dimension[];
        /**
         * The aggregation type to use for this metric.
         */
        aggregationType?: AggregationType;
        /**
         * The time grain to use for this metric.
         */
        timeGrainMs?: number;
        /**
         * The unit of this metric.
         */
        unit?: Unit;
        /**
         * Helps in locating correct MetricsProvider.
         * TODO: add external documentation explaining when to use this type property
         */
        type?: string;
        /**
         * Css class to apply to this metric series.
         *
         * This css class should be one of the built in msportalfx-bgcolor-* colors.
         *
         * @see https://github.com/Azure/portaldocs/blob/334634c8a7601f729c4ee6fa673eb00d25045c60/portal-sdk/generated/portalfx-style-guide-color-palette.md#coloring-to-differentiate-data
         * @see https://df.onecloud.azure-test.net/?SamplesExtension=true#blade/SamplesExtension/SDKMenuBlade/styleguidecolorpalettetitle
         */
        cssClass?: string;
    }
    export interface ChartDefinition {
        /**
         * The metrics to plot on this chart.
         */
        metrics: Metric[];
        /**
         * The visualization to use for this chart.
         *
         * Defaults to line chart.
         */
        chartType?: ChartType;
        /**
         * The timespan to use for this chart.
         *
         * Note: This overrides the top-level timespan provided in the Options object.
         */
        timespan?: Timespan;
        /**
         * The title of this chart.
         *
         * Defaults to a string generated from the metrics plotted on this chart.
         */
        title?: string;
        /**
         * The subtitle of this chart.
         *
         * Defaults to a string generated from the resources plotted on this chart.
         */
        subtitle?: string;
        /**
         * Message to display if no data can be loaded for this chart.
         */
        noDataMessage?: string;
        /**
         * Disables pinning for this chart.
         */
        disablePinning?: boolean;
        /**
         * Callback that's executed when the user clicks this chart while
         * the chart is functioning normally.
         *
         * Defaults to opening the Metrics blade.
         */
        onClick?: () => void;
        /**
         * Css class to apply to this chart.
         *
         * Multiple css classes can be added by separating them with a space.
         */
        cssClass?: string;
    }
    /**
     * MonitorChart options.
     */
    export interface Options {
        /**
         * The charts to render.
         */
        charts?: ChartDefinition[] | KnockoutObservableArray<ChartDefinition>;
        /**
         * The timespan used for all charts, unless overriden in an individual chart.
         *
         * Defaults to relative duration of 24 hours.
         */
        timespan?: Timespan | KnockoutObservable<Timespan>;
    }
    /**
     * MonitorChart control.
     */
    export interface Contract {
        /**
         * The charts rendered.
         */
        readonly charts: KnockoutObservableArray<ChartDefinition>;
        /**
         * The timespan used for all charts, unless overriden in an individual chart.
         */
        readonly timespan: KnockoutObservableBase<Timespan>;
    }
    /**
     * Creates a MonitorChart viewmodel.
     *
     * @param lifetime The lifetime of the control. This must be a container object.
     * @param options Options that modify the appearance and behavior of the control.
     *
     * @returns a MonitorChart viewmodel.
     */
    export function create(container: BladeContainer | PartContainer | PdlBladeContainer | TemplateContainer, options?: Options): Contract;
    export module Internal {
        interface BladeManagementApiContainer extends MsPortalFx.ViewModels.BladeManagement, MsPortalFx.Base.LifetimeManager {
        }
        /**
         * Internal viewmodel used for monitor charts.
         */
        class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
            /**
             * Charts property that stores the charts array provided by the consumer of this control and
             * is **not** proxied across to the widget.
             *
             * This is to prevent the Javascript array provided by the consumer from being frozen
             * by the PO layer.
             */
            charts: KnockoutObservableArray<ChartDefinition>;
            /**
             * Charts property that mirrors the charts property and **is proxied** to the widget.
             */
            _msPortalFxCharts: KnockoutObservableBase<ChartDefinition[]>;
            /**
             * Timespan property that stores the timespan provided by the consumer of this control and
             * is **not** proxied across to the widget.
             *
             * This is to prevent the Javascript array provided by the consumer from being frozen
             * by the PO layer.
             */
            timespan: KnockoutObservableBase<Timespan>;
            /**
             * Timespan property that mirrors the timespan property and **is proxied** to the widget.
             */
            _msPortalFxTimespan: KnockoutObservableBase<Timespan>;
            private _container;
            constructor(container: BladeManagementApiContainer, options?: Options);
            /**
             * Allows the MonitorChart widget to open a blade when it's clicked.
             *
             * This openBlade api exists in the ViewModel because the widget does not have the container context on
             * which this control resides (which is important so the shell knows whether to open a blade in a journey
             * or to start a new journey).
             */
            openBlade(bladeReference: FxImpl.Composition.Selectable.BladeReference<any>, options?: MsPortalFx.ViewModels.OpenBladeOptions): Q.Promise<boolean>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\ResourceGroupDropDown.d.ts
declare module "Fx/Internal/Controls/ResourceGroupDropDown" {
    import FxDropDown = require("Fx/Controls/DropDown");
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { ResourceGroup, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    import { ViewModel as BaseDropDown } from "Fx/Internal/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import SelectedMode = ResourceGroup.SelectedMode;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<ResourceGroup.Value>;
        /**
         * A drop down for picking and creating resource groups
         * @internal
         */
        class ViewModel extends BaseDropDown<ResourceGroup.Value> implements ResourceGroup.Contract {
            protected _fxDropDown: FxDropDown.Contract<ResourceGroup.Value>;
            private _baseOptions;
            private _radioButtons;
            private _textBox;
            private _exposedValue;
            private _negotiatedValue;
            private _emptyControlValue;
            /**
             * Creates a dropdown control viewmodel to select or create resource groups.
             * @param container The container associated with the part or other composition item
             * @param options The dropdown options. See interface
             */
            protected constructor(container: AnyBladeContainer | FxViewModels.ContainerContract, options: ResourceGroup.Options);
            /**
             * Over riding value because this is an aggrigate value
             */
            readonly value: KnockoutObservableBase<ResourceGroup.Value>;
            /**
             * Switch the control between create new and use existing
             * @param createNew parameter to directly set the option selected instead of toggle.
             */
            switchMode(mode?: SelectedMode): void;
            private _fetchItems(options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Controls\SubscriptionDropDown.d.ts
declare module "Fx/Internal/Controls/SubscriptionDropDown" {
    import FxDropDown = require("Fx/Controls/DropDown");
    import { AnyBladeContainer } from "Fx/Composition/BladeBase";
    import { Subscription, Validation as BaseValidation } from "Fx/Controls/BaseResourceDropDown";
    import { ViewModel as BaseDropDown } from "Fx/Internal/Controls/BaseResourceDropDown";
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import FxAzure = MsPortalFx.Azure;
        import Subscription = FxAzure.Subscription;
        /**
         * The validation type accepted by the dropdown
         */
        type Validation = BaseValidation<Subscription>;
        /**
         * A drop down for picking subscriptions
         * @internal
         */
        class ViewModel extends BaseDropDown<Subscription> implements Subscription.Contract {
            protected _fxDropDown: FxDropDown.Contract<Subscription>;
            private _marketplaceValidation;
            /**
             * Creates a dropdown control viewmodel to select a subscripton.
             * @param container The container associated with the part or other composition item
             * @param options The dropdown options. See interface
             */
            protected constructor(container: AnyBladeContainer | FxViewModels.ContainerContract, options: Subscription.Options);
            private _fetchItems(options);
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\ArrayBaseNavigator.d.ts
declare module "Fx/Internal/Data/ArrayBaseNavigator" {
    export = ArrayBaseNavigator;
    import SortProjection = require("Fx/Internal/Data/SortProjection");
    import FilterProjection = require("Fx/Internal/Data/FilterProjection");
    import ContinuationProjection = require("Fx/Internal/Data/ContinuationProjection");
    import PageProjection = require("Fx/Internal/Data/PageProjection");
    import MapProjection = require("Fx/Internal/Data/MapProjection");
    import SortOrder = FxImpl.Data.SortOrder;
    import NavigatorOptions = FxImpl.Data.NavigatorOptions;
    import Property = FxImpl.Data.Property;
    import Navigator = FxImpl.Data.Navigator;
    import Expressions = FxImpl.Data.Expressions;
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import FxBase = MsPortalFx.Base;
    import Promises = FxBase.Promises;
    import CancelationToken = Promises.CancelationToken;
    import DisposableLifetimeManager = FxBase.DisposableLifetimeManager;
    class ArrayBaseNavigator<T, TData, TId> implements Navigator<T, TData, TId> {
        properties: Property[];
        allowedFilterExpressions: Expressions.AllowedExpressions;
        searchText: KnockoutObservable<string>;
        filterExpression: KnockoutObservable<Expressions.Expression>;
        sortOrder: KnockoutObservableArray<SortOrder>;
        selectedProperties: KnockoutObservableArray<Property>;
        filter: (data: TData) => boolean;
        search: (searchText: string, data: TData) => boolean;
        compare: (sortOrder: SortOrder[], value: TData, compareTo: TData) => number;
        protected _items: KnockoutObservableArray<NavigatorItem<T, TId>>;
        protected _totalItems: KnockoutObservable<number>;
        protected _startIndex: KnockoutObservable<number>;
        protected _pageSize: KnockoutObservable<number>;
        protected _canLoadMore: KnockoutObservable<boolean>;
        protected _autoRefresh: boolean;
        protected _projectionLifetime: DisposableLifetimeManager;
        protected _filtered: KnockoutObservableArray<TData>;
        protected _filterProjection: FilterProjection<TData>;
        protected _sorted: KnockoutObservableArray<TData>;
        protected _sortProjection: SortProjection<TData>;
        protected _continued: KnockoutObservableArray<TData>;
        protected _continuationProjection: ContinuationProjection<TData>;
        protected _paged: KnockoutObservableArray<TData>;
        protected _pageProjection: PageProjection<TData>;
        protected _mapProjection: MapProjection<TData, NavigatorItem<T, TId>>;
        private _sourceItems;
        private _initialQueryParams;
        private _inputParamsPromise;
        private _lifetime;
        private _currentRequest;
        private _getId;
        private _getModel;
        /**
         * Constructs and datasource for an observable array.
         */
        constructor(options: ArrayBaseNavigator.Options<T, TData, TId>);
        readonly initialized: FxBase.Promise;
        readonly sourceItems: KnockoutObservableArray<TData>;
        private _initialize(queryParams?);
        private _setProjections();
        protected _setFilterProjection(): void;
        protected _setSortProjection(): void;
        protected _setContinuationProjection(): void;
        protected _setPageProjection(): void;
        protected _setMapProjection(): void;
        /**
            * Throws an error.
            */
        protected _throw(message: string): void;
        /**
            * Validates that start and count are within the array bounds.
            */
        protected _validateBounds(skip: number, take: number, total?: number): void;
        private _compareData(itemA, itemB);
        /**
            * Filters the array acorrding to the specified search or filtering properties.
            */
        private _filterFunc(data);
        protected _createItems(dataItems: TData[], models?: T[]): NavigatorItem<T, TId>[];
        /**
            * Maps the array
            */
        protected _map(dataItems: TData[]): NavigatorItem<T, TId>[];
        private _updateItems(items, models);
        protected _queryParamsChanged(): void;
        /**
            * Loads a single page into the _items collection for display.
            */
        protected _load(token: CancelationToken, skip?: number, take?: number, last?: number): FxBase.Promise;
        protected _refresh(token: CancelationToken): FxBase.Promise;
        /**
            * Appends a page into the _items collection for display.
            */
        protected _loadMore(token: CancelationToken, take: number): FxBase.Promise;
        /**
            * Begins a new request and returns the cancelation token for it.
            * If there is an existing request it will be canceled.
            *
            * @return The request cancelation token.
            */
        protected _beginRequest(): CancelationToken;
        /**
            * Marks a request as completed.
            * This prevents the next _beginRequest from attempting to cancel it.
            *
            * @param cancelationToken The request cancelation token from _beginRequest.
            */
        protected _endRequest(cancelationToken: CancelationToken): void;
    }
    module ArrayBaseNavigator {
        interface Options<T, TData, TId> extends NavigatorOptions<T, TData, TId> {
            sourceItems?: KnockoutObservableArray<TData> | TData[];
            properties?: Property[];
            getId?: (data: TData) => TId;
            getModel?: (data: TData[]) => T[] | FxBase.PromiseV<T[]>;
            filter?: (item: TData) => boolean;
            search?: (searchText: string, item: TData) => boolean;
            compare?: (sortOrder: SortOrder[], value: TData, compareTo: TData) => number;
            autoRefresh?: boolean;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\ArrayDemandLoadNavigator.d.ts
declare module "Fx/Internal/Data/ArrayDemandLoadNavigator" {
    export = ArrayDemandLoadNavigator;
    import ArrayBaseNavigator = require("Fx/Internal/Data/ArrayBaseNavigator");
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import PagedDemandLoadNavigator = FxImpl.Data.PagedDemandLoadNavigator;
    import DemandLoadNavigatorOptions = FxImpl.Data.DemandLoadNavigatorOptions;
    import FxPromise = MsPortalFx.Base.Promise;
    class ArrayDemandLoadNavigator<T, TData, TId> extends ArrayBaseNavigator<T, TData, TId> implements PagedDemandLoadNavigator<T, TData, TId> {
        items: KnockoutReadOnlyObservableArray<NavigatorItem<T, TId>>;
        totalItems: KnockoutReadOnlyObservableBase<number>;
        pageSize: KnockoutReadOnlyObservableBase<number>;
        startIndex: KnockoutReadOnlyObservableBase<number>;
        canLoadMore: KnockoutReadOnlyObservableBase<boolean>;
        protected _defaultTake: number;
        constructor(options: ArrayDemandLoadNavigator.Options<T, TData, TId>);
        protected _setContinuationProjection(): void;
        protected _setPageProjection(): void;
        private _loadMoreRequest;
        loadMore(take?: number): FxPromise;
        refresh(): FxPromise;
        loadPage(skip: number, take: number): FxPromise;
    }
    module ArrayDemandLoadNavigator {
        interface Options<T, TData, TId> extends DemandLoadNavigatorOptions<T, TData, TId>, ArrayBaseNavigator.Options<T, TData, TId> {
            getId: (data: TData) => TId;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\ArrayListNavigator.d.ts
declare module "Fx/Internal/Data/ArrayListNavigator" {
    export = ArrayListNavigator;
    import ArrayBaseNavigator = require("Fx/Internal/Data/ArrayBaseNavigator");
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import ListNavigatorOptions = FxImpl.Data.ListNavigatorOptions;
    import PagedListNavigator = FxImpl.Data.PagedListNavigator;
    class ArrayListNavigator<T, TData, TId> extends ArrayBaseNavigator<T, TData, TId> implements PagedListNavigator<T, TData, TId> {
        items: KnockoutReadOnlyObservableArray<NavigatorItem<T, TId>>;
        totalItems: KnockoutReadOnlyObservableBase<number>;
        startIndex: KnockoutReadOnlyObservable<number>;
        pageSize: KnockoutReadOnlyObservable<number>;
        canLoadMore: KnockoutReadOnlyObservable<boolean>;
        constructor(options: ArrayListNavigator.Options<T, TData, TId>);
        refresh(): MsPortalFx.Base.Promise;
        loadAll(): MsPortalFx.Base.Promise;
        loadPage(skip: number, take: number): MsPortalFx.Base.Promise;
    }
    module ArrayListNavigator {
        interface Options<T, TData, TId> extends ListNavigatorOptions<T, TData, TId>, ArrayBaseNavigator.Options<T, TData, TId> {
            getId: (data: TData) => TId;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\BaseProjection.d.ts
declare module "Fx/Internal/Data/BaseProjection" {
    export = BaseProjection;
    import LifetimeManager = MsPortalFx.Base.LifetimeManager;
    abstract class BaseProjection<TSource, TDest> {
        /**
         * The destination array for the projection.
         */
        destination: KnockoutObservableArray<TDest>;
        protected _lifetime: LifetimeManager;
        protected _source: KnockoutReadOnlyObservableArray<TSource> | KnockoutProjectableComputedArray<TSource>;
        protected _autoRefresh: boolean;
        protected _internalEdit: boolean;
        constructor(options: BaseProjection.Options<TSource, TDest>);
        /**
         * Refreshes the destination by re-calculating from the source.
         */
        abstract refresh(): void;
        /**
         * Transforms source edits into destination edits and applies them to the destination.
         *
         * @param sourceEdits The edits that just occured to the source.
         */
        protected abstract _update(sourceEdits: KnockoutArrayEdit<TSource>[]): void;
        /**
         * Replaces the destination array.
         *
         * @param destinationArray The new array.
         */
        protected _replace(destinationArray: TDest[]): void;
        /**
         * Applies edits to the destination array.
         *
         * @param destinationEdits Array edits to apply.
         */
        protected _apply(destinationEdits: KnockoutArrayEdit<TDest>[]): void;
    }
    module BaseProjection {
        interface Options<TSource, TDest> {
            lifetime: LifetimeManager;
            source: KnockoutReadOnlyObservableArray<TSource> | KnockoutProjectableComputedArray<TSource>;
            destination?: KnockoutObservableArray<TDest>;
            autoRefresh?: boolean;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\ContinuationProjection.d.ts
declare module "Fx/Internal/Data/ContinuationProjection" {
    export = ContinuationProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    class ContinuationProjection<T> extends BaseProjection<T, T> {
        canLoadMore: KnockoutObservable<boolean>;
        totalCount: KnockoutObservable<number>;
        private _maxIndex;
        constructor(options: ContinuationProjection.Options<T>);
        refresh(): void;
        reset(): void;
        loadMore(count: number): void;
        private _load();
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module ContinuationProjection {
        interface Options<T> extends BaseProjection.Options<T, T> {
            canLoadMore?: KnockoutObservable<boolean>;
            totalCount?: KnockoutObservable<number>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\Expressions.d.ts
declare module "Fx/Internal/Data/Expressions" {
    export = ExpressionsModule;
    module ExpressionsModule {
        import Expressions = FxImpl.Data.Expressions;
        import Expression = Expressions.Expression;
        import EqualsExpression = Expressions.EqualsExpression;
        import NotEqualsExpression = Expressions.NotEqualsExpression;
        import GreaterThanExpression = Expressions.GreaterThanExpression;
        import GreaterThanOrEqualsExpression = Expressions.GreaterThanOrEqualsExpression;
        import LessThanExpression = Expressions.LessThanExpression;
        import LessThanOrEqualsExpression = Expressions.LessThanOrEqualsExpression;
        function Equals(left: Expression, right: Expression): EqualsExpression;
        function NotEquals(left: Expression, right: Expression): NotEqualsExpression;
        function GreaterThan(left: Expression, right: Expression): GreaterThanExpression;
        function GreaterThanOrEqual(left: Expression, right: Expression): GreaterThanOrEqualsExpression;
        function LessThan(left: Expression, right: Expression): LessThanExpression;
        function LessThanOrEqual(left: Expression, right: Expression): LessThanOrEqualsExpression;
        import AndExpression = Expressions.AndExpression;
        import OrExpression = Expressions.OrExpression;
        import NotExpression = Expressions.NotExpression;
        function And(...expressions: Expression[]): AndExpression;
        function Or(...expressions: Expression[]): OrExpression;
        function Not(expression: Expression): NotExpression;
        import AddExpression = Expressions.AddExpression;
        import SubtractExpression = Expressions.SubtractExpression;
        import MultiplyExpression = Expressions.MultiplyExpression;
        import DivideExpression = Expressions.DivideExpression;
        import ModuloExpression = Expressions.ModuloExpression;
        import NegateExpression = Expressions.NegateExpression;
        function Add(...expressions: Expression[]): AddExpression;
        function Subtract(...expressions: Expression[]): SubtractExpression;
        function Multiply(...expressions: Expression[]): MultiplyExpression;
        function Divide(...expressions: Expression[]): DivideExpression;
        function Modulo(...expressions: Expression[]): ModuloExpression;
        function Negate(expression: Expression): NegateExpression;
        import GroupExpression = Expressions.GroupExpression;
        function Group(expression: Expression): GroupExpression;
        import BooleanExpression = Expressions.BooleanExpression;
        import GuidExpression = Expressions.GuidExpression;
        import DecimalExpression = Expressions.DecimalExpression;
        import DoubleExpression = Expressions.DoubleExpression;
        import IntegerExpression = Expressions.IntegerExpression;
        import StringExpression = Expressions.StringExpression;
        import NullExpression = Expressions.NullExpression;
        function Boolean(value: boolean): BooleanExpression;
        function Guid(value: string): GuidExpression;
        function Decimal(value: string): DecimalExpression;
        function Double(value: number): DoubleExpression;
        function Integer(value: number): IntegerExpression;
        function String(value: string): StringExpression;
        function Null(): NullExpression;
        function Identifier(name: string): {
            type: string;
            name: string;
        };
        import RoundExpression = Expressions.RoundExpression;
        import FloorExpression = Expressions.FloorExpression;
        import CeilingExpression = Expressions.CeilingExpression;
        function Round(expression: Expression): RoundExpression;
        function Floor(expression: Expression): FloorExpression;
        function Ceiling(expression: Expression): CeilingExpression;
        import StartsWithExpression = Expressions.StartsWithExpression;
        import EndsWithExpression = Expressions.EndsWithExpression;
        import ContainsExpression = Expressions.ContainsExpression;
        function StartsWith(expression: Expression, start: Expression): StartsWithExpression;
        function EndsWith(expression: Expression, end: Expression): EndsWithExpression;
        function Contains(expression: Expression, value: Expression): ContainsExpression;
        import TrimExpression = Expressions.TrimExpression;
        import ToUpperExpression = Expressions.ToUpperExpression;
        import ToLowerExpression = Expressions.ToLowerExpression;
        import IndexOfExpression = Expressions.IndexOfExpression;
        import SubStringExpression = Expressions.SubStringExpression;
        import ConcatExpression = Expressions.ConcatExpression;
        function Trim(expression: Expression): TrimExpression;
        function ToUpper(expression: Expression): ToUpperExpression;
        function ToLower(expression: Expression): ToLowerExpression;
        function IndexOf(expression: Expression, value: Expression): IndexOfExpression;
        function SubString(expression: Expression, start: Expression, count?: Expression): SubStringExpression;
        function Concat(expression: Expression, value: Expression): ConcatExpression;
        import MonthExpression = Expressions.MonthExpression;
        import YearExpression = Expressions.YearExpression;
        import DayExpression = Expressions.DayExpression;
        import HourExpression = Expressions.HourExpression;
        import MinuteExpression = Expressions.MinuteExpression;
        import SecondExpression = Expressions.SecondExpression;
        import NowExpression = Expressions.NowExpression;
        function Month(expression: Expression): MonthExpression;
        function Year(expression: Expression): YearExpression;
        function Day(expression: Expression): DayExpression;
        function Hour(expression: Expression): HourExpression;
        function Minute(expression: Expression): MinuteExpression;
        function Second(expression: Expression): SecondExpression;
        function Now(): NowExpression;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\FilterProjection.d.ts
declare module "Fx/Internal/Data/FilterProjection" {
    export = FilterProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    class FilterProjection<T> extends BaseProjection<T, T> {
        private _filter;
        private _states;
        private _damageIndex;
        private _damageOffset;
        constructor(options: FilterProjection.Options<T>);
        refresh(): void;
        private _repairTo(stateIndex);
        private _addState(stateIndex, filtered);
        private _deleteState(stateIndex);
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module FilterProjection {
        interface Options<T> extends BaseProjection.Options<T, T> {
            filter: (item: T) => boolean;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\GroupNavigator.d.ts
declare module "Fx/Internal/Data/GroupNavigator" {
    export = GroupNavigator;
    import SortOrder = FxImpl.Data.SortOrder;
    import Property = FxImpl.Data.Property;
    import Expressions = FxImpl.Data.Expressions;
    import GroupNavigatorItem = FxImpl.Data.GroupNavigatorItem;
    import FxBase = MsPortalFx.Base;
    import ListNavigatorOptions = FxImpl.Data.ListNavigatorOptions;
    import PagedGroupNavigator = FxImpl.Data.PagedGroupNavigator;
    /**
     * GroupNavigator to support Grid grouping based on groupBy key.
     */
    class GroupNavigator<T, TData, TId, TGroup> implements PagedGroupNavigator<T, TData, TId, TGroup> {
        items: KnockoutReadOnlyObservableArray<GroupNavigatorItem<T, TId, TGroup>>;
        totalItems: KnockoutReadOnlyObservableBase<number>;
        startIndex: KnockoutReadOnlyObservable<number>;
        pageSize: KnockoutReadOnlyObservable<number>;
        canLoadMore: KnockoutReadOnlyObservable<boolean>;
        groupBy: KnockoutObservableBase<string>;
        properties: Property[];
        allowedFilterExpressions: Expressions.AllowedExpressions;
        searchText: KnockoutObservable<string>;
        filterExpression: KnockoutObservable<Expressions.Expression>;
        sortOrder: KnockoutObservableArray<SortOrder>;
        selectedProperties: KnockoutObservableArray<Property>;
        filter: (data: TData) => boolean;
        search: (searchText: string, data: TData) => boolean;
        compare: (sortOrder: SortOrder[], value: T | TData, compareTo: T | TData) => number;
        private _totalItems;
        private _startIndex;
        private _pageSize;
        private _canLoadMore;
        private _autoRefresh;
        private _projectionLifetime;
        private _items;
        private _filtered;
        private _filterProjection;
        private _mappedItems;
        private _mapProjection;
        private _groupedItems;
        private _groupProjection;
        private _paged;
        private _pageProjection;
        private _sourceItems;
        private _initialQueryParams;
        private _inputParamsPromise;
        private _lifetime;
        private _currentRequest;
        private _getId;
        private _getModel;
        private _getGroupId;
        private _getGroup;
        /**
         * Instantiates and instance of GroupNavigator.
         *
         * @param options GroupNavigator options.
         */
        constructor(options: GroupNavigator.Options<T, TData, TId, TGroup>);
        /**
         * Property to wait till initialization is complete.
         *
         * @return Promise indicating if initialization is complete.
         */
        readonly initialized: FxBase.Promise;
        /**
         * Property to get the source data items.
         *
         * @return Source data returned as an observableArray.
         */
        readonly sourceItems: KnockoutObservableArray<TData>;
        /**
         * Method to refresh the data source and bubble the changes across data projections.
         *
         * @return Promise indicating the completion of refresh.
         */
        refresh(): MsPortalFx.Base.Promise;
        /**
         * Method to map and load all source items to the destination array.
         *
         * @return Promise indicating the completion of loadAll.
         */
        loadAll(): MsPortalFx.Base.Promise;
        /**
         * Method to map and load all source items to the destination array.
         *
         * @param skip Number of items to skip.
         * @param take Number of items to fetch.
         * @return Promise indicating the completion of loadPage.
         */
        loadPage(skip: number, take: number): MsPortalFx.Base.Promise;
        private _initialize(queryParams?);
        private _setProjections();
        private _setFilterProjection();
        private _setMapProjection();
        private _setGroupProjection();
        private _setPageProjection();
        private _validateBounds(skip, take, total?);
        private _compareData(itemA, itemB);
        /**
         * Filters the array acorrding to the specified search or filtering properties.
         */
        private _filterFunc(data);
        private _beginRequest();
        private _endRequest(cancelationToken);
        private _load(token, skip?, take?, last?);
        private _refresh(token);
        private _createItems(dataItems, models?);
        private _updateItems(items, models);
        private _map(dataItems);
        private _getGroupIdWrapper(groupBy, item);
        private _getGroupWrapper(groupBy, groupId);
        private _mapItem(groupId, item?, groupData?);
    }
    module GroupNavigator {
        interface Options<T, TData, TId, TGroup> extends ListNavigatorOptions<T, TData, TId> {
            sourceItems?: KnockoutObservableArray<TData> | TData[];
            properties?: Property[];
            getId: (data: TData) => TId;
            getModel?: (data: TData[]) => T[] | FxBase.PromiseV<T[]>;
            filter?: (item: TData) => boolean;
            search?: (searchText: string, item: TData) => boolean;
            compare?: (sortOrder: SortOrder[], value: TData | T, compareTo: TData | T) => number;
            autoRefresh?: boolean;
            groupBy?: KnockoutObservableBase<string>;
            getGroupId?: (groupBy: string, data: T) => string;
            getGroup?: (groupBy: string, groupId: string) => TGroup;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\GroupProjection.d.ts
declare module "Fx/Internal/Data/GroupProjection" {
    export = GroupProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    import SortOrder = FxImpl.Data.SortOrder;
    class GroupProjection<T, TGroup> extends BaseProjection<T, T> {
        private _groupBy;
        private _getGroupId;
        private _getGroup;
        private _mapItem;
        private _sortOrder;
        private _compare;
        constructor(options: GroupProjection.Options<T, TGroup>);
        refresh(): void;
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
        private _groupItems(dataItems);
    }
    module GroupProjection {
        interface Options<T, TGroup> extends BaseProjection.Options<T, T> {
            groupBy: KnockoutObservableBase<string>;
            getGroupId: (groupBy: string, data: T) => string;
            getGroup: (groupBy: string, groupId: string) => TGroup;
            mapItem: (groupId: string, item?: T, groupData?: TGroup) => T;
            sortOrder: KnockoutObservableArray<SortOrder>;
            compare: (item1: T, item2: T) => number;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\LifetimeMapProjection.d.ts
declare module "Fx/Internal/Data/LifetimeMapProjection" {
    export = LifetimeMapProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    /**
     * Maps the array into the destination array.
     *
     */
    class LifetimeMapProjection<T, U> extends BaseProjection<T, U> {
        private _mapping;
        private _states;
        constructor(options: LifetimeMapProjection.Options<T, U>);
        private _mapState(value);
        refresh(): void;
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module LifetimeMapProjection {
        interface Options<T, U> extends BaseProjection.Options<T, U> {
            mapping: (itemLifetime: MsPortalFx.Base.LifetimeManager, item: T) => U;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\MapProjection.d.ts
declare module "Fx/Internal/Data/MapProjection" {
    export = MapProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    /**
     * Maps the array into the destination array.
     */
    class MapProjection<T, U> extends BaseProjection<T, U> {
        private _mapping;
        constructor(options: MapProjection.Options<T, U>);
        refresh(): void;
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module MapProjection {
        interface Options<T, U> extends BaseProjection.Options<T, U> {
            mapping: (item: T[]) => U[];
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\OData.d.ts
declare module "Fx/Internal/Data/OData" {
    export = OData;
    import Expressions = FxImpl.Data.Expressions;
    import QueryParams = FxImpl.Data.QueryParams;
    import FxData = MsPortalFx.Data;
    module OData {
        /**
         * Serializes query parameters to OData v4 format.
         *
         * @param params The query parameters.
         * @return The query string.
         */
        function serializeODataQueryParams(params: QueryParams): string;
        /**
         * Adds all expressions supported for odata v4 filters to an allowed expressions map and returns it.
         *
         * @param allowedExpressions An existing allowed expressions map to add the entries to.
         * @return The allowed expressions map.
         */
        function allowedExpressions(allowedExpressions?: Expressions.AllowedExpressions): Expressions.AllowedExpressions;
        function processServerResponse(response: any): FxData.DataCacheProcessedResponse;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\PageMapProjection.d.ts
declare module "Fx/Internal/Data/PageMapProjection" {
    export = PageMapProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    /**
     * Maps a page of the source array into the destination array.
     */
    class PageMapProjection<T, U> extends BaseProjection<T, U> {
        /**
         * The last requested page size.
         */
        pageSize: KnockoutObservable<number>;
        /**
         * The start index of the current page.
         */
        startIndex: KnockoutObservable<number>;
        /**
         * The total number of items available to be paged.
         */
        totalCount: KnockoutObservable<number>;
        private _requestedStartIndex;
        private _requestedPageSize;
        private _mapping;
        private _states;
        private _loaded;
        /**
         * Constructs a page map projection that maps a page of the source array into the destination array.
         *
         * @param options Options for constructing the projection.
         */
        constructor(options: PageMapProjection.Options<T, U>);
        /**
         * Refreshes the current page from the source items.
         */
        refresh(): void;
        /**
         * Loads mapped objects of everything in the source array into the destination page array.
         */
        loadAll(): void;
        /**
         * Loads mapped objects of the requested page from the source array into the destination page array.
         */
        loadPage(startIndex: number, pageSize: number): void;
        /**
         * Updates the current page when the source array changes.
         *
         * @param sourceEdits The changes to the source array.
         */
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
        private _load(startIndex?, pageSize?);
        private _makeState(value);
        private _createStates();
        private _mapStates(start, end);
    }
    module PageMapProjection {
        /**
         * Options for construction a PageMapProjection.
         */
        interface Options<T, U> extends BaseProjection.Options<T, U> {
            /**
             * The page start index observable that will be updated on page changes.
             */
            startIndex?: KnockoutObservable<number>;
            /**
             * The page size observable that will be updated on page changes.
             */
            pageSize?: KnockoutObservable<number>;
            /**
             * The total count observable that will be updated on page changes.
             */
            totalCount?: KnockoutObservable<number>;
            /**
             * The mapping function to create destination items for the current page.
             */
            mapping: (item: T[]) => U[];
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\PageProjection.d.ts
declare module "Fx/Internal/Data/PageProjection" {
    export = PageProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    class PageProjection<T> extends BaseProjection<T, T> {
        pageSize: KnockoutObservable<number>;
        startIndex: KnockoutObservable<number>;
        totalCount: KnockoutObservable<number>;
        private _requestedStartIndex;
        private _requestedPageSize;
        private _loaded;
        constructor(options: PageProjection.Options<T>);
        refresh(): void;
        loadAll(): void;
        loadPage(startIndex: number, pageSize: number): void;
        private _load(startIndex?, pageSize?);
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module PageProjection {
        interface Options<T> extends BaseProjection.Options<T, T> {
            startIndex?: KnockoutObservable<number>;
            pageSize?: KnockoutObservable<number>;
            totalCount?: KnockoutObservable<number>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\QueryBaseNavigator.d.ts
declare module "Fx/Internal/Data/QueryBaseNavigator" {
    export = QueryBaseNavigator;
    import SortOrder = FxImpl.Data.SortOrder;
    import NavigatorOptions = FxImpl.Data.NavigatorOptions;
    import Property = FxImpl.Data.Property;
    import Expressions = FxImpl.Data.Expressions;
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import QueryParams = FxImpl.Data.QueryParams;
    import FxData = MsPortalFx.Data;
    import FxBase = MsPortalFx.Base;
    import FxPromise = FxBase.Promise;
    import FxPromiseV = FxBase.PromiseV;
    import Promises = FxBase.Promises;
    import CancelationToken = Promises.CancelationToken;
    class QueryBaseNavigator<T, TData, TId, TParams> {
        protected _items: KnockoutObservableArray<NavigatorItem<T, TId>>;
        /**
         * The exposed properties supported by the items in the data cache.
         */
        properties: Property[];
        /**
         * The allowed operation for this data source.
         */
        allowedFilterExpressions: Expressions.AllowedExpressions;
        /**
         * The requested search terms.
         */
        searchText: KnockoutObservable<string>;
        /**
         * The filter expression.
         */
        filterExpression: KnockoutObservable<Expressions.Expression>;
        /**
         * The columns to sort by.
         */
        sortOrder: KnockoutObservableArray<SortOrder>;
        /**
         * The columns to select for values in the data row.
         */
        selectedProperties: KnockoutObservableArray<Property>;
        private _params;
        private _initialized;
        private _currentRequest;
        /**
         * The method for extracting the id from the data item.
         */
        private _getId;
        private _getModel;
        protected _getParams: (navigatorParams: QueryParams, params: TParams) => TParams;
        protected _queryCache: FxData.QueryCache<TData, TParams>;
        protected _lifetimeManager: FxBase.DisposableLifetimeManager;
        constructor(options: QueryBaseNavigator.Options<T, TData, TId, TParams>);
        /**
         * Disposes resources.
         */
        dispose(): void;
        readonly initialized: FxPromise;
        readonly params: KnockoutObservable<TParams>;
        /**
         * The query cache.
         */
        readonly queryCache: FxData.QueryCache<TData, QueryParams>;
        protected _throw(message: string): void;
        /**
         * Validates that skip and take are within the array bounds.
         */
        protected _validateBounds(skip: number, take: number): void;
        /**
         * Validates the take count.
         */
        protected _validateCount(take: number): void;
        /**
         * Validates data source state.
         */
        protected _validateState(): void;
        protected _createItems(dataItems: TData[], models?: T[]): NavigatorItem<T, TId>[];
        /**
         * Maps the array
         */
        protected _map(dataItems: TData[]): NavigatorItem<T, TId>[];
        private _updateItems(items, models);
        /**
         * Begins a new request and returns the cancelation token for it.
         * If there is an existing request it will be canceled.
         *
         * @return The request cancelation token.
         */
        protected _beginRequest(): CancelationToken;
        /**
         * Marks a request as completed.
         * This prevents the next _beginRequest from attempting to cancel it.
         *
         * @param cancelationToken The request cancelation token from _beginRequest.
         */
        protected _endRequest(cancelationToken: CancelationToken): void;
    }
    module QueryBaseNavigator {
        interface Options<T, TData, TId, TParams> extends NavigatorOptions<T, TData, TId> {
            /**
             * The lifetime manager for the data navigator.
             */
            lifetimeManager?: FxBase.LifetimeManager;
            /**
             * The query cache for retrieving data.
             */
            queryCache?: FxData.QueryCache<TData, TParams>;
            getParams?: (navigatorParams: QueryParams, params: TParams) => TParams;
            /**
             * The method for obtaining the id.
             */
            getId?: (data: TData) => TId;
            getModel?: (data: TData[]) => T[] | FxPromiseV<T[]>;
            /**
             * The available columns of the data.
             */
            properties?: Property[];
            /**
             * Filters that are allowed on the instance of the data source.
             */
            allowedFilterExpressions?: Expressions.AllowedExpressions;
            /**
             * Handler for adding extended properties to the data row.
             */
            initialized?: FxPromise;
            params?: TParams | KnockoutObservable<TParams>;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\QueryDemandLoadNavigator.d.ts
declare module "Fx/Internal/Data/QueryDemandLoadNavigator" {
    export = QueryDemandLoadNavigator;
    import QueryBaseNavigator = require("Fx/Internal/Data/QueryBaseNavigator");
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import DemandLoadNavigatorOptions = FxImpl.Data.DemandLoadNavigatorOptions;
    import PagedDemandLoadNavigator = FxImpl.Data.PagedDemandLoadNavigator;
    import FxData = MsPortalFx.Data;
    import FxBase = MsPortalFx.Base;
    class QueryDemandLoadNavigator<T, TData, TId, TParams> extends QueryBaseNavigator<T, TData, TId, TParams> implements PagedDemandLoadNavigator<T, TData, TId> {
        items: KnockoutReadOnlyObservableArray<NavigatorItem<T, TId>>;
        canLoadMore: KnockoutReadOnlyObservableBase<boolean>;
        totalItems: KnockoutReadOnlyObservableBase<number>;
        startIndex: KnockoutReadOnlyObservableBase<number>;
        pageSize: KnockoutReadOnlyObservableBase<number>;
        protected _canLoadMore: KnockoutObservable<boolean>;
        protected _totalItems: KnockoutObservable<number>;
        protected _startIndex: KnockoutObservable<number>;
        protected _pageSize: KnockoutObservable<number>;
        protected _excludeData: (item: TData) => boolean;
        private _pendingItems;
        private _pendingCanLoadMore;
        private _continuationToken;
        protected _loadedItems: KnockoutObservableArray<TData>;
        private _projectionLifetime;
        private _pageMapProjection;
        private _view;
        private _takeExtra;
        private _refreshing;
        constructor(options: QueryDemandLoadNavigator.Options<T, TData, TId, TParams>);
        private _disposeProjections();
        private _setProjections();
        private _loadMoreRequest;
        /**
         * Gets more rows when using continuation based access.
         */
        loadMore(take?: number): FxBase.Promise;
        private _lastLoadByContinuationRequest;
        /**
         * Requests rows by continuation until count has been returned or the end of the data.
         */
        private _loadByContinuation(cancelationToken, last, takeExtra?, force?);
        private _loadByContinuationRecursive(cancelationToken, last, takeExtra?, force?);
        /**
         * Refreshes the navigator
         *
         * @param force if set to true, the navigator will also refresh the query view.
         */
        refresh(force?: boolean): FxBase.Promise;
        loadPage(skip: number, take: number): FxBase.Promise;
        /**
         * Removes items from the current view using the excludeData function.
         */
        protected _removeExcludedItems(): void;
    }
    module QueryDemandLoadNavigator {
        interface Options<T, TData, TId, TParams> extends DemandLoadNavigatorOptions<T, TData, TId>, QueryBaseNavigator.Options<T, TData, TId, TParams> {
            /**
             * The lifetime manager for the data navigator.
             */
            lifetimeManager: FxBase.LifetimeManager;
            /**
             * The query cache for retrieving data.
             */
            queryCache: FxData.QueryCache<TData, TParams>;
            /**
             * The method for obtaining the id.
             */
            getId: (data: TData) => TId;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\QueryListNavigator.d.ts
declare module "Fx/Internal/Data/QueryListNavigator" {
    export = QueryListNavigator;
    import MapProjection = require("Fx/Internal/Data/MapProjection");
    import QueryBaseNavigator = require("Fx/Internal/Data/QueryBaseNavigator");
    import NavigatorItem = FxImpl.Data.NavigatorItem;
    import ListNavigatorOptions = FxImpl.Data.ListNavigatorOptions;
    import PagedListNavigator = FxImpl.Data.PagedListNavigator;
    import FxData = MsPortalFx.Data;
    import FxBase = MsPortalFx.Base;
    import DisposableLifetimeManager = FxBase.DisposableLifetimeManager;
    class QueryListNavigator<T, TData, TId, TParams> extends QueryBaseNavigator<T, TData, TId, TParams> implements PagedListNavigator<T, TData, TId> {
        items: KnockoutReadOnlyObservableArray<NavigatorItem<T, TId>>;
        totalItems: KnockoutReadOnlyObservableBase<number>;
        startIndex: KnockoutReadOnlyObservableBase<number>;
        pageSize: KnockoutReadOnlyObservableBase<number>;
        canLoadMore: KnockoutReadOnlyObservableBase<boolean>;
        protected _totalItems: KnockoutObservable<number>;
        protected _startIndex: KnockoutObservable<number>;
        protected _pageSize: KnockoutObservable<number>;
        protected _canLoadMore: KnockoutObservable<boolean>;
        protected _projectionLifetime: DisposableLifetimeManager;
        protected _mapProjection: MapProjection<TData, NavigatorItem<T, TId>>;
        private _view;
        /**
         * Constructs and datasource for an observable array.
         *
         * @param options Option for constructing the data source.
         */
        constructor(options: QueryListNavigator.Options<T, TData, TId, TParams>);
        /**
         * Resets the data source.
         */
        refresh(): FxBase.Promise;
        /**
         * Gets a span of rows.
         */
        loadAll(): FxBase.Promise;
        /**
         * Gets a span of rows.
         */
        loadPage(skip: number, take: number): FxBase.Promise;
        private _setProjections(dataItems);
    }
    module QueryListNavigator {
        interface Options<T, TData, TId, TParams> extends ListNavigatorOptions<T, TData, TId>, QueryBaseNavigator.Options<T, TData, TId, TParams> {
            /**
             * The lifetime manager for the data navigator.
             */
            lifetimeManager: FxBase.LifetimeManager;
            /**
             * The query cache for retrieving data.
             */
            queryCache: FxData.QueryCache<TData, TParams>;
            /**
             * The method for obtaining the id.
             */
            getId: (data: TData) => TId;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Data\SortProjection.d.ts
declare module "Fx/Internal/Data/SortProjection" {
    export = SortProjection;
    import BaseProjection = require("Fx/Internal/Data/BaseProjection");
    class SortProjection<T> extends BaseProjection<T, T> {
        private _compare;
        constructor(options: SortProjection.Options<T>);
        refresh(): void;
        protected _update(sourceEdits: KnockoutArrayEdit<T>[]): void;
    }
    module SortProjection {
        interface Options<T> extends BaseProjection.Options<T, T> {
            compare: (item1: T, item2: T) => number;
        }
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Internal\Utils\KnockoutArrayUtils.d.ts
declare module "Fx/Internal/Utils/KnockoutArrayUtils" {
    export = KnockoutArrayUtils;
    module KnockoutArrayUtils {
        /**
         * KnockoutArrayEdit added status.
         */
        const EditStatusAdded: string;
        /**
         * KnockoutArrayEdit deleted status.
         */
        const EditStatusDeleted: string;
        /**
         * KnockoutArrayEdit retained status.
         */
        const EditStatusRetained: string;
        /**
         * Creates edits for the target array corresponding to the edits from the source array.
         *
         * @param edits The source array edits.
         * @param target The array to target.
         * @param mapFuns Maps edit items to target array items when creating new entries for the target array.
         * @return A new set of edits for the target array.
         */
        function mapArrayEdits<T, U>(edits: KnockoutArrayEdit<T>[], target: U[], mapFunc: (value: T) => U): KnockoutArrayEdit<U>[];
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Pinner.d.ts
declare module "Fx/Pinner" {
    export = Main;
    module Main {
        import FxBase = MsPortalFx.Base;
        import FxRpc = FxImpl.Rpc;
        import FxComposition = MsPortalFx.Composition;
        /**
         * Options that can be passed when calling the pin function.
         */
        interface Options {
            /**
             * The value to indicate whether to show a notification or not.
             */
            notify: boolean;
        }
        module Internal {
            /**
             * RPC endpoint to pin provided parts.
             */
            const pinEndPoint: FxRpc.FuncEndPointDefinition<PinParams, string>;
            /**
             * Options that must be passed when calling the pin function.
             */
            interface PinParams {
                /**
                 * Parts to pin to the dashboard.
                 */
                parts: FxComposition.PartReference<any>[];
                /**
                 * The value to indicate whether to show a notification or not.
                 */
                options?: Options;
            }
        }
        /**
         * Pins the specified parts to the currently opened dashboard.
         *
         * @param parts Parts to pin to the dashboard.
         * @param options Optional arguments used by the function.
         * @return A promise that resolves to completion of pinning.
         */
        function pin(parts: FxComposition.PartReference<any>[], options?: Options): FxBase.Promise;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework.Client\TypeScript\Fx\Specs\DropDown.d.ts
declare module "Fx/Specs/DropDown" {
    export = Main;
    module Main {
        import FxViewModels = MsPortalFx.ViewModels;
        import Specs = MsPortalFx.Azure.ResourceManager.Pickers.Specs;
        import FxForms = FxViewModels.Forms;
        import SpecPicker = HubsExtension.Azure.SpecPicker;
        /**
         * A spec picker drop down which will show promotoed features of the specs available.
         */
        module DropDown {
            /**
             * Inteface to select the pricing blade on a spec drop down
             */
            interface PricingBladeSelection extends FxViewModels.DynamicBladeSelection {
                /**
                 * An identifying string for the hotspot. Must be unique from all other hotspots
                 * on the part so that the parameter provider can hook into the collector correctly
                 * advise name spacing as well e.g. "Spec.DropDown.Foo1"
                 */
                hotspot: string;
            }
            /**
             * Options for the spec picker dropdown
             */
            interface Options extends FxForms.Base.Input.Options<string> {
                /**
                 * The spec picker extender viewmodel which will be used to display specs to be picked
                 */
                specPickerExtender: SpecPicker.SpecPickerExtender;
                /**
                 * A callback that supplies initial data for the parameter provider
                 * in the child blade each time it opens.
                 *
                 * Note that the object received by the parameter provider will be a
                 * deep clone of the value you give, rather than the original instance,
                 * because it is passed (and sometimes stored) in a serialized form.
                 *
                 * @return Initial data for the child blade.
                 */
                initialData: KnockoutObservableBase<Specs.InitialData>;
                /**
                 * The Form ViewModel for the selector control.
                 */
                form?: FxForms.Form.ViewModel<any>;
                /**
                 * The path to the property on the Form data model being set
                 * Used instead of accessor
                 */
                accessor?: FxForms.EditScopeAccessors<Specs.Result>;
                /**
                 * The pricing blade to open
                 */
                pricingBlade?: PricingBladeSelection;
                /**
                 * This will map the spec to the name in option for the dropdown
                 * defaults to spec code
                 */
                specNameMap?: (spec: SpecPicker.Spec) => string;
            }
            /**
             * This is a section which has on it a selectable on it.
             * This is to keep a consistent api with the spec selector
             * and infobox with the control having a selectable
             */
            interface SelectableSection extends FxForms.Section.ViewModel {
                /**
                 * The selectable on the section control to be bound to
                 * in the pdl
                 */
                selectable?: FxViewModels.Selectable<any>;
            }
        }
        /**
         * DropDown which creates a collector and selector that launches a spec picker blade
         */
        class DropDown {
            /**
             * ParameterCollector created to interface with the spec picker blade ParameterProvider
             */
            collector: FxViewModels.ParameterCollector<SpecPicker.ParameterCollectionV3.SpecPickerProviderCollectorParameter>;
            /**
             * The info box control.
             */
            control: DropDown.SelectableSection;
            /**
             * Click handler for the label
             */
            labelClick: () => void;
            /**
             * The selected spec(s).
             */
            value: KnockoutObservable<Specs.Result>;
            /**
             * Constructs a drop down for specs that can launch a specpicker blade
             *
             * @param container The container associated with the part or other composition item hosting this parameter collector.
             * @param DropDown options that extends both the colector and the BaseDropDownOptions
             */
            constructor(container: FxViewModels.ContainerContract, options: DropDown.Options);
        }
    }
}
