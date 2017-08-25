// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete2\ViewModels\Controls\Visualization\PairedTimeline.d.ts
declare module MsPortalFx.ViewModels.Controls.Visualization.PairedTimeline {
    import Visualization = Controls.Visualization;
    import Chart = Visualization.Chart;
    import Metrics = Visualization.Metrics;
    import RangeSelection = Visualization.RangeSelection;
    import PairedTimelineBadges = Visualization.PairedTimelineBadges;
    import ListView = MsPortalFx.ViewModels.Controls.Lists.ListView;
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
        ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>;
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
        ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>;
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
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>, extensionOptions: ListView.ExtensionOptions, rangeSelectionOptions?: RangeSelection.Options<TX>, pairedTimelineBadgesOptions?: PairedTimelineBadges.Options<TX>);
    }
}

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete2\ViewModels\Controls\Visualization\PairedTimelineBadges.d.ts
declare module MsPortalFx.ViewModels.Controls.Visualization.PairedTimelineBadges {
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

// FILE: E:\bt\826948\repo\src\SDK\Framework\TypeScript\Obsolete2\ViewModels\Controls\Visualization\RangeSelection.d.ts
declare module MsPortalFx.ViewModels.Controls.Visualization.RangeSelection {
    enum LabelPosition {
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
    class ViewModel<T> extends Base.ViewModel {
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
