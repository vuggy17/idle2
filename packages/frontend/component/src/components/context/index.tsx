import { type createStore, Provider } from 'jotai';
import { type PropsWithChildren, useMemo } from 'react';

import { ProviderComposer } from '../provider-composer';
import { ThemeConfig } from './theme-context';

export type IdleContextProps = PropsWithChildren<{
  store?: ReturnType<typeof createStore>;
}>;

export function IdleContext({ store, children }: IdleContextProps) {
  return (
    <ProviderComposer
      contexts={useMemo(
        () =>
          [
            <Provider key="JotaiProvider" store={store} />,
            <ThemeConfig key="AntdThemProvider" />,
          ].filter(Boolean),
        [store],
      )}
    >
      {children}
    </ProviderComposer>
  );
}
