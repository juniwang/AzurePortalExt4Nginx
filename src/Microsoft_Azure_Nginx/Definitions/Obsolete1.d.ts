// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete1\ViewModels\Controls\Visualization\CsmTopology.d.ts
declare module MsPortalFx.ViewModels.Controls.Visualization.CsmTopology {
    /**
     * Overflow node Ids used for selection.
     */
    var RelatedBandOverflowId: string;
    var DependantBandOverflowId: string;
    var InternalBandOverflowId: string;
    var LinkedBandOverflowId: string;
    var SmallSizeOverflowId: string;
    /**
     * Supported sizes for the topology control.
     */
    enum Size {
        /**
         * Small or medium icon size will be used to support 4 x 2 part.
         */
        Small = 0,
        /**
         * Medium or large icon size will be used to support HeroWide part.
         */
        Large = 1,
    }
    /**
     * Resource type enumeration to associate a resource icon for each resource.
     */
    enum ResourceIconType {
        /**
         * Internal type for representing empty placeholder nodes.
         */
        None = 0,
        /**
         * A default resource type which will be represented with default resource icon.
         */
        Default = 1,
        /**
         * Internal type for representing information.
         */
        Info = 2,
        /**
         * Internal type for representing overflow icon.
         */
        Overflow = 3,
        /**
         * Represents a new resource whose icon uri's will be provided by the user.
         */
        Resource = 4,
        /**
         * Represents a resource group.
         */
        ResourceGroup = 5,
        /**
         * Represents website resource.
         */
        Website = 6,
        /**
         * Represents scale group resource.
         */
        ScaleGroup = 7,
        /**
         * Represents sites resource.
         */
        Sites = 8,
        /**
         * Represents database server resource.
         */
        DatabaseServer = 9,
        /**
         * Represents database resource.
         */
        Database = 10,
        /**
         * Represents TFS project resource.
         */
        TFSProject = 11,
        /**
         * Represents TFS account resource.
         */
        TFSAccount = 12,
        /**
         * Represents virtual machine resource.
         */
        VirtualMachine = 13,
        /**
         * Represents nics resource.
         */
        Disks = 14,
        /**
         * Represents nics resource.
         */
        Nics = 15,
        /**
         * Represents IP address resource.
         */
        IPAddress = 16,
        /**
         * Represents availability set resource.
         */
        AvailabilitySet = 17,
        /**
         * Represents AD account resource.
         */
        ADAccount = 18,
    }
    /**
     * Enumeration to specify the logical topology layout band for a resource.
     */
    enum ResourceBand {
        /**
         * Empty placeholder.
         */
        None = 0,
        /**
         * Resource belongs to first topology layout band.
         */
        ResourceGroup = 1,
        /**
         * Resource belongs to second topology layout band.
         */
        Related = 2,
        /**
         * Resource belongs to third topology layout band.
         */
        Dependant = 3,
        /**
         * Resource belongs to fourth topology layout band.
         */
        Internal = 4,
        /**
         * Resource belongs to fifth topology layout band.
         */
        Linked = 5,
    }
    /**
     * Resource selection item contract.
     * The serialized information about current resource selection should implement this interface.
     */
    interface ResourceSelectionItem {
        /**
         * Id of a contract.
         */
        id?: string;
    }
    /**
     * Resource selection item contract.
     * The serialized information about current resource selection should implement this interface.
     */
    interface ResourceSelectionItemContract {
        /**
         * Id of a contract.
         */
        id?: string;
    }
    /**
     * Resource item contract.
     */
    interface ResourceItem {
        /**
         * Name of the current resource.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource.
         */
        id: KnockoutObservable<string>;
        /**
         * Additional information about the resource.
         */
        description: KnockoutObservable<string>;
        /**
         * Specify the resource type.
         */
        type: KnockoutObservable<string>;
    }
    /**
     * Selection option for SelectableSet callbacks.
     */
    interface SelectionOptionContract<TContract extends ResourceSelectionItemContract> {
        /**
         * A function that determines if an item matches a selection.
         *
         * @param item Resource item uniquely identifies a rendered resource.
         * @param selection The selection to match the item to.
         * @return True if the item matches the selection; else false.
         */
        itemMatchesSelection(item: ResourceItem, selection: TContract): boolean;
        /**
         * A factory function that creates a selection based on an item.
         *
         * @param item The resource item for which selection needs to be created.
         * @return The selection for the specified item.
         */
        createSelection(item: ResourceItem): TContract;
        /**
         * Selection state that has been previously saved as part of view state for resource map.
         */
        initialSelection?: MsPortalFx.ViewModels.SetSelection<TContract>;
    }
    /**
     * Right click context menu option.
     */
    interface ContextMenuOption {
        /**
         * The command group.
         */
        commandGroup: string;
        /**
         * The command group owner.
         */
        commandGroupOwner?: string;
    }
    /**
     * Resource hover/click event notification data contract.
     */
    interface EventDataContract {
        /**
         * Name of the current resource.
         */
        name: string;
        /**
         * Unique id of the resource.
         */
        id: string;
        /**
         * Additional information about the resource.
         */
        description: string;
        /**
         * Type of the current resource.
         */
        type: string;
        /**
         * Icon type of the current resource.
         */
        iconType: ResourceIconType;
        /**
         * Number of resources of the given type.
         */
        count: number;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: string;
        /**
         * Current resource status.
         */
        status: ResourceStatus;
        /**
         * Additional information about the current status.
         */
        statusMessage: string;
    }
    /**
     * Resource overflow event notification data contract.
     */
    interface ResourceOverflowEventDataContract {
        /**
         * For Resource view, the name of the current resource in focus will be shown.
         */
        name: string;
        /**
         * For Resource view, the id of the current resource in focus will be shown.
         */
        id: string;
        /**
         * Resource group name of the current resource in focus.
         */
        resourceGroupName: string;
        /**
         * For Resource view, the type of the current resource in focus will be shown.
         */
        type: string;
        /**
         * For Resource view, the icon type of the current resource in focus will be shown.
         */
        iconType: ResourceIconType;
        /**
         * Indicates the layout band of overflow resources that needs to be shown.
         */
        resourceBand: ResourceBand;
    }
    /**
     * Widget view model contract.
     */
    interface Contract<TContract extends ResourceSelectionItemContract> extends Loadable.Contract {
        /**
         * Specify the resource group information.
         */
        resourceGroup: KnockoutObservable<ResourceGroup>;
        /**
         * Specify whether resource group view or resource view should be displayed.
         */
        showResourceView: KnockoutObservable<boolean>;
        /**
         * Specify the primary resource in focus.
         */
        resourceInFocus: KnockoutObservable<string>;
        /**
         * Specify SelectableSet to associate resource selection and its associated blades.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<ResourceItem, TContract>;
        /**
         * Internal representation of the resource items for SelectableSet.
         * The items array is populated by merging all resources in each resource band and / or overflow nodes.
         */
        items: KnockoutObservableArray<ResourceItem>;
        /**
         * Optional context menu option specifing the command group to show on right click context menu.
         */
        contextMenuOption?: ContextMenuOption;
        /**
         * Specify the size of the topology control. The size property will determine the icon size for the resources.
         */
        size: KnockoutObservable<Size>;
        /**
         * Specify the width of the topology chart.
         */
        width: KnockoutObservable<number>;
        /**
         * Specify the height of the topology chart.
         */
        height: KnockoutObservable<number>;
        /**
         * Specify the event handlers for the topology chart.
         */
        events: Events;
    }
    /**
     * Abstraction for CSM Resource.
     */
    class Resource implements ResourceItem {
        /**
         * Name of the current resource.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource.
         */
        id: KnockoutObservable<string>;
        /**
         * Additional information about the resource.
         */
        description: KnockoutObservable<string>;
        /**
         * Optionally specify an external uri. If a value is provided the description will be treated as a link.
         */
        descriptionUri: KnockoutObservable<string>;
        /**
         * Specify the resource type.
         */
        type: KnockoutObservable<string>;
        /**
         * Type of the current resource.
         */
        iconType: KnockoutObservable<ResourceIconType>;
        /**
         * Number of resources of the given type.
         */
        count: KnockoutObservable<number>;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: KnockoutObservable<string>;
        /**
         * Current resource status.
         */
        status: KnockoutObservable<ResourceStatus>;
        /**
         * Additional information about the current status.
         */
        statusMessage: KnockoutObservable<string>;
        /**
         * Related resources belonging to the same resource group and same resource provider.
         */
        relatedResources: KnockoutObservableArray<Resource>;
        /**
         * Nested resources for the current resource.
         */
        dependantResources: KnockoutObservableArray<Resource>;
        /**
         * Sibling resources belonging to the same resource group, internally referenced by current resource and marked as primary resource.
         */
        internalResources: KnockoutObservableArray<Resource>;
        /**
         * Linked resources belonging to the different resource group.
         */
        linkedResources: KnockoutObservableArray<Resource>;
        /**
         * Icon for the resource.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
    }
    /**
     * Specify the properties of a resource group node and its dependant resources.
     */
    class ResourceGroup {
        /**
         * Name of the resource group.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource group.
         */
        id: KnockoutObservable<string>;
        /**
         * Optionally specify the type for resource group. The type information is hint for the control to associate a resource group icon and not a CSM type.
         */
        iconType: KnockoutObservable<ResourceIconType>;
        /**
         * Optionally override the default icon for the resource group.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * Nested resources marked as primary resource.
         */
        resources: KnockoutObservableArray<Resource>;
        /**
         * External linked resources which are part of a different resource group and marked as primary resource.
         */
        linkedResources: KnockoutObservableArray<Resource>;
    }
    /**
     * Defines the event notification supported by topology chart.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class Events {
        /**
         * Event handler is invoked on click event on the resource icon.
         */
        resourceClick: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on mouseenter event on the resource icon.
         */
        resourceMouseEnter: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on mouseleave event on the resource icon.
         */
        resourceMouseLeave: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on click event on the overflow resource icon.
         */
        resourceOverflowClick: (eventData: ResourceOverflowEventDataContract) => void;
        /**
         * Event handler is invoked when control background plot area is clicked.
         */
        plotAreaClick: () => void;
    }
    /**
     * Resource hover/click event notification data.
     */
    class EventData implements EventDataContract {
        /**
         * Name of the current resource.
         */
        name: string;
        /**
         * Unique id of the resource.
         */
        id: string;
        /**
         * Additional information about the resource.
         */
        description: string;
        /**
         * Type of the current resource.
         */
        type: string;
        /**
         * Type of the current resource.
         */
        iconType: ResourceIconType;
        /**
         * Number of resources of the given type.
         */
        count: number;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: string;
        /**
         * Current resource status.
         */
        status: ResourceStatus;
        /**
         * Additional information about the current status.
         */
        statusMessage: string;
    }
    /**
     * Resource overflow event notification data.
     * For Resource view, the information about current resource in focus will be shown.
     * For ResourceGroup view, the information about ResourceGroup will be shown.
     */
    class ResourceOverflowEventData implements ResourceOverflowEventDataContract {
        /**
         * For Resource view, the name of the current resource in focus will be shown.
         */
        name: string;
        /**
         * For Resource view, the id of the current resource in focus will be shown.
         */
        id: string;
        /**
         * Resource group name of the current resource in focus.
         */
        resourceGroupName: string;
        /**
         * For Resource view, the type of the current resource in focus will be shown.
         */
        type: string;
        /**
         * For Resource view, the icon type of the current resource in focus will be shown.
         */
        iconType: ResourceIconType;
        /**
         * Indicates the layout band of overflow resources that needs to be shown.
         */
        resourceBand: ResourceBand;
    }
    /**
     * View model properties for the topology control.
     */
    class ViewModel<TContract extends ResourceSelectionItemContract> extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract<TContract> {
        /**
         * Specify the resource group information.
         */
        resourceGroup: KnockoutObservable<ResourceGroup>;
        /**
         * Specify whether resource group view or resource view should be displayed.
         */
        showResourceView: KnockoutObservable<boolean>;
        /**
         * Specify the primary resource in focus.
         */
        resourceInFocus: KnockoutObservable<string>;
        /**
         * SelectableSet to associate resource selection and its associated blades.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<ResourceItem, TContract>;
        /**
         * Internal representation of the resource items for SelectableSet.
         * The items array is populated by merging all resources in each resource band and / or overflow nodes.
         */
        items: KnockoutObservableArray<ResourceItem>;
        /**
         * Optional context menu option specifing the command group to show on right click context menu.
         */
        contextMenuOption: ContextMenuOption;
        /**
         * Specify the size of the topology control. The size property will determine the icon size for the resources.
         */
        size: KnockoutObservable<Size>;
        /**
         * Specify the width of the topology chart.
         */
        width: KnockoutObservable<number>;
        /**
         * Specify the height of the topology chart.
         */
        height: KnockoutObservable<number>;
        /**
         * Specify the event handlers for the topology chart.
         */
        events: Events;
        /**
         * Creates a csm topology view model.
         *
         * @param lifetimeManager Lifetime manager for this view model.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, selectionOption?: SelectionOptionContract<TContract>);
        /**
         * See interface.
         */
        dispose(): void;
    }
}
