import { ContainerModule, type interfaces } from 'inversify';

import { DEFAULT_VARIANT, METADATA_KEY } from './constant';
import { parseIdentifier } from './identifier';
import type { SubComponent } from './types';

function resolve(component: SubComponent, bind: interfaces.Bind) {
  const { identifier, factory } = component;

  if (identifier.variant !== DEFAULT_VARIANT) {
    return bind(parseIdentifier(identifier))
      .toDynamicValue((ctx) => factory(ctx))
      .whenTargetNamed(identifier.variant);
  }

  return bind(parseIdentifier(identifier)).toDynamicValue((context) =>
    component.factory(context),
  );
}

export function buildDecorators(): ContainerModule {
  return new ContainerModule((bind) => {
    const provideMetadata: SubComponent[] =
      Reflect.getMetadata(METADATA_KEY.subComponent, Reflect) || [];
    provideMetadata.map((metadata) => resolve(metadata, bind));
  });
}
