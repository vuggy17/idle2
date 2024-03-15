import { type PropsWithChildren, Suspense } from 'react';

import { AppSidebarFallback } from '../components/app-sidebar';
import AppContainer, { MainContainer } from '../components/containers';
import { RootAppSidebar } from '../components/root-app-sidebar';
import { AllWorkspaceModals } from '../providers/modal-provider';

function WorkspaceLayoutInner({ children }: PropsWithChildren) {
  return (
    <AppContainer>
      <Suspense fallback={<AppSidebarFallback />}>
        <RootAppSidebar />
      </Suspense>
      <MainContainer>
        <Suspense>{children}</Suspense>
      </MainContainer>
    </AppContainer>
  );
}

export function WorkspaceLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <AllWorkspaceModals />
      </Suspense>
      <Suspense fallback="Loading workspace">
        <WorkspaceLayoutInner>{children}</WorkspaceLayoutInner>
      </Suspense>
    </>
  );
}
