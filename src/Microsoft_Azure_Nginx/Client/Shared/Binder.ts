"use strict";

// (Mostly) From Redis extension

export class Binder<TEntity> implements IBinder<TEntity> {
    private _promise: Q.Promise<Untyped>;

    constructor(
        private _view: MsPortalFx.Data.EntityView<TEntity, string>,
        private _container: LifetimeManager,
        private _resourceId: KnockoutObservableBase<string>) {
        this.activate(this._resourceId);
    }

    private activate(resourceId: KnockoutObservableBase<string>): void {
        this._resourceId.subscribeAndRun(this._container, id => {
            if (id) this._promise = Q(this._view.fetch(id));
        });
    }

    // Requests latest data from the server
    public refresh() {
        return Q(this._view.refresh());
    }

    get item() {
        return this._view.data;
    }

    get promise() {
        return this._promise;
    }

    // Creates a ko.observable which tracks the value of func applied to the resource currently set by resourceId.
    // It will recompute itself any time this.resourceId or the resource value changes.
    public binding<T>(func: { (arg: TEntity): T }, defaultValue?: T): KnockoutReadOnlyObservableBase<T> {
        return ko.computed(this._container, () => {
            let c = this._view.item();
            return c ? func(c) : defaultValue;
        });
    }

    public bind<T>(target: KnockoutObservableBase<T>, func: { (arg: TEntity): T }, defaultValue?: T) {
        this.binding(func, defaultValue).subscribe(this._container, value => {
            if (target.peek() !== value) target(value);
        });
    }

    public bindingObservable<T>(func: { (arg: TEntity): T }, defaultValue?: T): KnockoutReadOnlyObservable<T> {
        const observable = ko.observable<T>(defaultValue);
        this.bind(observable, func, defaultValue);
        return observable;
    }
}