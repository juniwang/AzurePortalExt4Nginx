declare interface IBinder<TEntity> {
    /** The underlying data item */
    readonly item: TEntity;

    /** Promise from the latest invokation of fetch */
    readonly promise: Q.Promise<Untyped>;

    /** Force the data to refresh (will update bindings) */
    refresh(): Promise;

    /**
     * Creates a ko.computed which tracks the value of func applied to the resource currently set by resourceId.
     * It will recompute itself any time this.resourceId or the resource value changes.
     */
    binding<T>(func: { (arg: TEntity): T }, defaultValue?: T): KnockoutReadOnlyObservableBase<T>;

    /**
     * Bind a target observable, using ko.computed, with a func that computes a value.
     * It will recompute itself any time this.resourceId or the resource value changes.
     */
    bind<T>(target: KnockoutObservableBase<T>, func: { (arg: TEntity): T }, defaultValue?: T): void;

    /**
     * Creates a readonly ko.observable which tracks the value of func applied to the resource currently set by resourceId.
     * It will recompute itself any time this.resourceId or the resource value changes.
     */
    bindingObservable<T>(func: { (arg: TEntity): T }, defaultValue?: T): KnockoutReadOnlyObservable<T>;
}
