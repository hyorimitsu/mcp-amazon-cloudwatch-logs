import { type z } from 'zod'

/**
 * Helper function to create type-safe Zod schemas
 *
 * This function ensures that the Zod schema matches the expected TypeScript type.
 * It generates compilation errors when there's inconsistency between TypeScript
 * type definitions and Zod schemas.
 *
 * @template T - The TypeScript type that must be matched by the Zod schema
 *
 * @example
 * ```typescript
 * type User = {
 *   name: string;
 *   age: number;
 * }
 *
 * const UserSchema = typeSafeSchema<User>()(
 *   z.object({
 *     name: z.string(),
 *     age: z.number(),
 *   })
 * );
 * ```
 *
 * @returns A function that accepts a Zod schema and returns it with proper type inference
 */
export const typeSafeSchema =
  <T>() =>
  <S extends z.ZodType<T>>(arg: S) =>
    arg
