import type { PropsWithChildren } from 'react';

import * as cls from './style.css';

export function FriendPanelLayout({ children }: PropsWithChildren) {
  return <div className={cls.tabPanelWrapper}> {children}</div>;
}
