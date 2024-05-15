/**
 * Report error when no property is provided.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * Widen `T` to `U` while keeping the structure, with non-object properties widened to `Default`.
 *
 * @param T The object to be converted.
 * @param U The type to be converted to.
 * @param Default The default type.
 */
export type UnAsConst<T, U, Default> = RequireAtLeastOne<{
  readonly [K in keyof T]: T[K] extends U
    ? RequireAtLeastOne<UnAsConst<T[K], U, Default>>
    : Default;
}>;

/**
 * Increment a number type by 1.
 */
export type Increment<N extends number, T extends any[] = []> = T['length'] extends N
  ? [...T, any]['length']
  : Increment<N, [...T, any]>;

/**
 * A stack data structure implemented with tuple.
 */
export type Stack<T> = T[];

/**
 * Get the generic type of the stack.
 */
export type GetStackType<S extends Stack<any>> = S[number];

/**
 * Push a value to the stack.
 */
export type Push<S extends Stack<any>, V> = [V, ...S];

/**
 * Pop a value from the stack.
 */
export type Pop<S extends Stack<any>> = S extends [
  GetStackType<S>,
  ...infer Rest extends Array<GetStackType<S>>,
]
  ? Rest
  : never;

/**
 * Get the top value of the stack.
 */
export type Top<S extends Stack<any>> = S extends [
  infer Top extends GetStackType<S>,
  ...Array<GetStackType<S>>,
]
  ? Top
  : never;

declare const emptyObjectSymbol: unique symbol;

/**
 * An empty object type which has no properties.
 */
export interface EmptyObject {
  [emptyObjectSymbol]?: never;
}

/**
 * A type that can be used to represent a nested object structure.
 *
 * @param T The type of the value.
 */
export interface SelfNestedObject<T> {
  [key: string]: T | SelfNestedObject<T>;
}
