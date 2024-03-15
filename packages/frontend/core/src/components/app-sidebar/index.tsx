import type { PropsWithChildren } from 'react';

import { wrapper } from './index.css';
import { SidebarHeader } from './sidebar-header';

export function AppSidebar({ children }: PropsWithChildren) {
  return (
    <div className={wrapper}>
      <SidebarHeader />
      {children}
    </div>
  );
}

export function AppSidebarFallback() {
  return <div className={wrapper}>app sidebar fallback</div>;
}
