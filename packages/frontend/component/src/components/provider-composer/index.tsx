import type { PropsWithChildren, ReactNode } from 'react';
import { cloneElement } from 'react';

interface ProviderComposerProps extends PropsWithChildren {
  contexts: any;
}

/**
 *
 * @param {any[]} contexts: Providers, those component mus have children props!
 * @returns
 */
export const ProviderComposer = ({
  contexts,
  children,
}: ProviderComposerProps) =>
  contexts.reduceRight(
    (kids: ReactNode, parent: any) =>
      cloneElement(parent, {
        children: kids,
      }),
    children,
  );
