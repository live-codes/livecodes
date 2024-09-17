import type { CustomTypeOptions } from 'i18next';

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
type Increment<N extends number, T extends any[] = []> = T['length'] extends N
  ? [...T, any]['length']
  : Increment<N, [...T, any]>;

/**
 * A stack data structure implemented with tuple.
 */
type Stack<T> = T[];

/**
 * Get the generic type of the stack.
 */
type GetStackType<S extends Stack<any>> = S[number];

/**
 * Push a value to the stack.
 */
type Push<S extends Stack<any>, V> = [V, ...S];

/**
 * Pop a value from the stack.
 */
type Pop<S extends Stack<any>> = S extends [
  GetStackType<S>,
  ...infer Rest extends Array<GetStackType<S>>,
]
  ? Rest
  : never;

/**
 * Get the top value of the stack.
 */
type Top<S extends Stack<any>> = S extends [
  infer Top extends GetStackType<S>,
  ...Array<GetStackType<S>>,
]
  ? Top
  : never;

declare const emptyObjectSymbol: unique symbol;

/**
 * An empty object type which has no properties.
 */
interface EmptyObject {
  [emptyObjectSymbol]?: never;
}

/**
 * A type that can be used to represent a nested object structure.
 *
 * @param T The type of the value.
 */
interface SelfNestedObject<T> {
  [key: string]: T | SelfNestedObject<T>;
}

export interface TagElement {
  name: string;
  attributes?: Record<string, string>;
}

/**
 * Get the base object of the given namespace.
 *
 * @param Base The overall i18next resources object.
 * @param Key The key to get the base object.
 */
type GetNamespaceBase<
  Base extends CustomTypeOptions['resources'],
  Key extends string,
> = Key extends `${infer Namespace}:${infer _Rest}`
  ? Namespace extends keyof Base
    ? Base[Namespace]
    : never
  : Base[CustomTypeOptions['defaultNS']];

/**
 * Recursively get the translation of the given key.
 *
 * @param Base The base object of the namespace. Use `GetNamespaceBase` to get it.
 * @param Key The key to get the translation.
 */
type GetTranslation<
  Base extends SelfNestedObject<string>,
  Key extends string,
> = Key extends `${infer Start}.${infer Rest}`
  ? Start extends keyof Base
    ? Rest extends string
      ? Base[Start] extends SelfNestedObject<string>
        ? GetTranslation<Base[Start], Rest>
        : never
      : never
    : never
  : Key extends keyof Base
    ? Base[Key] extends string
      ? Base[Key]
      : never
    : never;

/**
 * Infer all flattened keys of the given object.
 *
 * The first level keys are considered as namespaces and will be separated by colon, while the rest
 * will be separated by dot.
 *
 * @param Base The object to infer keys from.
 * @param isNs Whether it is a namespace.
 */
type InferKeys<Base, isNs extends boolean = false, KeyStr extends string = ''> = {
  [K in keyof Base]: Base[K] extends object
    ? KeyStr extends '' // Whether it is of first level (namespace)
      ? InferKeys<Base[K], true, `${K & string}`>
      : KeyStr extends CustomTypeOptions['defaultNS'] // Default namespace and colon can be omitted
        ?
            | InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`>
            | InferKeys<Base[K], false, `${K & string}`>
        : InferKeys<Base[K], false, `${KeyStr}${isNs extends true ? ':' : '.'}${K & string}`>
    : `${KeyStr}${KeyStr extends '' ? '' : '.'}${K & string}`;
}[keyof Base];

/**
 * Extract all interpolations from the given string.
 *
 * @param Value The string to extract interpolations from.
 */
type ExtractInterpolations<Value extends string> =
  Value extends `${infer _First}{{${infer Interpolation}}}${infer Rest}`
    ? Interpolation | ExtractInterpolations<Rest>
    : never;

/**
 * Other options that could be passed to `translateString` in addition to interpolations.
 */
interface I18nOptions {
  isHTML?: boolean;
}

/**
 * Type system's version of `abstractifyHTML`.
 *
 * @param T The HTML string to abstractify.
 */
type AbstractifyHTML<
  T extends string,
  Index extends number = 1,
  I extends Stack<number> = [],
  S extends Stack<string> = [],
> = T extends `${infer Pre}<${infer Tag}>${infer Post}`
  ? Tag extends `/${Top<S>}` // End tag
    ? `${Pre}</${Top<I>}>${AbstractifyHTML<Post, Index, Pop<I>, Pop<S>>}` // Back to previous tag
    : Tag extends `${infer _} /` // Self-closing tag
      ? `${Pre}<${Index}></${Index}>${AbstractifyHTML<Post, Increment<Index>, I, S>}`
      : `${Pre}<${Index}>${AbstractifyHTML<
          Post,
          Increment<Index>,
          Push<I, Index>,
          Push<S, Tag extends `${infer RealTag} ${infer _Rest}` ? RealTag : Tag> // Get the real tag name
        >}`
  : T; // No more tags

type I18nRawInterpolationType<Value extends string> = {
  [K in ExtractInterpolations<Value>]?: string | number;
};

/**
 * Type for the interpolation object passed to `translateString`.
 *
 * @param T The value that contains interpolations.
 */
export type I18nInterpolationType<T extends string> =
  I18nRawInterpolationType<T> extends EmptyObject
    ? [I18nOptions?]
    : [I18nRawInterpolationType<T> & I18nOptions];

/**
 * Type for the key passed to `translateString`.
 */
export type I18nKeyType = InferKeys<CustomTypeOptions['resources'], true>;

type I18nRawValueType<Key extends I18nKeyType> = GetTranslation<
  GetNamespaceBase<CustomTypeOptions['resources'], Key>,
  Key
>;

/**
 * Type for the default value passed to `translateString`.
 *
 * @param Key The key of the translation.
 * @param Value The default value to translate. Should be inferred.
 */
export type I18nValueType<Key extends I18nKeyType, Value extends string> =
  Value extends I18nRawValueType<Key>
    ? Value
    : AbstractifyHTML<Value> extends I18nRawValueType<Key>
      ? Value
      : never;
