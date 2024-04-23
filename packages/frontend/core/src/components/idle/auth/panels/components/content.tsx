import { type PropsWithChildren } from 'react';

import * as cls from './panel.css';

export function AuthPanelContent({ children }: PropsWithChildren) {
  return <div className={cls.panelWrapper}>{children}</div>;
}
