import { AppBackground } from '@idle/component/background';
import { GlassPanel } from '@idle/component/root';
import type { PropsWithChildren } from 'react';

import { mainContainer } from './index.css';

export default function AppContainer({ children }: PropsWithChildren) {
  return (
    <AppBackground>
      <GlassPanel>{children}</GlassPanel>
    </AppBackground>
  );
}

export function MainContainer({ children }: PropsWithChildren) {
  return <div className={mainContainer}>{children}</div>;
}
