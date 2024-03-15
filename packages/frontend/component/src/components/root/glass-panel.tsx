import type { PropsWithChildren } from 'react';

import { panel } from './glass-panel.css';

export function GlassPanel({ children }: PropsWithChildren) {
  return <div className={panel}>{children}</div>;
}
