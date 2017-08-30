// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as Strings from "NginxStrings";
import { DeleteProject } from "Project/ProjectRestOperations";

import FxViewModels = MsPortalFx.ViewModels;
import Dialogs = FxViewModels.Dialogs;
import Images = MsPortalFx.Base.Images;

export class ProjectDelete {
    public readonly canExecute = ko.observable(true);
    public static readonly messageBox = new Dialogs.MessageBox(Strings.Command.Delete.title, Strings.Command.Delete.prompt, Dialogs.MessageBoxButtons.YesNo);
    public static readonly icon = Images.Delete();
    public static readonly label = Strings.Command.Delete.title;

    public constructor(private getId: () => string, private blade: string) { }

    public execute(result: Dialogs.DialogResult) {
        if (result === Dialogs.DialogResult.Yes) {
            this.canExecute(false);
            const id = this.getId();
            const deleteOp = new DeleteProject(id, this.blade);
            const promise = deleteOp.run();
            Q.any([promise, Q.delay(2000)]).finally(() => this.canExecute(true));
        }
        return Q(true);
    }
}