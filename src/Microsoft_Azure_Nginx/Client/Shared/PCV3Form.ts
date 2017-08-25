"use strict"

import FxViewModels = MsPortalFx.ViewModels;
import Forms = FxViewModels.Forms;
import ParameterProvider = FxViewModels.ParameterProvider;
import ActionBar = FxViewModels.ActionBars.Base.ViewModel;

export class AsymmetricForm<TEditScope, TForm, TConfig>
    extends Forms.Form.ViewModel<TEditScope>
    implements FxViewModels.BladeContract {

    public title = ko.observable<string>();
    public icon = ko.observable<MsPortalFx.Base.Image>();
    public subtitle = ko.observable<string>();

    public formElements = ko.observableArray<FxViewModels.Controls.Base.Contract>([]);
    public parameterProvider: ParameterProvider<TForm, TEditScope>;
    public actionBar: ActionBar;

    constructor(
        container: ContainerContract,
        mapIncoming: (self: AsymmetricForm<TEditScope, TForm, TConfig>) => (incoming: TForm, config?: TConfig) => TEditScope | PromiseV<TEditScope>,
        mapOutgoing: (self: AsymmetricForm<TEditScope, TForm, TConfig>) => (outgoing: TEditScope) => TForm,
        actionBar: ActionBar) {

        super(container);

        this.parameterProvider = new ParameterProvider(
            container,
            {
                mapIncomingDataForEditScopeAsync: incoming => {
                    let config = this.parameterProvider.configFromCollector();
                    let mapped = mapIncoming(this)(incoming, config);
                    return Q.isPromise(mapped) ? mapped as PromiseV<TEditScope> : Q(mapped as TEditScope);
                },
                mapOutgoingDataForCollector: mapOutgoing(this),
            });
        this.editScope = this.parameterProvider.editScope;
        this.actionBar = actionBar;
        this.valid.subscribe(container, this.actionBar.valid);

        this.sections.push(new Forms.Section.ViewModel(
            container,
            {
                children: this.formElements,
            }));
    }
}

export class SymmetricForm<TForm, TConfig>
    extends AsymmetricForm<TForm, TForm, TConfig> {
}