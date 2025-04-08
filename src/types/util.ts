/**
 * Utility type to convert optional properties to explicitly include undefined
 *
 * This type recursively transforms properties with optional modifier (?) to explicitly include
 * undefined in their type union. It works on all levels of nested object structures and arrays,
 * ensuring type consistency when working with optional properties in TypeScript.
 *
 * @template T - The TypeScript type whose optional properties should be transformed
 *
 * @example
 * ```typescript
 * // Simple object
 * type User = {
 *   name?: string;
 *   age: number;
 * }
 *
 * type UserWithExplicitUndefined = OptionalToUndefined<User>;
 * // Result:
 * // {
 * //   name?: string | undefined;
 * //   age: number;
 * // }
 *
 * // Nested object
 * type NestedUser = {
 *   name?: string;
 *   profile?: {
 *     age?: number;
 *     address: {
 *       city?: string;
 *       country: string;
 *     };
 *   };
 * }
 *
 * type NestedUserWithExplicitUndefined = OptionalToUndefined<NestedUser>;
 * // Result:
 * // {
 * //   name?: string | undefined;
 * //   profile?: {
 * //     age?: number | undefined;
 * //     address: {
 * //       city?: string | undefined;
 * //       country: string;
 * //     };
 * //   } | undefined;
 * // }
 *
 * // Arrays
 * type UserWithArray = {
 *   name?: string;
 *   friends?: { id: number; name?: string }[];
 * }
 *
 * type UserWithArrayExplicitUndefined = OptionalToUndefined<UserWithArray>;
 * // Result:
 * // {
 * //   name?: string | undefined;
 * //   friends?: { id: number; name?: string | undefined }[] | undefined;
 * // }
 * ```
 *
 * @returns A new type with all optional properties explicitly including undefined at all nesting levels
 */
export type OptionalToUndefined<T> = {
  [K in keyof T]: undefined extends T[K]
    ? T[K] extends undefined
      ? T[K]
      : T[K] extends (infer U)[]
        ? OptionalToUndefined<U>[] | undefined
        : T[K] extends object
          ? OptionalToUndefined<T[K]> | undefined
          : T[K] | undefined
    : T[K] extends (infer U)[]
      ? OptionalToUndefined<U>[]
      : T[K] extends object
        ? OptionalToUndefined<T[K]>
        : T[K]
}
