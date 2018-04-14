export * from './Auth';
export * from './Resume';
export * from './Tooltip';

import { LoginActions } from './Auth';
import { ResumeActions } from './Resume';
import { TooltipActions } from './Tooltip';

export type AppActions = LoginActions | ResumeActions | TooltipActions;
