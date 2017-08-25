declare namespace HubsExtension.MonitorChartPart {
    /**
     * Defines how data points are aggregated for a metric.
     */
    const enum AggregationType {
        /**
         * No aggregation is done.
         */
        None,
        /**
         * Data points are aggregated by taking the average of their values.
         */
        Average,
        /**
         * Data points are aggregated by taking the min of their values.
         */
        Minimum,
        /**
         * Data points are aggregated by taking the max of their values.
         */
        Maximum,
        /**
         * Data points are aggregated by taking the total of their values.
         */
        Total
    }

    /**
     * Defines what visualization to use when rendering the chart.
     */
    const enum ChartType {
        /**
         * Line chart.
         */
        Line,
        /**
         * Bar chart.
         */
        Bar
    }

    /**
     * Defines the unit of a metric.
     */
    const enum Unit {
        /**
         * Count unit.
         */
        Count,
        /**
         * Bytes unit.
         */
        Bytes,
        /**
         * Seconds unit.
         */
        Seconds,
        /**
         * CountPerSecond unit.
         */
        CountPerSecond,
        /**
         * BytesPerSecond unit.
         */
        BytesPerSecond,
        /**
         * Percent unit.
         */
        Percent,
        /**
         * MilliSeconds unit.
         */
        MilliSeconds,
        /**
         * ByteSeconds unit.
         */
        ByteSeconds
    }

    /**
     * Defines the timespan over which data points are fetched and plotted.
     */
    interface Timespan {
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

    interface ResourceMetadata {
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

    interface Dimension {
        /**
         * The dimension name.
         */
        name: string;

        /**
         * The dimension value.
         */
        value: string;
    }

    interface Metric {
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
    }

    interface ChartDefinition {
        /**
         * The visualization to use for this chart.
         */
        chartType?: ChartType;

        /**
         * The timespan to use for this chart.
         *
         * Note: This overrides the top-level timespan provided in the Options object.
         */
        timespan?: Timespan;

        /**
         * The metrics to plot on this chart.
         */
        metrics: Metric[];

        /**
         * The title of this chart.
         */
        title?: string;

        /**
         * The subtitle of this chart.
         */
        subtitle?: string;

        /**
         * Message to display if when no metrics are available.
         */
        noMetricsMessage?: string;

        /**
         * Disables pinning for this chart.
         */
        disablePinning?: boolean;

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
    interface Options {
        /**
         * The charts to render.
         */
        charts?: ChartDefinition[];

        /**
         * The timespan used for all charts, unless overriden in an individual chart.
         *
         * Defaults to relative duration of 24 hours if not specified.
         */
        timespan?: Timespan;
    }

    /**
     * Inputs to the part
     */
    interface Parameters {
        /**
         * The inputs to the chart control
         */
        options: Options;

        /**
         * Required to wire to the shared/global timeRange from dashboard.
         * If the part is from Dashboard, and the shared timeRange UX is enabled, use this value.
         * Otherwise, use the default timeRange initialized set by users
         */
        sharedTimeRange?: MsPortalFx.Composition.Configuration.TimeRange;
    }
}