import { DEFAULT_VARIANT } from './constant';
import type { ComponentVariant, Identifier } from './types';

/**
 * Creates an identifier object with the given name and variant.
 * If no variant is provided, it defaults to DEFAULT_VARIANT.
 *
 * @param name The name for the identifier.
 * @param variant The variant for the identifier. Defaults to DEFAULT_VARIANT.
 * @returns An identifier object with the specified name and variant.
 *
 * @example
 * const myIdentifier = createIdentifier<MyType>('myIdentifierName', 'CUSTOM_VARIANT');
 */
export function createIdentifier<T>(
  name: string,
  variant: ComponentVariant = DEFAULT_VARIANT,
): Identifier<T> & ((variant: ComponentVariant) => Identifier<T>) {
  return Object.assign(
    (v: ComponentVariant) => {
      return createIdentifier<T>(name, v);
    },
    {
      identifierName: name,
      variant,
    },
  ) as any;
}

export function parseIdentifier<T>(identifier: Identifier<T>) {
  return Symbol.for(identifier.identifierName);
}
