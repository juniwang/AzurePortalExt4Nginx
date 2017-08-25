/// <reference path="Html5.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="knockout.d.ts" />

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\Controls\Visualization\Donut.d.ts
declare module MsPortalFx.ViewModels.Controls.Visualization.Donut {
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollection\ParameterProvider.d.ts
declare module MsPortalFx.ViewModels.ParameterCollection {
    import FxBase = MsPortalFx.Base;
    /**
     * The contract for the parameter collection "provider" role.
     * Enables the implementer to communicate collected parameters back to a parameter collector.
     */
    interface ParameterProvider {
        /**
         * Overrides the input parameters that were obtained from the provider.
         *
         * @param inputParameters The input parameters (dictionary of sets of key-value pairs).
         * @return A Promise object that signals when processing the inputs is complete (async).
         */
        overrideInputParameters(inputParameters: StringMap<StringMap<string>>): FxBase.PromiseV<StringMap<StringMap<string>>>;
        /**
         * Triggered when the inputs from the collector are ready.
         *
         * @param inputs The inputs from the collector.
         * @return A Promise object that signals when processing the inputs is complete (async).
         */
        onInputsReceived(inputs: ParameterCollectionInput): FxBase.Promise;
        /**
         * Gets the outputs that will be commited to the collector. Called when the changes in the
         * provider are commited.
         *
         * @return The outputs from the provider.
         */
        getOutputsToCommit(): ParameterCollectionOutput;
        /**
         * Triggered if the collector raises errors after the commit.
         *
         * @param errors The errors raised by the collector.
         */
        onCommitError(errors: ParameterCollectionError[]): void;
    }
}
declare module MsPortalFx.ViewModels.ParameterCollection.Internal {
    import FxBase = MsPortalFx.Base;
    import FxPromise = FxBase.Promise;
    import ParameterCollection = MsPortalFx.ViewModels.ParameterCollection;
    import EditScopeViewContract = MsPortalFx.Data.EditScopeViewContract;
    interface OnCollectorBindingInternalsReceivedResult {
        /**
         * True if provisioning is enabled for current entity; else false.
         */
        enableProvisioning: boolean;
        /**
         * Promise that resolves when edit scope has been fetched and onInputsReceived callback has completed.
         */
        promise: FxPromise;
    }
    interface CommitProviderOptions {
        /**
         * True if provisioning is enabled for current entity; else false.
         */
        enableProvisioning: boolean;
        /**
         * Provisioner to use to commit the provider.
         */
        provisioner: IProvisioner;
        /**
         * Outputs to use for provisioning.
         */
        provisionerData: ParameterCollection.ParameterCollectionOutput;
        /**
         * Options to use for provisioning.
         */
        provisionerOptions: StringMap<any>;
        /**
         * Callback used to setup UI indication that provisioning is in progress.
         */
        progressAction?: (promise: FxPromise) => void;
        /**
         * Callback used to discard edits.
         */
        discardEdits?: () => void;
        /**
         * Binding internals for the provider.
         */
        privateFpTcBI: ProviderBindingInternals;
        /**
         * Binding internals for the provisioner.
         */
        privatePcPrBI?: ProvisioningEntityBindingInternals;
        /**
         * True if provision is to be done on start board; else false.
         */
        provisionOnStartboardPart?: boolean;
    }
    class ProviderBase {
        private _editScopeView;
        private _editScopeFetchPromise;
        private _onInputsReceivedPromise;
        private _previousCollectorInputs;
        /**
         * Creates the provider internal instance.
         *
         * @param editScopeView The edit scope view used by the provider.
         */
        constructor(editScopeView: EditScopeViewContract<Object, ParameterCollection.ParameterCollectionInput>);
        /**
         * Fetches the edit scope.
         *
         * @param editScopeId The ID of the edit scope to fetch.
         * @param collectorInputs The inputs obtained from the collector.
         * @return The promise that resolves once the edit scope has been fetched.
         */
        fetchEditScope(editScopeId: string, collectorInputs: ParameterCollection.ParameterCollectionInput): FxPromise;
        /**
         * Initializes the data model for a provider.
         *
         * @param inputs The inputs from the collector.
         * @param overrideInputParameters Callback that can be used to override the default values in the input parameters.
         * @return A promise that resolves when the 'existing data' for the edit scope has been initialized.
         */
        initializeDataModel(inputs: ParameterCollection.ParameterCollectionInput, overrideInputParameters: (inputParameters: StringMap<StringMap<string>>) => FxBase.PromiseV<StringMap<StringMap<string>>>): JQueryPromiseV<any>;
        /**
         * Executed when collector binding internals have been received.
         *
         * @param collectorInputs Inputs obtained from the collector.
         * @param editScopeId The ID of the edit scope for use by the provider.
         * @param onInputsReceived The onInputsReceived callback exposed by the provider.
         * @return The result containing the promise that resovles once operation completes and the enableProvisioning flag.
         */
        onCollectorBindingsReceived(collectorInputs: ParameterCollection.ParameterCollectionInput, editScopeId: string, onInputsReceived: (inputs: ParameterCollection.ParameterCollectionInput) => FxPromise): OnCollectorBindingInternalsReceivedResult;
        /**
         * Commits the provider.
         *
         * @param options The parameters used to commit the provider.
         */
        commitProvider(options: CommitProviderOptions): void;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollection\ViewModels.BaseCommand.d.ts
declare module MsPortalFx.ViewModels.ParameterCollection {
    import FxViewModels = MsPortalFx.ViewModels;
    import FxParameterCollectionInternal = Internal;
    import Wizard = FxViewModels.Controls.Wizard;
    /**
     * The contract for the view model for a parameter collection command.
     */
    interface BaseCommandContract extends ParameterCollector, FxParameterCollectionInternal.ParameterCollectorBinding, FxParameterCollectionInternal.ProvisioningEntity {
        /**
         * The previously saved state of the wizard.
         */
        savedState: KnockoutObservable<Wizard.WizardState>;
        /**
         * The current state of the wizard to be saved.
         */
        currentState: KnockoutObservable<Wizard.WizardState>;
        /**
         * The input data for the current step.
         */
        stepInput: KnockoutObservable<Wizard.StepInput>;
    }
    /**
     * The base class for a parameter collection command (collector only).
     */
    class BaseCommandViewModel extends OpenBladeCommand implements BaseCommandContract {
        /**
         * See interface.
         */
        parameterCollectionErrors: KnockoutObservable<ParameterCollectionError[]>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: FxParameterCollectionInternal.CollectorBindingInternals;
        /**
         * See interface.
         */
        savedState: KnockoutObservable<Wizard.WizardState>;
        /**
         * See interface.
         */
        currentState: KnockoutObservable<Wizard.WizardState>;
        /**
         * See interface.
         */
        stepInput: KnockoutObservable<Wizard.StepInput>;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: FxParameterCollectionInternal.ProvisioningEntityBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        cloudName: KnockoutObservable<string>;
        /**
         * See interface.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        private _collectorBase;
        private _container;
        /**
         * Constructs the view model.
         */
        constructor(container: FxViewModels.CommandContainerContract, initialState: any);
        onInputsSet(inputs: any): void;
        /**
         * Gets the inputs for a given provider.
         *
         * @param providerId The id of the provider.
         * @return The inputs for the provider.
         */
        getProviderInputs(providerId: string): ParameterCollectionInput;
        /**
         * Reacts when a provider commits its output parameters.
         *
         * @param providerId The id of the provider.
         * @param outputs The outputs from the provider.
         * @return A JQuery promise (boolean) dictating whether to allow or deny the commit action.
         */
        onProviderCommit(providerId: string, outputs: ParameterCollectionOutput): MsPortalFx.Base.PromiseV<boolean>;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollection\ViewModels.BaseForm.d.ts
declare module MsPortalFx.ViewModels.ParameterCollection {
    import Fx = MsPortalFx;
    import FxBase = Fx.Base;
    import FxPromise = FxBase.Promise;
    import FxPromiseV = FxBase.PromiseV;
    import FxViewModels = Fx.ViewModels;
    import ActionBars = FxViewModels.ActionBars.Base;
    import ParameterCollectionInternal = Internal;
    /**
     * The interface for a parameter collection form part (collector only, with no chevrons).
     */
    interface FormPartContract {
    }
    /**
     * The base class for a parameter collection form part (collector only, with no chevrons).
     */
    class BaseFormViewModel<T> extends FxViewModels.Forms.Form.ViewModel<T> implements FxBase.Disposable, ParameterCollectionInternal.ParameterCollectorBinding, ParameterCollectionInternal.ParameterProviderBinding, ParameterCollectionInternal.ProvisioningEntity, FormPartContract {
        /**
         * The edit scope id.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * Errors to send to the provider.
         */
        parameterCollectionErrors: KnockoutObservable<ParameterCollectionError[]>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: ParameterCollectionInternal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: ParameterCollectionInternal.ProviderBindingInternals;
        /**
         * Indicates whether the entity will perform a provisioning command or not.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        provisionOnStartboardPart: KnockoutObservable<boolean>;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: ParameterCollectionInternal.ProvisioningEntityBindingInternals;
        /**
         * An instance of MsPortalFx.ViewModels.Selectable to activate selectors.
         */
        selectable: Selectable<any>;
        /**
         * An instance of MsPortalFx.ViewModels.Selectable to activate the action bar's secondary link.
         */
        secondaryLinkSelectable: Selectable<DynamicBladeSelection>;
        /**
         * An instance of MsPortalFx.ViewModels.Selectable to activate hot spots.
         */
        hotSpot: SelectableSet<Selectable<any>, DynamicBladeSelection>;
        /**
         * The input to pass on to the action bar of the details blade.
         */
        stepInput: KnockoutObservable<ActionBars.ActionBarInput>;
        /**
         * The output received from the action bar of the details blade.
         */
        stepOutput: KnockoutObservable<ActionBars.ActionBarOutput>;
        /**
         * Indicates whether an action is in progress or not.
         * An action in progress will disable the action bar regardless of the validity of the form.
         */
        actionInProgress: KnockoutObservable<boolean>;
        /**
         * The summary and/or link to the EULA for the create step.
         */
        eula: KnockoutObservable<string>;
        /**
         * The display text for the link to the right of the create button.
         */
        secondaryLinkDisplayText: KnockoutObservable<string>;
        /**
         * Gallery create pricing information.
         */
        galleryPricingInfo: KnockoutObservable<HubsExtension.Azure.Pricing.PricingInfo>;
        /**
         * See interface.
         */
        cloudName: KnockoutObservable<string>;
        /**
         * Provider base that for composed functionality. Used by tests.
         */
        _providerBase: ParameterCollectionInternal.ProviderBase;
        private _actionBarOutput;
        private _actionInProgressLock;
        private _baseCollectorInputs;
        private _baseFormContainer;
        private _baseFormSubscriptions;
        private _baseProviderCommit;
        private _baseProviderOutputs;
        private _deferredProviderDismiss;
        private _hotSpotItems;
        private _initialSelectedValue;
        private _previousOutput;
        private _previousSecondaryLinkCommitId;
        private _provisionerInstance;
        private _savedProviderOutputs;
        private _selectableMap;
        private _galleryItem;
        /**
         * EditScope cache.
         */
        _editScopeCache: MsPortalFx.Data.EditScopeCache<Object, ParameterCollectionInput>;
        /**
         * EditScope view.
         */
        _editScopeView: MsPortalFx.Data.EditScopeView<Object, ParameterCollectionInput>;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         * @param dataModelTypeName The metadata type name used in the creation of the edit
         *      scope. If you set this property, you need to define/set your metadata type first.
         *      You can define it using: MsPortalFx.Data.Metadata.setTypeMetadata().
         */
        constructor(container: FxViewModels.PartContainerContract, initialState?: any, dataModelTypeName?: string);
        /**
         * Get an editable copy of the editScope view model.
         *
         * @return The editable copy of the editScope view model.
         */
        readonly dataModel: T;
        /**
         * Invoked when the Part's inputs change.
         */
        onInputsSet(inputs: any): FxPromise;
        /**
         * Registers a hot-spot with the form for opening the blade.
         *
         * @param hotSpotViewModel The selectable that is bound to the hot spot.
         */
        registerHotSpot(hotSpotViewModel: FxViewModels.Selectable<any> | FxViewModels.Controls.HotSpot.ViewModel): void;
        /**
         * Registers a selector with the form for opening the blade that provides values to it.
         *
         * @param id The ID for the form to uniquely identify the selector.
         * @param selectorField The selector form field to be registered.
         */
        registerSelector(id: string, selectorField: FxViewModels.Forms.Selector.ViewModel<any>): void;
        /**
         * See interface.
         */
        overrideInputParameters(inputParameters: StringMap<StringMap<string>>): FxPromiseV<StringMap<StringMap<string>>>;
        /**
         * Gets the inputs for a given provider.
         *
         * @param providerId The id of the provider.
         * @return The inputs for the provider.
         */
        getProviderInputs(providerId: string): ParameterCollectionInput;
        /**
         * Reacts when a provider commits its output parameters.
         *
         * @param providerId The id of the provider.
         * @param outputs The outputs from the provider.
         * @return A JQuery promise (boolean) dictating whether to allow or deny the commit action.
         */
        onProviderCommit(providerId: string, outputs: ParameterCollectionOutput): FxPromiseV<boolean>;
        /**
         * Triggered when the inputs from the collector are ready.
         *
         * @param inputs The inputs from the collector.
         * @return A Promise object that signals when processing the inputs is complete (async).
         */
        onInputsReceived(inputs: ParameterCollectionInput): FxPromise;
        /**
         * Gets the outputs that will be commited to the collector.
         *
         * @return The outputs from the provider.
         */
        getOutputsToCommit(): ParameterCollectionOutput;
        /**
         * Triggered if the collector raises errors after the commit.
         *
         * @param errors The errors raise by the collector.
         */
        onCommitError(errors: ParameterCollectionError[]): void;
        /**
         * See interface.
         */
        dispose(): void;
        private _unselectFields(exceptionSelector?);
        private _resetSelectionStateOfSelectors(value);
        private _onSelectorLoad(selectorId);
        private _onSelectorComplete(selectorId);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollection\ViewModels.BasePickerList.d.ts
declare module MsPortalFx.ViewModels.ParameterCollection {
    import FxBase = MsPortalFx.Base;
    import FxViewModels = MsPortalFx.ViewModels;
    import FxControls = FxViewModels.Controls;
    import FxGrid = FxControls.Lists.Grid;
    import FxPromise = FxBase.Promise;
    import FxPromiseV = FxBase.PromiseV;
    import ActionBarsBase = FxViewModels.ActionBars.Base;
    import SelectorViewModel = FxViewModels.Forms.Selector.ViewModel;
    import DynamicBladeSelection = FxViewModels.DynamicBladeSelection;
    import ParameterCollectionInternal = Internal;
    /**
     * Pickers list Interface.
     * The contract to support data for pickers and providing grid options as required by consumer.
     */
    interface PickerList<TItem> {
        /**
         * Gets the columns list for the Picker Grid.
         *
         * @return The Columns list for the picker grid.
         */
        getColumns(): KnockoutObservableArray<FxGrid.Column>;
        /**
         * Gets the index number for the grid item matching with the given id.
         *
         * @param id The id to match with the grid items
         * @return The index for the matching grid item with the given id.
         */
        getMatchingItemIndex(id: any): number;
        /**
         * The items match selection criteria for the Picker grid.
         *
         * @param item Item from the picker grid.
         * @param selection Selection from the grid createSelection interface.
         * @return The result that identifies whether item matches the selection.
         */
        itemMatchesSelection(item: TItem, selection: any): boolean;
        /**
         * A factory function that returns selection based on a grid item.
         *
         * @param item Item from the picker grid.
         * @return Returns the selection based on an grid item selected.
         */
        createSelection(item: TItem): any;
        /**
         * The header of the list.
         */
        listHeader: KnockoutObservable<string>;
        /**
         * The subheader of the list.
         */
        listSubHeader: KnockoutObservable<string>;
        /**
         * The summary and/or link to the EULA.
         */
        eula: KnockoutObservable<string>;
    }
    interface PickerListPartContract<TItem> extends PickerList<TItem> {
    }
    /**
     * Pickers list base view model implements Parameter Collector and Provider Bindings.
     */
    class BasePickerListViewModel<TItem, TDataModel> extends FxControls.Loadable.ViewModel implements FxBase.Disposable, ParameterCollectionInternal.ParameterCollectorBinding, ParameterCollectionInternal.ParameterProviderBinding {
        /**
         * The edit scope id for picker.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * The grid view model for picker items.
         */
        itemsGridViewModel: FxGrid.ViewModel<TItem, any>;
        /**
         * Triggers the select action.
         */
        triggerSelectAction: KnockoutObservable<string>;
        /**
         * See interface.
         */
        multiselectEnabled: KnockoutObservable<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutObservable<boolean>;
        /**
         * The flag to indicate whether create action visible or not.
         */
        showCreateAction: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        eula: KnockoutObservable<string>;
        /**
         * Errors to send to the provider. Do not use.
         */
        parameterCollectionErrors: KnockoutObservable<ParameterCollectionError[]>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: ParameterCollectionInternal.CollectorBindingInternals;
        /**
         * The parameter names for picker grid options.
         */
        filterPickerItemsParameterName: string;
        pickerItemsParameterName: string;
        /**
         * The List Header string to show on picker list part.
         */
        listHeader: KnockoutObservable<string>;
        /**
         * The List sub header string to show on picker list part.
         */
        listSubHeader: KnockoutObservable<string>;
        /**
         * The flag to indicate whether create Action providing the result from picker.
         */
        isCreateActionResult: KnockoutObservable<boolean>;
        /**
         * The create action outputs to return back to picker control invoker.
         */
        _createActionOutputs: ParameterCollectionOutput;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: ParameterCollectionInternal.ProviderBindingInternals;
        /**
         * The wizard step input provided as input to picker.
         */
        stepInput: KnockoutObservable<ActionBarsBase.ActionBarInput>;
        /**
         * The create action selector field.
         */
        createActionSelectorField: KnockoutObservable<SelectorViewModel<string>>;
        /**
         * The picker list activation blade opener to open the dynamic blade based on picker requirement.
         */
        pickerActivationBladeOpener: KnockoutObservable<DynamicBladeSelection>;
        /**
         * The create blade opener to open the dynamic blade based on inputs.
         */
        createActionBladeOpener: KnockoutObservable<DynamicBladeSelection>;
        /**
         * The item selected by default in the grid.
         */
        itemSelectedByDefault: KnockoutObservable<any>;
        /**
         * The filterItems provided by the picker invoker as options.
         */
        filterItems: KnockoutObservable<any>;
        private _filteredItems;
        /**
         * EditScope cache.
         */
        _editScopeCache: MsPortalFx.Data.EditScopeCache<Object, ParameterCollectionInput>;
        /**
         * EditScope view.
         */
        _editScopeView: MsPortalFx.Data.EditScopeView<Object, ParameterCollectionInput>;
        _providerBase: ParameterCollectionInternal.ProviderBase;
        /**
         * The inputs provided to picker stored here to provide these to selection action.
         */
        private _pickerInputCollections;
        /**
         * The flag to indicate whether the create action provider commited output or not.
         */
        private _createActionProviderCommited;
        private _actionBarOutput;
        /**
         * The selector field properties for create action.
         */
        private _createSelectorField;
        private _selectorOriginalValue;
        private _selectorEditableValue;
        private _createSelectorBladeName;
        private _createSelectorBladeExtension;
        private _throttleUnselectSelectorFieldHandle;
        /**
         * The part container local variable.
         */
        private _partContainer;
        /**
         * The set of filters to filter items on.
         */
        filters: KnockoutObservableArray<FxViewModels.PickerFilter.IPickerItemsFilter<TItem>>;
        /**
         * Constructs a new picker list view model.
         *
         * @param container The container into which the part is being placed.
         * @param initialState Initial state for the part.
         * @param items The Obervable array of picker items of type TItem to populate.
         * @param multiselect Optional. True if the picker supports multiple selection. Defaults to false.
         */
        constructor(container: PartContainerContract, initialState: any, items: KnockoutObservableArray<TItem>, multiselect?: boolean, dataNavigator?: MsPortalFx.Data.DataNavigatorBase<any>);
        /**
         * Initializes Create Selector on Picker Blade with given blade action inputs.
         *
         * @param initialValue The initial value Selector uses.
         * @param createActionTitle The title for Selector control.
         * @param createActionBladeName The blade name to launch on Selector selection.
         * @param createActionBladeExtension The optional field for extension name to launch the create action blade from that extension.
         * @param validations The optional field for validations to apply on this selector field.
         */
        initializeCreateSelector(initialValue: string, createActionTitle: string, createActionBladeName: string, createActionBladeExtension?: string, validations?: FxViewModels.FormValidation[]): void;
        /**
         * Invoked when the Part's inputs change.
         *
         * @param inputs Inputs is collection of input and output parameters to blade.
         * @return Promise for onInputsSet to notify completion.
         */
        onInputsSet(inputs: any): FxPromise;
        /**
         * See interface.
         */
        overrideInputParameters(inputParameters: StringMap<StringMap<string>>): FxPromiseV<StringMap<StringMap<string>>>;
        /**
         * Gets the parameter given from the list of parameters given.
         *
         * @param parameterName The parameterName to get from collection.
         * @param parameters The collection of parameters.
         * @return The parameter value from collection.
         */
        getParameter<T>(parameterName: string, parameterSetName: string, parameters: StringMap<StringMap<T>>): T;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * Get the data model bound to the provider. This is where all parameter collection data
         * are persisted.
         *
         * @return The data model.
         */
        readonly dataModel: TDataModel;
        /**
         * See interface.
         */
        getMatchingItemIndex(id: any): number;
        /**
         * See interface.
         */
        getColumns(): KnockoutObservableArray<FxGrid.Column>;
        /**
         * See interface.
         */
        itemMatchesSelection(item: TItem, selection: any): boolean;
        /**
         * See interface.
         */
        createSelection(item: TItem): any;
        /**
         * See interface.
         */
        getProviderInputs(providerId: string): ParameterCollectionInput;
        /**
         * See interface.
         */
        onProviderCommit(providerId: string, outputs: ParameterCollectionOutput): FxPromiseV<boolean>;
        /**
         * See interface.
         */
        onInputsReceived(inputs: ParameterCollectionInput): FxPromise;
        /**
         * See interface.
         */
        getOutputsToCommit(): ParameterCollectionOutput;
        /**
         * See interface.
         */
        onCommitError(errors: ParameterCollectionError[]): void;
        private _onSelectedItemsChanged(selectedItems);
        private _runFilters(items);
        private _closeBlade(selectedItems);
        private _clearThrottleUnselectSelectorFieldHandle();
        /**
         * Gets Grid Extension Options.
         *
         * @return Grid Extension options with select type and other grid extension options
         */
        private _getGridExtensionOptions();
        /**
         * Selects the grid item based on given index.
         *
         * @param index Row index to select in the grid.
         */
        private _selectGridItem(index);
        /**
         * Disables the specified grid item ..
         *
         * @param item Item to disable in the grid.
         * @param reason Reason for disabling the row in the grid.
         */
        private _disableGridItem(item, reason);
        /**
         * Initialize create action selector with defaults.
         */
        private _initializeCreateActionSelector();
        /**
         * Launch create action blade with the inputs required.
         */
        private _launchCreateActionBlade();
        /**
         * Filter Grid Items.
         */
        private _filterGridItems(filterValues);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollection\ViewModels.BaseWizard.d.ts
declare module MsPortalFx.ViewModels.ParameterCollection {
    import FxBase = MsPortalFx.Base;
    import FxPromise = FxBase.Promise;
    import FxPromiseV = FxBase.PromiseV;
    import FxViewModels = MsPortalFx.ViewModels;
    import FxWizard = FxViewModels.Controls.Wizard;
    import ActionBarBase = FxViewModels.ActionBars.Base;
    import ParameterCollectionInternal = Internal;
    interface WizardPartContract extends FxWizard.Contract {
    }
    /**
     * The base class for a parameter collection wizard part (collector and provider).
     */
    class BaseWizardViewModel<T> extends FxWizard.ViewModel implements FxBase.Disposable, ParameterCollectionInternal.ParameterCollectorBinding, ParameterCollectionInternal.ParameterProviderBinding, ParameterCollectionInternal.ProvisioningEntity, WizardPartContract {
        /**
         * The edit scope id.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * Errors to send to the provider.
         */
        parameterCollectionErrors: KnockoutObservable<ParameterCollectionError[]>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: ParameterCollectionInternal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: ParameterCollectionInternal.ProviderBindingInternals;
        /**
         * Indicates whether the entity will perform a provisioning command or not.
         * Set this true to enable the provisioning logic.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        provisionOnStartboardPart: KnockoutObservable<boolean>;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: ParameterCollectionInternal.ProvisioningEntityBindingInternals;
        /**
         * True if the form has been validated and is valid; else false.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * The summary and/or link to the EULA for the create step.
         */
        eula: KnockoutObservable<string>;
        /**
         * See interface.
         */
        cloudName: KnockoutObservable<string>;
        /**
         * EditScope cache.
         */
        private _editScopeCache;
        /**
         * EditScope view.
         */
        private _editScopeView;
        private _actionBarOutput;
        private _baseCollectorInputs;
        private _baseProviderCommit;
        private _baseProviderOutputs;
        private _baseWizardContainer;
        private _deferredProviderDismiss;
        private _providerBase;
        private _provisionerInstance;
        private _savedProviderOutputs;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         * @param dataModelTypeName The metadata type name used in the creation of the edit
         *      scope. If you set this property, you need to define/set your metadata type first.
         *      You can define it using: FxData.Metadata.setTypeMetadata().
         */
        constructor(container: FxViewModels.PartContainerContract, initialState: any, dataModelTypeName?: string);
        /**
         * Get the data model bound to the provider. This is where all parameter collection data
         * are persisted.
         *
         * @return The data model.
         */
        readonly dataModel: T;
        /**
         * Invoked when the Part's inputs change.
         */
        onInputsSet(inputs: any): FxPromise;
        /**
         * See interface.
         */
        overrideInputParameters(inputParameters: StringMap<StringMap<string>>): FxPromiseV<StringMap<StringMap<string>>>;
        /**
         * Gets the inputs for a given provider.
         *
         * @param providerId The id of the provider.
         * @return The inputs for the provider.
         */
        getProviderInputs(providerId: string): ParameterCollectionInput;
        /**
         * Reacts when a provider commits its output parameters.
         *
         * @param providerId The id of the provider.
         * @param outputs The outputs from the provider.
         * @return A JQuery promise (boolean) dictating whether to allow or deny the commit action.
         */
        onProviderCommit(providerId: string, outputs: ParameterCollectionOutput): FxPromiseV<boolean>;
        /**
         * Triggered when the inputs from the collector are ready.
         *
         * @param inputs The inputs from the collector.
         * @return A Promise object that signals when processing the inputs is complete (async).
         */
        onInputsReceived(inputs: ParameterCollectionInput): FxPromise;
        /**
         * Gets the outputs that will be commited to the collector.
         *
         * @return The outputs from the provider.
         */
        getOutputsToCommit(): ParameterCollectionOutput;
        /**
         * Triggered if the collector raises errors after the commit.
         *
         * @param errors The errors raise by the collector.
         */
        onCommitError(errors: ParameterCollectionError[]): void;
        /**
         * Adds a wizard step.
         *
         * @param stepId The ID that uniquely identifies the step.
         * @param title The title for the wizard step.
         * @param formBlade The blade containing the form for the wizard step.
         * @param description The description for the wizard step.
         * @param isOptional A value indicating whether or not the step is optional.
         * @param status The initial status of the step.
         * @param extension The extension that hosts the blade containing the form for the wizard step.
         */
        addWizardStep(stepId: string, title: string, formBlade: string, description?: string, isOptional?: boolean, status?: ActionBarBase.Status, extension?: string): void;
        /**
         * Inserts a wizard step at the specified position.
         *
         * @param position The 0 based position at which to insert the step.
         * @param stepId The ID that uniquely identifies the step.
         * @param title The title for the wizard step.
         * @param formBlade The blade containing the form for the wizard step.
         * @param description The description for the wizard step.
         * @param isOptional A value indicating whether or not the step is optional.
         * @param status The initial status of the step.
         * @param extension The extension that hosts the blade containing the form for the wizard step.
         */
        insertWizardStep(position: number, stepId: string, title: string, formBlade: string, description?: string, isOptional?: boolean, status?: ActionBarBase.Status, extension?: string): void;
        /**
         * Removes the specified wizard step.
         *
         * @param step The step to be removed.
         */
        removeWizardStep(step: FxWizard.WizardStep): void;
        /**
         * Removes the wizard step at the specified position.
         *
         * @param position The 0 based position at which to remove the step.
         * @return The step that was removed.
         */
        removeWizardStepAt(position: number): FxWizard.WizardStep;
        private _onStepLoad(step);
        private _onStepComplete(step);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\Internal\Internals.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2.Internal {
    import FxBase = MsPortalFx.Base;
    import FxPromise = FxBase.Promise;
    import FxPromiseV = FxBase.PromiseV;
    import FxData = MsPortalFx.Data;
    /**
     * The edit scope implementation for parameter collection roles.
     */
    interface EditScope<T> {
        /**
         * The inputs sent by the parameter collector.
         */
        collectorInputs: ParameterCollectionInput;
        /**
         * Gets the edit scope.
         *
         * @return The edit scope.
         */
        editScope: KnockoutObservable<FxData.EditScope<any>>;
        /**
         * Get an editable copy of the editScope view model. This view model has the same structure
         * as the parameter collection inputs received (and the optional overrides).
         *
         * @return The editable copy of the editScope view model.
         */
        dataModel: T;
        /**
         * Processes the inputs received by the view model referencing this object. This method
         * should be called inside the 'onInputsSet' method.
         *
         * @param inputs The inputs to the part.
         * @return A promise signaling the completion of processing the inputs.
         */
        processInputs(inputs: any): FxPromise;
        /**
         * Initializes the edit scope.
         */
        initializeEditScope(): void;
        /**
         * Fetches the edit scope.
         *
         * @return The promise that resolves once the edit scope has been fetched.
         */
        fetchEditScope(): FxPromise;
        /**
         * Initializes the data model.
         *
         * @param inputs The inputs from the collector.
         * @param overrideInputParameters Callback that can be used to override the default values in the input parameters.
         * @return A promise that resolves when the 'existing data' for the edit scope has been initialized.
         */
        initializeDataModel(inputs: ParameterCollectionInput, overrideInputParameters: (inputParameters: InputParameters, inputMetadata: InputMetadata, parameterCollectionOptions: ParameterCollectionOptions) => FxPromiseV<ParameterCollectionInput>): FxPromiseV<any>;
        /**
         * Discard the edits made to the edit scope.
         */
        discardEditScopeEdits(): void;
    }
    /**
     * The edit scope factory.
     */
    class EditScopeFactory {
        /**
         * Creates an instance of the edit scope implementation.
         *
         * @param providerRole The provider role implementation object.
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param initializeMethod An optional initialization method that runs once the edit scope has been created.
         * @param editScopeView An optional editScopeView object.
         * @return An instance of the edit scope  implementation.
         */
        static createEditScope<T>(providerRole: Roles.ParameterProvider, lifetimeManager: FxBase.LifetimeManager, initializeMethod?: () => FxPromise, editScopeView?: FxData.EditScopeView<Object, ParameterCollectionInput>): EditScope<T>;
    }
    /**
     * The contract for the parameter collection "collector" binding.
     */
    interface ParameterCollectorPdlBinding {
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: CollectorBindingInternals;
    }
    /**
     * The contract for the parameter collection "provider" binding.
     */
    interface ParameterProviderPdlBinding {
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: ProviderBindingInternals;
    }
    /**
     * The model for the "collector" parameter collection binding.
     */
    class CollectorBindingInternals {
        /**
         * The inputs from the collector to the provider.
         */
        inputs: KnockoutObservable<ParameterCollectionInput>;
        /**
         * The errors passed down from the colletor to the provider.
         */
        errors: KnockoutObservable<ParameterCollectionError[]>;
    }
    /**
     * The model for the "provider" parameter collection binding.
     */
    class ProviderBindingInternals {
        /**
         * The outputs of the provider to the collector.
         */
        outputs: KnockoutObservable<ParameterCollectionOutput>;
        /**
         * A Guid that when changes, triggers the process of commiting the changes in the provider
         * and sending them to the collector.
         */
        commit: KnockoutObservable<string>;
    }
    /**
     * The model for the "provisioner" binding.
     */
    class ProvisionerBindingInternals {
        /**
         * Signals fetching the provisioning command from Shell.
         */
        triggerProvisioningCommand: KnockoutObservable<string>;
        /**
         * The name of the extension that contains the provisioning part.
         */
        provisioningPartExtensionName: KnockoutObservable<string>;
        /**
         * The name of the provisioning part in which to do provisioning.
         */
        provisioningPartName: KnockoutObservable<string>;
        /**
         * Signals the start of provisioning on a startboard part using the specified model.
         * If the startboard part is not already present, it is added.
         */
        triggerProvisioningInStartboardPart: KnockoutObservable<any>;
        /**
         * True if provisioning should be done using a provisioning part; else false.
         */
        masterIsProvisioningPart: KnockoutObservable<boolean>;
        /**
         * Force discards the journey when provisioning starts.
         */
        forceDiscardJourney: KnockoutObservable<boolean>;
        /**
         * The fetched provisioning command.
         */
        provisioningCommand: KnockoutObservable<ProvisioningCommand>;
        /**
         * Signal to the shell that an attempt was made to start provisioning.
         */
        provisioningAttempted: KnockoutObservable<any>;
        /**
         * Signal to the shell that provisioning has started. This means that the attempt to start provisioning was
         * successfully and acknowledged by the service.
         */
        provisioningStarted: KnockoutObservable<any>;
        /**
         * Signal to the provisioner that provisioning has completed.
         */
        provisioningCompleted: KnockoutObservable<any>;
    }
    /**
     * The parameter collector.
     */
    interface ParameterCollector<T> {
        "--noUnusedLocals"?: T | any;
        /**
         * The outputs returned by the the last launched provider.
         */
        providerOutputs: ParameterCollectionOutput;
        /**
         * Processes the inputs received by the view model referencing this object. This method
         * should be called inside the 'onInputsSet' method.
         *
         * @param inputs The inputs to the part.
         * @return A promise signaling the completion of processing the inputs.
         */
        processInputs(inputs: any): FxPromise;
        /**
         * Adds a provider to the list of tracked providers.
         *
         * @param providerId The id of the parameter provider.
         * @param collectorCallbacks The collector inline implementation that handles this provider.
         */
        addProvider(providerId: string, collectorCallbacks: Roles.CollectorCallbacks): void;
        /**
         * Removes a provider from the list of tracked providers.
         *
         * @param providerId The id of the parameter provider.
         */
        removeProvider(providerId: string): void;
        /**
         * Creates the inputs for a given parameter provider and sends them to that provider.
         *
         * @param providerId The id of the parameter provider.
         * @retrun void.
         */
        sendInputsToProvider(providerId: string): void;
        /**
         * Commits the outputs returned back by the parameter provider. This includes both validating
         * and saving the returned outputs.
         *
         * @param providerId The id of the parameter provider.
         * @return A thenable signaling the completion of the output commit process.
         */
        commitProviderOutputs(providerId: string): FxPromise;
    }
    /**
     * Options used to initialize a parameter collector.
     */
    interface ParameterCollectorOptions {
        /**
         * Flag indicating whether the commit action is executed once the commit signal is available
         * (eg. command), opposed to waiting for the UI element view model to trigger that action
         * explicitly (eg. form).
         */
        commitWhenSignaled: boolean;
        /**
         * The commit action to be executed when the provider commits.
         */
        commitAction: () => void;
    }
    /**
     * The parameter collector factory.
     */
    class ParameterCollectorFactory {
        /**
         * The confim-commit suffix.
         */
        static confirmCommitSuffix: string;
        /**
         * The try-commit suffix.
         */
        static tryCommitSuffix: string;
        /**
         * Creates an instance of the parameter collector implementation.
         *
         * @param collectorRole The collector role implementation object.
         * @param editScope The edit scope implementation object.
         * @param privateFcTpBI The parameter collector binding internals.
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer
         *      being used by the caller.
         * @param commitWhenSignaled Whether to commit automatically when signaled (opposed to wait
         *      for the part to control the commit action). The commit action will be called with a
         *      provider id of null (i.e. assuming only one provider).
         * @return An instance of the parameter collec implementation.
         */
        static createParameterCollector<T>(collectorRole: Roles.ParameterCollector, editScope: EditScope<T>, privateFcTpBI: Internal.CollectorBindingInternals, lifetimeManager: FxBase.LifetimeManager, options?: ParameterCollectorOptions): ParameterCollector<T>;
    }
    /**
     * The parameter provider.
     */
    interface ParameterProvider<T> {
        "--noUnusedLocals"?: T | any;
        /**
         * Processes the inputs received by the view model referencing this object. This method
         * should be called inside the 'onInputsSet' method.
         *
         * @param inputs The inputs to the part.
         * @return A promise signaling the completion of processing the inputs.
         */
        processInputs(inputs: any): FxPromise;
        /**
         * Get the outputs that the provider will commit back to the collector.
         *
         * @return A promise resolved with the parameter collection outputs.
         */
        getOutputsToCommit(): FxPromiseV<ParameterCollectionOutput>;
        /**
         * Commit the outputs and send them back to the collector.
         *
         * @param options The options used in the commit process.
         */
        commitOutputs(options: ProviderCommitOptions): void;
    }
    /**
     * The parameter provider factory.
     */
    class ParameterProviderFactory {
        /**
         * Creates an instance of the parameter provider implementation.
         *
         * @param providerRole The provider role implementation object.
         * @param editScope The edit scope implementation object.
         * @return An instance of the parameter provider implementation.
         */
        static createParameterProvider<T>(providerRole: Roles.ParameterProvider, editScope: EditScope<T>): ParameterProvider<T>;
    }
    /**
     * The commit options the provider uses in the commit process.
     */
    interface ProviderCommitOptions {
        /**
         * Provisioner to use to commit the provider.
         */
        provisioner: Provisioner;
        /**
         * Outputs to use for provisioning.
         */
        provisionerData: ParameterCollectionOutput;
        /**
         * Callback used to setup UI indication that provisioning is in progress.
         */
        progressAction?: (promise: FxPromise) => void;
        /**
         * Callback used to discard edits.
         */
        discardEdits?: () => void;
        /**
         * Binding internals for the provider.
         */
        privateFpTcBI: ProviderBindingInternals;
        /**
         * Binding internals for the provisioner.
         */
        privatePcPrBI?: ProvisionerBindingInternals;
    }
    /**
     * The provisioner contract.
     */
    interface Provisioner {
        /**
         * Indicates whether the entity will perform a provisioning command or not.
         * Set this true to enable the provisioning logic.
         */
        enableProvisioning: KnockoutObservableBase<boolean>;
        /**
         * Indicating whether provisioning will take place on a startboard part or on the current UI
         * element part (form, wizard, etc.).
         */
        provisionOnStartboardPart: KnockoutObservableBase<boolean>;
        /**
         * The mapped outputs generated by processing the outputs using the 'mapOutputsForProvisioning'
         * function.
         */
        mappedOutputs: ParameterCollectionOutput;
        /**
         * Processes the inputs received by the view model referencing this object. This method
         * should be called inside the 'onInputsSet' method.
         *
         * @param inputs The inputs to the part.
         * @return A promise signaling the completion of processing the inputs.
         */
        processInputs(inputs: any): FxPromise;
        /**
         * Executes the provisioning command.
         *
         * @param data The parameter collection outputs from the create flow that will be used in the
         *      provisioning process.
         * @param options The options used for the provisioning process.
         * @return A promise object signaling the completion of the provisioning process.
         */
        executeProvisioning(data: ParameterCollectionOutput, options: StringMap<any>): FxPromise;
    }
    /**
     * The provisioner factory.
     */
    class ProvisionerFactory {
        /**
         * Creates an instance of the parameter provider implementation.
         *
         * @param provisionerRole The provisioner role implementation object.
         * @param privatePcPrBI The provisioning binding internals.
         * @return An instance of the provisioner implementation.
         */
        static createProvisioner(provisionerRole: Roles.Provisioner, privatePcPrBI: ProvisionerBindingInternals): Provisioner;
    }
    /**
     * Provisioning command status.
     */
    enum ProvisioningCommandStatus {
        /**
         * Command has not being executed yet.
         */
        Idle = 0,
        /**
         * Command is in the process of executing.
         */
        InProgress = 1,
        /**
         * Command has been executed and succeeded.
         */
        Succeeded = 2,
        /**
         * Command has been executed and failed.
         */
        Failed = 3,
    }
    /**
     * A class that represents a provisioning command.
     */
    interface ProvisioningCommand {
        /**
         * Status of the command execution.
         */
        status: KnockoutObservable<ProvisioningCommandStatus>;
        /**
         * Executes the provisioning command.
         *
         * @param options The options needed to configure/execute the command.
         * @return A Thenable object indicating whether the provisioning command has succeeded or not.
         */
        execute(options: StringMap<any>): MsPortalFx.Base.PromiseV<any>;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ParameterCollectionData.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    /**
     * The input parameters: The input parameters passed from the collector to the provider.
     *
     * Defined as a dictionary of parameter sets (key is a string, parameter set name - value is an
     * object, the parameter set). A parameter set is a dictionary of parameters (key is a string,
     * parameter name - value is a string, parameter value).
     */
    interface InputParameters extends ParameterSetCollection {
    }
    /**
     * The input parameters metadata: The metadata for the input parameters passed from the collector
     * to the provider.
     *
     * Defined as a dictionary of parameter metadata sets (key is a string, parameter metadata set
     * name - value is an object, the parameter metadata set). A parameter metadata set is a
     * dictionary of parameter metadata (key is a string, parameter name - value is a ParameterMetadata
     * object, parameter metadata).
     */
    interface InputMetadata extends StringMap<StringMap<ParameterMetadata>> {
    }
    /**
     * The parameter collection options: A set of options that the collector uses to configure the
     * behavior of the provider.
     *
     * Defined as a dictionary of option sets (key is a string, option set name - value is an object,
     * a bag of options).
     */
    interface ParameterCollectionOptions extends StringMap<StringMap<any>> {
    }
    /**
     * The output parameters: The output parameters sent back from the provider to the collector.
     *
     * Defined as a dictionary of parameter sets (key is a string, parameter set name - value is an
     * object, the parameter set). A parameter set is a dictionary of parameters (key is a string,
     * parameter name - value is a string, parameter value).
     */
    interface OutputParameters extends ParameterSetCollection {
    }
    /**
     * The model for the parameter collection inputs.
     */
    class ParameterCollectionInput {
        /**
         * The input parameters.
         */
        inputParameters: InputParameters;
        /**
         * The input parameters metadata.
         */
        inputMetadata: InputMetadata;
        /**
         * The options needed to configure the behavior of the provider.
         */
        options: ParameterCollectionOptions;
    }
    /**
     * The model for the parameter collection outputs.
     */
    class ParameterCollectionOutput {
        /**
         * The output parameters.
         */
        outputParameters: OutputParameters;
    }
    /**
     * The model for a parameter collection metadata object. Useful for conditional UI and generated
     * parameter collection flows.
     */
    interface ParameterMetadata {
        /**
         * The display name for the parameter.
         */
        displayName: string;
        /**
         * The default value for the parameter.
         */
        defaultValue?: any;
        /**
         * The description for the parameter.
         */
        description?: string;
        /**
         * The text for the tool-tip.
         */
        toolTip?: string;
        /**
         * The UI hint used to find and render a suitable control that will capture the value for
         * the parameter (e.g. password, email, url, date, etc.). Used in generated UIs only, and
         * limited to types supported by controls that already exist in MsPortalFx.
         */
        uiHint?: string;
        /**
         * Constraints for rendering and validating the parameter.
         */
        constraints?: ParameterMetadataConstraints;
    }
    /**
     * The model for a parameter collection metadata constraints.
     */
    interface ParameterMetadataConstraints {
        /**
         * A flag indicating whether this parameter is required or not. Defaults to true.
         */
        required?: boolean;
        /**
         * A flag indicating whether this parameter is hidden or not. Defaults to false.
         */
        hidden?: boolean;
        /**
         * A list of possible values for the parameter (key-value pairs). Could be used for
         * validation and/or populating a list or a drop-down.
         */
        allowedValues?: {
            text: string;
            value: any;
        }[];
        /**
         * The range defining the parameter value.
         */
        range?: {
            lowerBind: number;
            upperBound: number;
        };
        /**
         * The length of the parameter value.
         */
        length?: {
            min: number;
            max: number;
        };
        /**
         * The characters the parameter value must contain.
         */
        containsCharacters?: string;
        /**
         * The characters the parameter value must not contain.
         */
        notContainsCharacters?: string;
        /**
         * Whether the parameter value has at least one digit or not.
         */
        hasDigit?: boolean;
        /**
         * Whether the parameter value has at least one letter or not.
         */
        hasLetter?: boolean;
        /**
         * Whether the parameter value has at least one upper-case letter or not.
         */
        hasUpperCaseLetter?: boolean;
        /**
         * Whether the parameter value has at least one lower-case letter or not.
         */
        hasLowerCaseLetter?: boolean;
        /**
         * Whether the parameter value has at least one special character or not.
         */
        hasPunctuation?: boolean;
        /**
         * Whether the parameter value is a number or not.
         */
        numeric?: boolean;
        /**
         * A custom list of constraints (key-value pairs). Useful for custom generated UI.
         */
        custom?: {
            key: string;
            value: string;
        }[];
    }
    /**
     * The model defining a parameter collection error object.
     */
    interface ParameterCollectionError {
        /**
         * The error message.
         */
        errorMessage: string;
        /**
         * The name of the associated parameter, if any.
         */
        parameterName?: string;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\Roles\ParameterCollector.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2.Roles {
    import FxPromise = MsPortalFx.Base.Promise;
    import FxPromiseV = MsPortalFx.Base.PromiseV;
    /**
     * The contract for the parameter collection "collector" role.
     * Enables the implementer to collect parameters from parameter provider(s).
     */
    interface ParameterCollector {
        /**
         * Create the inputs that will be sent to a given provider when launched.
         *
         * @param providerId The id of the provider.
         * @return The input parameters for the provider.
         */
        createInputParameters(providerId: string): ParameterCollectionInput;
        /**
         * (Optional) Validates the output parameters received from the provider. Do not reject the
         * promise. In case of failure, resolve with the errors. In case of success, resolve with an
         * empty array, or simply return null.
         *
         * @param providerId The id of the provider sending back the output parameters.
         * @param outputParameters The output parameters received from the provider.
         * @return Null (sync) or a promise (aysnc) resolved with an array of validation errors, if any.
         */
        validateOutputParameters?(providerId: string, outputParameters: OutputParameters): FxPromiseV<ParameterCollectionError[]>;
        /**
         * Saves the output parameters received from the provider.
         *
         * @param providerId The id of the provider sending back the output parameters.
         * @param outputParameters The output parameters received from the provider.
         * @return Null (sync) or a promise (aysnc) resolved when the saving process is done.
         */
        saveOutputParameters(providerId: string, outputParameters: OutputParameters): FxPromise;
    }
    /**
     * The contract for the parameter collection "collector" callbacks for a provider.
     */
    interface CollectorCallbacks {
        /**
         * Create the inputs that will be sent to the provider when launched.
         *
         * @return The input parameters for the provider.
         */
        createInputParameters(): ParameterCollectionInput;
        /**
         * (Optional) Validates the output parameters received from the provider. Do not reject the
         * promise. In case of failure, resolve with the errors. In case of success, resolve with an
         * empty array, or simply return null.
         *
         * @param providerOutputs The outputs received from the provider.
         * @return Null (sync) or a promise (aysnc) resolved with an array of validation errors, if any.
         */
        validateOutputParameters?(providerOutputs: OutputParameters): FxPromiseV<ParameterCollectionError[]>;
        /**
         * (Optional) Saves the output parameters received from the provider.
         *
         * @param providerOutputs The outputs received from the provider.
         * @return Null (sync) or a promise (aysnc) resolved when the saving process is done.
         */
        saveOutputParameters(providerOutputs: OutputParameters): FxPromise;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\Roles\ParameterProvider.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2.Roles {
    /**
     * The contract for the parameter collection "provider" role.
     * Enables the implementer to communicate collected parameters back to a parameter collector.
     */
    interface ParameterProvider {
        /**
         * (Optional) The metadata type name used in the creation of the edit scope. If you set this
         * property, you need to define/set your metadata type first. An error will be thrown if the
         * metadata type is not defined. You can define it using: MsPortalFx.Data.Metadata.setTypeMetadata().
         */
        dataModelTypeName?: string;
        /**
         * (Optional) Overrides the parameter collection inputs received from the collector. Use this
         * to override or initialize any value before the editScope is created. Otherwise, the editScope
         * will be seeded with the input parameters as they are.
         *
         * @param inputParameters The input parameters received from the collector.
         * @param inputMetadata The input parameters metadata received from the collector.
         * @param options The parameter collection options received from the collector.
         * @return A promise resolved with the overriden parameter collection inputs.
         */
        overrideInputParameters?(inputParameters: InputParameters, inputMetadata: InputMetadata, options: ParameterCollectionOptions): MsPortalFx.Base.PromiseV<ParameterCollectionInput>;
        /**
         * (Optional) Overrides the output parameters sent to the collector at the end of the parameter
         * collection process. Otherwise, the dataModel (the data in the editScope) will be sent to
         * the collector as they are.
         *
         * @param outputParameters The output parameters to be sent to the collector (extracted from the dataModel).
         * @return A promise resolved with the overriden output parameters.
         */
        overrideOutputParameters?(outputParameters: OutputParameters): MsPortalFx.Base.PromiseV<OutputParameters>;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\Roles\Provisioner.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2.Roles {
    /**
     * The contract for the parameter collection "provisioner" role.
     * Enables the implementer to execute a provisioning action.
     */
    interface Provisioner {
        /**
         * (Optional) Maps the outputs of the parameter collection flow to what the default provisioning
         * action expects (i.e. gallery create). Override this method to implement custom mapping of
         * output parameters if the outputs of the parameter collection flow are different from what the
         * gallery deployment expects.
         *
         * NOTE: You cannot implement both the "executeCustomProvisioning" and "mapOutputsForProvisioning"
         * methods. Implement one or the other, but not both.
         *
         * @param outputParameters The outputs of the parameter collection flow.
         * @param options The options used for the provisioning process.
         * @return The mapped outputs, to what the default provisioning expects.
         */
        mapOutputsForProvisioning?(outputParameters: OutputParameters, options: ParameterCollectionOptions): MsPortalFx.Base.PromiseV<OutputParameters>;
        /**
         * (Optional) Executes a custom provisioning action. Override this method for custom provisioning.
         *
         * NOTE: You cannot implement both the "mapOutputsForProvisioning" and "executeCustomProvisioning"
         * methods. Implement one or the other, but not both.
         *
         * @param outputParameters The outputs of the parameter collection flow.
         * @param options The options used for the provisioning process.
         * @return A promise object that is resolved with any value (operation results) if the provisioning
         *      succeeds, or rejected if it fails.
         */
        executeCustomProvisioning?(outputParameters: OutputParameters, options: ParameterCollectionOptions): MsPortalFx.Base.PromiseV<any>;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\Utilities.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    /**
     * A dictionary of parameter sets (key is a string, parameter set name - value is an
     * object, the parameter set). A parameter set is a dictionary of parameters (key is a string,
     * parameter name - value is a string, parameter value).
     */
    interface ParameterSetCollection extends StringMap<StringMap<string>> {
    }
    /**
     * Utilities for parameter collection implementations.
     */
    module Utilities {
        /**
         * Transforms an editable model object to a parameter-set collection.
         *
         * @param model The editable model object.
         * @return The list if parameter-sets.
         */
        function modelToParameters<T>(model: T): ParameterSetCollection;
        /**
         * Transforms a parameter-set collection to an editable model object.
         *
         * @param data The list if parameter-sets.
         * @return The editable model object.
         */
        function parametersToModel<T>(data: ParameterSetCollection): T;
        /**
         * Reads the outputs returned by the provider from the ParameterCollectionOptions bag.
         * Use this inside a provider role implementation. This is useful if the provider is launched
         * one more time after it has committed, and you want to restore the values from your previous commit.
         *
         * @param options The parameter collection options passed on from the collector.
         * @return The parameter collection outputs that the provider returned the last time, or null
         *      if there aren't any (i.e. provider hasn't committed before).
         */
        function getPreviousOutputsFromOptions(options: ParameterCollectionOptions): ParameterCollectionOutput;
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ViewModels.Command.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    import FxViewModels = MsPortalFx.ViewModels;
    import ActionBars = FxViewModels.ActionBars;
    /**
     * The interface for a parameter collection command.
     */
    interface CommandContract {
        /**
         * The input data for the current step.
         */
        stepInput: KnockoutObservable<ActionBars.CreateActionBar.ActionBarInput>;
    }
    /**
     * The parameter collection roles that could be defined for a parameter collection command.
     */
    interface CommandRoles {
        /**
         * The parameter collector role. This role is required.
         */
        parameterCollector: Roles.ParameterCollector;
        /**
         * (Optional) The provisioner role.
         */
        provisioner?: Roles.Provisioner;
    }
    /**
     * The base class for a parameter collection command.
     */
    class Command<T> extends OpenBladeCommand implements CommandContract {
        /**
         * See interface.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        stepInput: KnockoutObservable<ActionBars.CreateActionBar.ActionBarInput>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: Internal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: Internal.ProvisionerBindingInternals;
        private _collectorImpl;
        private _provisionerImpl;
        private _rolesSet;
        private _baseCommandContainer;
        private _baseCommandInitialState;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         */
        constructor(container: FxViewModels.CommandContainerContract, initialState: any);
        /**
         * Invoked when the Part's inputs change.
         */
        onInputsSet(inputs: any): MsPortalFx.Base.Promise;
        /**
         * Sets the parameter collection roles on the view model.
         *
         * @param roles The parameter collection roles.
         */
        initializeParameterCollectionRoles(roles?: CommandRoles): void;
        private _extractCommandRoles(roles, lifetimeManager);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ViewModels.Form.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    import FxViewModels = MsPortalFx.ViewModels;
    import ActionBars = FxViewModels.ActionBars.Base;
    import Pricing = HubsExtension.Azure.Pricing;
    /**
     * The interface for a parameter collection form part.
     */
    interface FormPartContract {
    }
    /**
     * The parameter collection roles that could be defined for a parameter collection form part.
     */
    interface FormRoles {
        /**
         * (Optional) The parameter collector role.
         */
        parameterCollector?: Roles.ParameterCollector;
        /**
         * (Optional) The parameter provider role.
         */
        parameterProvider?: Roles.ParameterProvider;
        /**
         * (Optional) The provisioner role.
         */
        provisioner?: Roles.Provisioner;
    }
    /**
     * The base class for a parameter collection form part.
     */
    class Form<T> extends Forms.Form.ViewModel<T> implements FormPartContract, Internal.ParameterCollectorPdlBinding, Internal.ParameterProviderPdlBinding, Base.Disposable {
        /**
         * The edit scope id.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * Indicates whether an action is in progress or not.
         * An action in progress will disable the action bar regardless of the validity of the form.
         */
        actionInProgress: KnockoutObservable<boolean>;
        /**
         * Indicates whether the entity will perform a provisioning command or not.
         * Set this true to enable the provisioning logic.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        /**
         * The summary and/or link to the EULA for the create step.
         */
        eula: KnockoutObservable<string>;
        /**
         * The display text for the link to the right of the create button.
         */
        secondaryLinkDisplayText: KnockoutObservable<string>;
        /**
         * Gallery create pricing information.
         */
        galleryPricingInfo: KnockoutObservable<Pricing.PricingInfo>;
        /**
         * An instance of Selectable to activate hot spots.
         */
        hotSpot: SelectableSet<Selectable<any>, DynamicBladeSelection>;
        /**
         * An instance of Selectable to activate selectors.
         */
        selectable: Selectable<any>;
        /**
         * An instance of Selectable to activate the action bar's secondary link.
         */
        secondaryLinkSelectable: Selectable<DynamicBladeSelection>;
        /**
         * The input to pass on to the action bar of the details blade.
         */
        stepInput: KnockoutObservable<ActionBars.ActionBarInput>;
        /**
         * The output received from the action bar of the details blade.
         */
        stepOutput: KnockoutObservable<ActionBars.ActionBarOutput>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: Internal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: Internal.ProviderBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: Internal.ProvisionerBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        protected cloudName: KnockoutObservable<string>;
        _editScopeImpl: Internal.EditScope<T>;
        private _collectorImpl;
        private _providerImpl;
        private _provisionerImpl;
        private _parameterCollectionRolesSet;
        private _actionBarOutput;
        private _actionInProgressLock;
        private _baseFormContainer;
        private _baseFormInitialState;
        private _hotSpotItems;
        private _initialSelectedValue;
        private _previousOutput;
        private _previousSecondaryLinkCommitId;
        private _selectableMap;
        private _isValid;
        private _galleryItem;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         */
        constructor(container: PartContainerContract, initialState?: any);
        /**
         * Sets the parameter collection roles on the view model.
         *
         * @param roles The parameter collection roles.
         */
        initializeParameterCollectionRoles(roles?: FormRoles): void;
        /**
         * Get an editable copy of the data model. This view model has the same structure
         * as the parameter collection inputs received (and the optional overrides).
         *
         * @return The editable copy of the data model.
         */
        readonly dataModel: T;
        /**
         * The parameter collection input metadata received as part of the inputs to the part.
         *
         * @return The parameter collection input metadata. Null if not available.
         */
        readonly inputMetadata: InputMetadata;
        /**
         * The parameter collection options received as part of the inputs to the part.
         *
         * @return The parameter collection options. Null if not available.
         */
        readonly parameterCollectionOptions: ParameterCollectionOptions;
        /**
         * (Optional) This is called in when the inputs are available or have changed.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param initialState Initial state of the view model.
         */
        onFormInputsSet(lifetimeManager: Base.LifetimeManager, initialState?: any): Base.Promise;
        /**
         * Invoked when the Part's inputs change.
         */
        onInputsSet(inputs: any): Base.Promise;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * Registers a hot-spot with the form for opening the blade.
         *
         * @param hotSpotViewModel The selectable that is bound to the hot spot.
         */
        registerHotSpot(hotSpotViewModel: Selectable<any> | Controls.HotSpot.ViewModel): void;
        /**
         * Registers a selector with the form for opening the blade that provides values to it.
         *
         * @param id The ID for the form to uniquely identify the selector.
         * @param selectorField The selector form field to be registered.
         * @param collectorCallbacks The collector inline implementation that handles this selector.
         */
        registerSelector(id: string, selectorField: Forms.Selector.ViewModel<any>, collectorCallbacks?: Roles.CollectorCallbacks): void;
        /**
         * Registers a selectable with the form for opening the blade that provides values to it.
         *
         * @param id The ID for the form to uniquely identify the selector.
         * @param selectable The selectable to be registered.
         * @param collectorCallbacks The collector inline implementation that handles this upsell control.
         */
        registerInfoBox(id: string, infoBoxViewModel: Controls.InfoBox.ViewModel, collectorCallbacks?: Roles.CollectorCallbacks): void;
        private _registerSelectable(id, selectable);
        private _extractFormRoles(roles, lifetimeManager);
        private _unselectFields(exceptionSelector?);
        private _onSelectorLoad(selectorId);
        private _onSelectorComplete(selectorId);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ViewModels.Picker.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    import FxViewModels = MsPortalFx.ViewModels;
    import FxControls = FxViewModels.Controls;
    import Grid = FxControls.Lists.Grid;
    /**
     * The interface for a parameter collection picker part.
     */
    interface PickerPartContract<TItem> extends FxControls.Loadable.Contract {
        /**
         * A factory function that returns selection based on a grid item.
         *
         * @param item Item from the picker grid.
         * @return Returns the selection based on an grid item selected.
         */
        createSelection(item: TItem): any;
        /**
         * The summary and/or link to the EULA.
         */
        eula: KnockoutObservable<string>;
        /**
         * Gets the columns list for the picker grid.
         *
         * @return The Columns list for the picker grid.
         */
        getColumns(): KnockoutObservableArray<Grid.Column>;
        /**
         * Gets the index number for the grid item matching with the given id.
         *
         * @param id The id to match with the grid items
         * @return The index for the matching grid item with the given id.
         */
        getMatchingItemIndex(id: any): number;
        /**
         * The items match selection criteria for the picker grid.
         *
         * @param item Item from the picker grid.
         * @param selection Selection from the grid createSelection interface.
         * @return The result that identifies whether item matches the selection.
         */
        itemMatchesSelection(item: TItem, selection: any): boolean;
        /**
         * The header of the list.
         */
        listHeader: KnockoutObservable<string>;
        /**
         * The subheader of the list.
         */
        listSubHeader: KnockoutObservable<string>;
        /**
         * Indicates if this picker supports multiselect.
         */
        multiselectEnabled: KnockoutObservable<boolean>;
    }
    /**
     * The parameter collection roles that could be defined for a parameter collection picker part.
     */
    interface PickerRoles {
        /**
         * (Optional) The parameter collector role.
         */
        parameterCollector?: Roles.ParameterCollector;
        /**
         * (Optional) The parameter provider role.
         */
        parameterProvider?: Roles.ParameterProvider;
    }
    /**
     * The base class for a parameter collection pciker part.
     */
    class Picker<TItem, TDataModel> extends FxControls.Loadable.ViewModel implements PickerPartContract<TItem>, Internal.ParameterCollectorPdlBinding, Internal.ParameterProviderPdlBinding, MsPortalFx.Base.Disposable {
        /**
         * The parameter names for picker grid options.
         */
        static filterPickerItemsParameterName: string;
        static pickerItemsParameterName: string;
        /**
         * The edit scope id.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * The create action outputs to return back to picker control invoker.
         */
        _createActionOutputs: ParameterCollectionOutput;
        /**
         * The summary and/or link to the EULA for the create step.
         */
        eula: KnockoutObservable<string>;
        /**
         * The list header string to show on picker list part.
         */
        listHeader: KnockoutObservable<string>;
        /**
         * The list sub header string to show on picker list part.
         */
        listSubHeader: KnockoutObservable<string>;
        /**
         * See interface.
         */
        multiselectEnabled: KnockoutObservable<boolean>;
        /**
         * The grid view model for picker items.
         */
        itemsGridViewModel: Grid.ViewModel<TItem, any>;
        /**
         * The flag to indicate whether create action visible or not.
         */
        showCreateAction: KnockoutObservable<boolean>;
        /**
         * Triggers the select action.
         */
        triggerSelectAction: KnockoutObservable<string>;
        /**
         * True if the form has been validated and is valid; else false.
         */
        valid: KnockoutObservable<boolean>;
        /**
         * The flag to indicate whether create Action providing the result from picker.
         */
        isCreateActionResult: KnockoutObservable<boolean>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: Internal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: Internal.ProviderBindingInternals;
        /**
         * The wizard step input provided as input to picker.
         */
        stepInput: KnockoutObservable<FxViewModels.ActionBars.Base.ActionBarInput>;
        /**
         * The create action selector field.
         */
        createActionSelectorField: KnockoutObservable<FxViewModels.Forms.Selector.ViewModel<string>>;
        /**
         * The picker list activation blade opener to open the dynamic blade based on picker requirement.
         */
        pickerActivationBladeOpener: KnockoutObservableBase<FxViewModels.DynamicBladeSelection>;
        /**
         * The create blade opener to open the dynamic blade based on inputs.
         */
        createActionBladeOpener: KnockoutObservableBase<FxViewModels.DynamicBladeSelection>;
        /**
         * The item selected by default in the grid.
         */
        itemSelectedByDefault: KnockoutObservable<any>;
        /**
         * The filterItems provided by the picker invoker as options.
         */
        filterItems: KnockoutObservable<any>;
        /**
         * The set of filters to filter items on.
         */
        filters: KnockoutObservableArray<FxViewModels.PickerFilter.IPickerItemsFilter<TItem>>;
        private _filteredItems;
        private _createSelectorField;
        private _selectorOriginalValue;
        private _selectorEditableValue;
        private _createSelectorBladeName;
        private _createSelectorBladeExtension;
        private _throttleUnselectSelectorFieldHandle;
        _editScopeImpl: Internal.EditScope<TDataModel>;
        private _collectorImpl;
        private _providerImpl;
        private _parameterCollectionRolesSet;
        private _basePickerContainer;
        private _basePickerInitialState;
        private _actionBarOutput;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         * @param items The Obervable array of picker items of type TItem to populate.
         * @param multiselect Optional. True if the picker supports multiple selection. Defaults to false.
         */
        constructor(container: PartContainerContract, initialState: any, items: KnockoutObservableArray<TItem>, multiselect?: boolean);
        /**
         * Initializes Create Selector on Picker Blade with given blade action inputs.
         *
         * @param initialValue The initial value Selector uses.
         * @param createActionTitle The title for Selector control.
         * @param createActionBladeName The blade name to launch on Selector selection.
         * @param createActionBladeExtension The optional field for extension name to launch the create action blade from that extension.
         * @param collectorCallbacks The collector inline implementation that handles this wizard step.
         * @param validations The optional field for validations to apply on this selector field.
         */
        initializeCreateSelector(initialValue: string, createActionTitle: string, createActionBladeName: string, createActionBladeExtension?: string, collectorCallbacks?: Roles.CollectorCallbacks, validations?: FxViewModels.FormValidation[]): void;
        /**
         * (Optional) This is called in when the inputs are available or have changed.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param initialState Initial state of the view model.
         */
        onPickerInputsSet(lifetimeManager: MsPortalFx.Base.LifetimeManager, initialState?: any): MsPortalFx.Base.Promise;
        /**
         * Invoked when the Part's inputs change.
         *
         * @param inputs Inputs is collection of input and output parameters to blade.
         * @return Promise for onInputsSet to notify completion.
         */
        onInputsSet(inputs: any): MsPortalFx.Base.Promise;
        /**
         * Sets the parameter collection roles on the view model.
         *
         * @param roles The parameter collection roles.
         */
        initializeParameterCollectionRoles(roles?: PickerRoles): void;
        /**
         * Get an editable copy of the data model. This view model has the same structure
         * as the parameter collection inputs received (and the optional overrides).
         *
         * @return The editable copy of the data model.
         */
        readonly dataModel: TDataModel;
        /**
         * The parameter collection input metadata received as part of the inputs to the part.
         *
         * @return The parameter collection input metadata. Null if not available.
         */
        readonly inputMetadata: InputMetadata;
        /**
         * The parameter collection options received as part of the inputs to the part.
         *
         * @return The parameter collection options. Null if not available.
         */
        readonly parameterCollectionOptions: ParameterCollectionOptions;
        /**
         * Gets the parameter given from the list of parameters given.
         *
         * @param parameterName The parameterName to get from collection.
         * @param parameters The collection of parameters.
         * @return The parameter value from collection.
         */
        getParameter<TDataModel>(parameterName: string, parameterSetName: string, parameters: StringMap<StringMap<TDataModel>>): TDataModel;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        getMatchingItemIndex(id: any): number;
        /**
         * See interface.
         */
        getColumns(): KnockoutObservableArray<Grid.Column>;
        /**
         * See interface.
         */
        itemMatchesSelection(item: TItem, selection: any): boolean;
        /**
         * See interface.
         */
        createSelection(item: TItem): any;
        private _extractPickerRoles(roles, lifetimeManager);
        private _onSelectedItemsChanged(selectedItems);
        private _runFilters(items);
        private _closeBlade(selectedItems);
        private _clearThrottleUnselectSelectorFieldHandle();
        /**
         * Gets Grid Extension Options.
         *
         * @return Grid Extension options with select type and other grid extension options
         */
        private _getGridExtensionOptions();
        /**
         * Selects the grid item based on given index.
         *
         * @param index Row index to select in the grid.
         */
        private _selectGridItem(index);
        /**
         * Disables the specified grid item ..
         *
         * @param item Item to disable in the grid.
         * @param reason Reason for disabling the row in the grid.
         */
        private _disableGridItem(item, reason);
        /**
         * Initialize create action selector with defaults.
         */
        private _initializeCreateActionSelector();
        /**
         * Launch create action blade with the inputs required.
         */
        private _launchCreateActionBlade();
        /**
         * Fileter Grid Items.
         */
        private _filterGridItems(filterValues);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ViewModels.PickerFilter.d.ts
declare module MsPortalFx.ViewModels.PickerFilter {
    import FxBase = MsPortalFx.Base;
    /**
     * An inteface for a filtered item.
     */
    interface FilteredItem<TItem> {
        /**
         * The disabled item.
         */
        item: TItem;
        /**
         * The reason the item is disabled.
         */
        disabledReason: string;
    }
    /**
     * An inteface for filtering a set of items.
     */
    interface IPickerItemsFilter<TItem> {
        /**
         * This function takes an input set of items and returns a subset of items from this set
         *
         * @param container The container into which the part is being placed.
         * @param initialState Initial state for the part.
         * @param items The Obervable array of picker items of type TItem to populate.
         * @param multiselect Optional. True if the picker supports multiple selection. Defaults to false.
         */
        getDisabledItems(items: TItem[]): FxBase.PromiseV<FilteredItem<TItem>[]>;
    }
    /**
     * Filter that supports ARM RBAC filtering.
     */
    class ArmRbacFilter<TItem> implements IPickerItemsFilter<TItem> {
        private _requiredPermission;
        private _mapItemToResourceId;
        /**
         * See interface.
         */
        getDisabledItems(items: TItem[]): FxBase.PromiseV<FilteredItem<TItem>[]>;
        /**
         * Constructs a new filter class that filters using ARM permissions.
         * This base class provides automatic filtering of
         *
         * @param container The container into which the part is being placed.
         * @param initialState Initial state for the part.
         * @param items The Obervable array of picker items of type TItem to populate.
         * @param multiselect Optional. True if the picker supports multiple selection. Defaults to false.
         */
        constructor(mapItemToResourceId: (item: TItem) => string, requiredPermission: string);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete0\ViewModels\ParameterCollectionV2\ViewModels.Wizard.d.ts
declare module MsPortalFx.ViewModels.ParameterCollectionV2 {
    /**
     * The parameter collection roles that could be defined for a parameter collection wizard part.
     */
    interface WizardRoles {
        /**
         * (Optional) The parameter collector role.
         */
        parameterCollector?: Roles.ParameterCollector;
        /**
         * (Optional) The parameter provider role.
         */
        parameterProvider?: Roles.ParameterProvider;
        /**
         * (Optional) The provisioner role.
         */
        provisioner?: Roles.Provisioner;
    }
    /**
     * The base class for a parameter collection wizard part.
     */
    class Wizard<T> extends Controls.Wizard.ViewModel implements Internal.ParameterCollectorPdlBinding, Internal.ParameterProviderPdlBinding, Base.Disposable {
        /**
         * The edit scope id.
         */
        editScopeId: KnockoutObservable<string>;
        /**
         * Indicates whether the entity will perform a provisioning command or not.
         * Set this true to enable the provisioning logic.
         */
        enableProvisioning: KnockoutObservable<boolean>;
        /**
         * The summary and/or link to the EULA for the create step.
         */
        eula: KnockoutObservable<string>;
        /**
         * Indicating whether provisioning will take place on a startboard part or on the current UI
         * element part (form, wizard, etc.).
         */
        provisionOnStartboardPart: KnockoutObservable<boolean>;
        /**
         * True if the form has been validated and is valid; else false.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * Private internal data. Do not use.
         */
        privateFcTpBI: Internal.CollectorBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privateFpTcBI: Internal.ProviderBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        privatePcPrBI: Internal.ProvisionerBindingInternals;
        /**
         * Private internal data. Do not use.
         */
        protected cloudName: KnockoutObservable<string>;
        _editScopeImpl: Internal.EditScope<T>;
        private _collectorImpl;
        private _providerImpl;
        private _provisionerImpl;
        private _parameterCollectionRolesSet;
        private _actionBarOutput;
        private _baseWizardContainer;
        private _baseWizardInitialState;
        /**
         * Constructs the view model.
         *
         * @param container The view model for part container into which the part is being placed.
         * @param initialState Initial state of the view model.
         */
        constructor(container: PartContainerContract, initialState: any);
        /**
         * (Optional) This is called in when the inputs are available or have changed.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param initialState Initial state of the view model.
         */
        onWizardInputsSet(lifetimeManager: Base.LifetimeManager, initialState?: any): Base.Promise;
        /**
         * Invoked when the Part's inputs change.
         */
        onInputsSet(inputs: any): Base.Promise;
        /**
         * Sets the parameter collection roles on the view model.
         *
         * @param roles The parameter collection roles.
         */
        initializeParameterCollectionRoles(roles?: WizardRoles): void;
        /**
         * Get an editable copy of the data model. This view model has the same structure
         * as the parameter collection inputs received (and the optional overrides).
         *
         * @return The editable copy of the data model. Null if not available.
         */
        readonly dataModel: T;
        /**
         * The parameter collection input metadata received as part of the inputs to the part.
         *
         * @return The parameter collection input metadata. Null if not available.
         */
        readonly inputMetadata: InputMetadata;
        /**
         * The parameter collection options received as part of the inputs to the part.
         *
         * @return The parameter collection options. Null if not available.
         */
        readonly parameterCollectionOptions: ParameterCollectionOptions;
        /**
         * Adds a wizard step.
         *
         * @param stepId The ID that uniquely identifies the step.
         * @param title The title for the wizard step.
         * @param formBlade The blade containing the form for the wizard step.
         * @param collectorCallbacks The collector inline implementation that handles this wizard step.
         * @param description The description for the wizard step.
         * @param isOptional A value indicating whether or not the step is optional.
         * @param status The initial status of the step.
         * @param extension The extension that hosts the blade containing the form for the wizard step.
         */
        addWizardStep(stepId: string, title: string, formBlade: string, description?: string, collectorCallbacks?: Roles.CollectorCallbacks, isOptional?: boolean, status?: ActionBars.Base.Status, extension?: string): void;
        /**
         * Inserts a wizard step at the specified position.
         *
         * @param position The 0 based position at which to insert the step.
         * @param stepId The ID that uniquely identifies the step.
         * @param title The title for the wizard step.
         * @param formBlade The blade containing the form for the wizard step.
         * @param collectorCallbacks The collector inline implementation that handles this wizard step.
         * @param description The description for the wizard step.
         * @param isOptional A value indicating whether or not the step is optional.
         * @param status The initial status of the step.
         * @param extension The extension that hosts the blade containing the form for the wizard step.
         */
        insertWizardStep(position: number, stepId: string, title: string, formBlade: string, description?: string, collectorCallbacks?: Roles.CollectorCallbacks, isOptional?: boolean, status?: ActionBars.Base.Status, extension?: string): void;
        /**
         * Removes the specified wizard step.
         *
         * @param step The step to be removed.
         */
        removeWizardStep(step: Controls.Wizard.WizardStep): void;
        /**
         * Removes the wizard step at the specified position.
         *
         * @param position The 0 based position at which to remove the step.
         * @return The step that was removed.
         */
        removeWizardStepAt(position: number): Controls.Wizard.WizardStep;
        private _extractWizardRoles(roles, lifetimeManager);
        private _onStepLoad(step);
        private _onStepComplete(step);
    }
}
