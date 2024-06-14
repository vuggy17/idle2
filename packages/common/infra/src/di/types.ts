import { type interfaces } from 'inversify';

export type ComponentFactory<T = any> = (context: interfaces.Context) => T;
export type ComponentVariant = string;

export type Identifier<T> = {
  identifierName: string;
  variant: ComponentVariant;
  __TYPE__: T;
};

export interface SubComponent {
  identifier: Identifier<any>;
  factory: ComponentFactory;
}
