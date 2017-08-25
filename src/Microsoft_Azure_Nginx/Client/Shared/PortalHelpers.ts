// --------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// --------------------------------------------------------------------------------------------

import * as TemplateBlade from "Fx/Composition/TemplateBlade";

export type StrictConfig<T> = Record<keyof T, TemplateBlade.Configurable.SettingMetadata>;
