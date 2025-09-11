
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserRecipe
 * 
 */
export type UserRecipe = $Result.DefaultSelection<Prisma.$UserRecipePayload>
/**
 * Model MealPlan
 * 
 */
export type MealPlan = $Result.DefaultSelection<Prisma.$MealPlanPayload>
/**
 * Model MealPlanItem
 * 
 */
export type MealPlanItem = $Result.DefaultSelection<Prisma.$MealPlanItemPayload>
/**
 * Model Progress
 * 
 */
export type Progress = $Result.DefaultSelection<Prisma.$ProgressPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model RecipeIngredient
 * 
 */
export type RecipeIngredient = $Result.DefaultSelection<Prisma.$RecipeIngredientPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RecipeSourceType: {
  SPOONACULAR: 'SPOONACULAR',
  USER_UPLOAD: 'USER_UPLOAD',
  EXTERNAL_API: 'EXTERNAL_API',
  MANUAL_ENTRY: 'MANUAL_ENTRY'
};

export type RecipeSourceType = (typeof RecipeSourceType)[keyof typeof RecipeSourceType]


export const RecipeDifficulty: {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export type RecipeDifficulty = (typeof RecipeDifficulty)[keyof typeof RecipeDifficulty]

}

export type RecipeSourceType = $Enums.RecipeSourceType

export const RecipeSourceType: typeof $Enums.RecipeSourceType

export type RecipeDifficulty = $Enums.RecipeDifficulty

export const RecipeDifficulty: typeof $Enums.RecipeDifficulty

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRecipe`: Exposes CRUD operations for the **UserRecipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRecipes
    * const userRecipes = await prisma.userRecipe.findMany()
    * ```
    */
  get userRecipe(): Prisma.UserRecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealPlan`: Exposes CRUD operations for the **MealPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealPlans
    * const mealPlans = await prisma.mealPlan.findMany()
    * ```
    */
  get mealPlan(): Prisma.MealPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealPlanItem`: Exposes CRUD operations for the **MealPlanItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealPlanItems
    * const mealPlanItems = await prisma.mealPlanItem.findMany()
    * ```
    */
  get mealPlanItem(): Prisma.MealPlanItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progress`: Exposes CRUD operations for the **Progress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Progresses
    * const progresses = await prisma.progress.findMany()
    * ```
    */
  get progress(): Prisma.ProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeIngredient`: Exposes CRUD operations for the **RecipeIngredient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeIngredients
    * const recipeIngredients = await prisma.recipeIngredient.findMany()
    * ```
    */
  get recipeIngredient(): Prisma.RecipeIngredientDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserRecipe: 'UserRecipe',
    MealPlan: 'MealPlan',
    MealPlanItem: 'MealPlanItem',
    Progress: 'Progress',
    Recipe: 'Recipe',
    RecipeIngredient: 'RecipeIngredient'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userRecipe" | "mealPlan" | "mealPlanItem" | "progress" | "recipe" | "recipeIngredient"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserRecipe: {
        payload: Prisma.$UserRecipePayload<ExtArgs>
        fields: Prisma.UserRecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          findFirst: {
            args: Prisma.UserRecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          findMany: {
            args: Prisma.UserRecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>[]
          }
          create: {
            args: Prisma.UserRecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          createMany: {
            args: Prisma.UserRecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>[]
          }
          delete: {
            args: Prisma.UserRecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          update: {
            args: Prisma.UserRecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          deleteMany: {
            args: Prisma.UserRecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>[]
          }
          upsert: {
            args: Prisma.UserRecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRecipePayload>
          }
          aggregate: {
            args: Prisma.UserRecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRecipe>
          }
          groupBy: {
            args: Prisma.UserRecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRecipeCountArgs<ExtArgs>
            result: $Utils.Optional<UserRecipeCountAggregateOutputType> | number
          }
        }
      }
      MealPlan: {
        payload: Prisma.$MealPlanPayload<ExtArgs>
        fields: Prisma.MealPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          findFirst: {
            args: Prisma.MealPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          findMany: {
            args: Prisma.MealPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>[]
          }
          create: {
            args: Prisma.MealPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          createMany: {
            args: Prisma.MealPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>[]
          }
          delete: {
            args: Prisma.MealPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          update: {
            args: Prisma.MealPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          deleteMany: {
            args: Prisma.MealPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>[]
          }
          upsert: {
            args: Prisma.MealPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanPayload>
          }
          aggregate: {
            args: Prisma.MealPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealPlan>
          }
          groupBy: {
            args: Prisma.MealPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealPlanCountArgs<ExtArgs>
            result: $Utils.Optional<MealPlanCountAggregateOutputType> | number
          }
        }
      }
      MealPlanItem: {
        payload: Prisma.$MealPlanItemPayload<ExtArgs>
        fields: Prisma.MealPlanItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealPlanItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealPlanItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          findFirst: {
            args: Prisma.MealPlanItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealPlanItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          findMany: {
            args: Prisma.MealPlanItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>[]
          }
          create: {
            args: Prisma.MealPlanItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          createMany: {
            args: Prisma.MealPlanItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealPlanItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>[]
          }
          delete: {
            args: Prisma.MealPlanItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          update: {
            args: Prisma.MealPlanItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          deleteMany: {
            args: Prisma.MealPlanItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealPlanItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealPlanItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>[]
          }
          upsert: {
            args: Prisma.MealPlanItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanItemPayload>
          }
          aggregate: {
            args: Prisma.MealPlanItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealPlanItem>
          }
          groupBy: {
            args: Prisma.MealPlanItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealPlanItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealPlanItemCountArgs<ExtArgs>
            result: $Utils.Optional<MealPlanItemCountAggregateOutputType> | number
          }
        }
      }
      Progress: {
        payload: Prisma.$ProgressPayload<ExtArgs>
        fields: Prisma.ProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          findFirst: {
            args: Prisma.ProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          findMany: {
            args: Prisma.ProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          create: {
            args: Prisma.ProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          createMany: {
            args: Prisma.ProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          delete: {
            args: Prisma.ProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          update: {
            args: Prisma.ProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          deleteMany: {
            args: Prisma.ProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>[]
          }
          upsert: {
            args: Prisma.ProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressPayload>
          }
          aggregate: {
            args: Prisma.ProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgress>
          }
          groupBy: {
            args: Prisma.ProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgressCountArgs<ExtArgs>
            result: $Utils.Optional<ProgressCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      RecipeIngredient: {
        payload: Prisma.$RecipeIngredientPayload<ExtArgs>
        fields: Prisma.RecipeIngredientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeIngredientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeIngredientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          findFirst: {
            args: Prisma.RecipeIngredientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeIngredientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          findMany: {
            args: Prisma.RecipeIngredientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>[]
          }
          create: {
            args: Prisma.RecipeIngredientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          createMany: {
            args: Prisma.RecipeIngredientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeIngredientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>[]
          }
          delete: {
            args: Prisma.RecipeIngredientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          update: {
            args: Prisma.RecipeIngredientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          deleteMany: {
            args: Prisma.RecipeIngredientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeIngredientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeIngredientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>[]
          }
          upsert: {
            args: Prisma.RecipeIngredientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeIngredientPayload>
          }
          aggregate: {
            args: Prisma.RecipeIngredientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeIngredient>
          }
          groupBy: {
            args: Prisma.RecipeIngredientGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeIngredientGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeIngredientCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeIngredientCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userRecipe?: UserRecipeOmit
    mealPlan?: MealPlanOmit
    mealPlanItem?: MealPlanItemOmit
    progress?: ProgressOmit
    recipe?: RecipeOmit
    recipeIngredient?: RecipeIngredientOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    mealPlans: number
    progress: number
    userRecipes: number
    recipes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlans?: boolean | UserCountOutputTypeCountMealPlansArgs
    progress?: boolean | UserCountOutputTypeCountProgressArgs
    userRecipes?: boolean | UserCountOutputTypeCountUserRecipesArgs
    recipes?: boolean | UserCountOutputTypeCountRecipesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMealPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecipeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
  }


  /**
   * Count Type MealPlanCountOutputType
   */

  export type MealPlanCountOutputType = {
    mealPlanItems: number
  }

  export type MealPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlanItems?: boolean | MealPlanCountOutputTypeCountMealPlanItemsArgs
  }

  // Custom InputTypes
  /**
   * MealPlanCountOutputType without action
   */
  export type MealPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanCountOutputType
     */
    select?: MealPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MealPlanCountOutputType without action
   */
  export type MealPlanCountOutputTypeCountMealPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanItemWhereInput
  }


  /**
   * Count Type RecipeCountOutputType
   */

  export type RecipeCountOutputType = {
    ingredients: number
    userRecipes: number
    mealPlanItems: number
  }

  export type RecipeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredients?: boolean | RecipeCountOutputTypeCountIngredientsArgs
    userRecipes?: boolean | RecipeCountOutputTypeCountUserRecipesArgs
    mealPlanItems?: boolean | RecipeCountOutputTypeCountMealPlanItemsArgs
  }

  // Custom InputTypes
  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCountOutputType
     */
    select?: RecipeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountIngredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountUserRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecipeWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountMealPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    age: number | null
    weight: number | null
    height: number | null
  }

  export type UserSumAggregateOutputType = {
    age: number | null
    weight: number | null
    height: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    age: number | null
    weight: number | null
    goals: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activityLevel: string | null
    height: number | null
    diet_preference: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    name: string | null
    age: number | null
    weight: number | null
    goals: string | null
    createdAt: Date | null
    updatedAt: Date | null
    activityLevel: string | null
    height: number | null
    diet_preference: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    name: number
    age: number
    weight: number
    goals: number
    createdAt: number
    updatedAt: number
    activityLevel: number
    height: number
    diet_preference: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    age?: true
    weight?: true
    height?: true
  }

  export type UserSumAggregateInputType = {
    age?: true
    weight?: true
    height?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    age?: true
    weight?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    activityLevel?: true
    height?: true
    diet_preference?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    age?: true
    weight?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    activityLevel?: true
    height?: true
    diet_preference?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    name?: true
    age?: true
    weight?: true
    goals?: true
    createdAt?: true
    updatedAt?: true
    activityLevel?: true
    height?: true
    diet_preference?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string
    email: string
    name: string | null
    age: number | null
    weight: number | null
    goals: string | null
    createdAt: Date
    updatedAt: Date
    activityLevel: string | null
    height: number | null
    diet_preference: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    age?: boolean
    weight?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityLevel?: boolean
    height?: boolean
    diet_preference?: boolean
    mealPlans?: boolean | User$mealPlansArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    userRecipes?: boolean | User$userRecipesArgs<ExtArgs>
    recipes?: boolean | User$recipesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    age?: boolean
    weight?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityLevel?: boolean
    height?: boolean
    diet_preference?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    age?: boolean
    weight?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityLevel?: boolean
    height?: boolean
    diet_preference?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    name?: boolean
    age?: boolean
    weight?: boolean
    goals?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activityLevel?: boolean
    height?: boolean
    diet_preference?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "email" | "name" | "age" | "weight" | "goals" | "createdAt" | "updatedAt" | "activityLevel" | "height" | "diet_preference", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlans?: boolean | User$mealPlansArgs<ExtArgs>
    progress?: boolean | User$progressArgs<ExtArgs>
    userRecipes?: boolean | User$userRecipesArgs<ExtArgs>
    recipes?: boolean | User$recipesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      mealPlans: Prisma.$MealPlanPayload<ExtArgs>[]
      progress: Prisma.$ProgressPayload<ExtArgs>[]
      userRecipes: Prisma.$UserRecipePayload<ExtArgs>[]
      recipes: Prisma.$RecipePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string
      email: string
      name: string | null
      age: number | null
      weight: number | null
      goals: string | null
      createdAt: Date
      updatedAt: Date
      activityLevel: string | null
      height: number | null
      diet_preference: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mealPlans<T extends User$mealPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$mealPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progress<T extends User$progressArgs<ExtArgs> = {}>(args?: Subset<T, User$progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRecipes<T extends User$userRecipesArgs<ExtArgs> = {}>(args?: Subset<T, User$userRecipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recipes<T extends User$recipesArgs<ExtArgs> = {}>(args?: Subset<T, User$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly age: FieldRef<"User", 'Int'>
    readonly weight: FieldRef<"User", 'Float'>
    readonly goals: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly activityLevel: FieldRef<"User", 'String'>
    readonly height: FieldRef<"User", 'Float'>
    readonly diet_preference: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.mealPlans
   */
  export type User$mealPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    where?: MealPlanWhereInput
    orderBy?: MealPlanOrderByWithRelationInput | MealPlanOrderByWithRelationInput[]
    cursor?: MealPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealPlanScalarFieldEnum | MealPlanScalarFieldEnum[]
  }

  /**
   * User.progress
   */
  export type User$progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    where?: ProgressWhereInput
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    cursor?: ProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * User.userRecipes
   */
  export type User$userRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    where?: UserRecipeWhereInput
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    cursor?: UserRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRecipeScalarFieldEnum | UserRecipeScalarFieldEnum[]
  }

  /**
   * User.recipes
   */
  export type User$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    cursor?: RecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserRecipe
   */

  export type AggregateUserRecipe = {
    _count: UserRecipeCountAggregateOutputType | null
    _min: UserRecipeMinAggregateOutputType | null
    _max: UserRecipeMaxAggregateOutputType | null
  }

  export type UserRecipeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceId: string | null
    status: string | null
    dateAdded: Date | null
    cachedRecipeId: string | null
  }

  export type UserRecipeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sourceId: string | null
    status: string | null
    dateAdded: Date | null
    cachedRecipeId: string | null
  }

  export type UserRecipeCountAggregateOutputType = {
    id: number
    userId: number
    sourceId: number
    status: number
    dateAdded: number
    cachedRecipeId: number
    _all: number
  }


  export type UserRecipeMinAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    status?: true
    dateAdded?: true
    cachedRecipeId?: true
  }

  export type UserRecipeMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    status?: true
    dateAdded?: true
    cachedRecipeId?: true
  }

  export type UserRecipeCountAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    status?: true
    dateAdded?: true
    cachedRecipeId?: true
    _all?: true
  }

  export type UserRecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRecipe to aggregate.
     */
    where?: UserRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecipes to fetch.
     */
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRecipes
    **/
    _count?: true | UserRecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRecipeMaxAggregateInputType
  }

  export type GetUserRecipeAggregateType<T extends UserRecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRecipe[P]>
      : GetScalarType<T[P], AggregateUserRecipe[P]>
  }




  export type UserRecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRecipeWhereInput
    orderBy?: UserRecipeOrderByWithAggregationInput | UserRecipeOrderByWithAggregationInput[]
    by: UserRecipeScalarFieldEnum[] | UserRecipeScalarFieldEnum
    having?: UserRecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRecipeCountAggregateInputType | true
    _min?: UserRecipeMinAggregateInputType
    _max?: UserRecipeMaxAggregateInputType
  }

  export type UserRecipeGroupByOutputType = {
    id: string
    userId: string
    sourceId: string | null
    status: string
    dateAdded: Date
    cachedRecipeId: string | null
    _count: UserRecipeCountAggregateOutputType | null
    _min: UserRecipeMinAggregateOutputType | null
    _max: UserRecipeMaxAggregateOutputType | null
  }

  type GetUserRecipeGroupByPayload<T extends UserRecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRecipeGroupByOutputType[P]>
            : GetScalarType<T[P], UserRecipeGroupByOutputType[P]>
        }
      >
    >


  export type UserRecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    status?: boolean
    dateAdded?: boolean
    cachedRecipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["userRecipe"]>

  export type UserRecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    status?: boolean
    dateAdded?: boolean
    cachedRecipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["userRecipe"]>

  export type UserRecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    status?: boolean
    dateAdded?: boolean
    cachedRecipeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["userRecipe"]>

  export type UserRecipeSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    status?: boolean
    dateAdded?: boolean
    cachedRecipeId?: boolean
  }

  export type UserRecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sourceId" | "status" | "dateAdded" | "cachedRecipeId", ExtArgs["result"]["userRecipe"]>
  export type UserRecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }
  export type UserRecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }
  export type UserRecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | UserRecipe$cachedRecipeArgs<ExtArgs>
  }

  export type $UserRecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRecipe"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      cachedRecipe: Prisma.$RecipePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sourceId: string | null
      status: string
      dateAdded: Date
      cachedRecipeId: string | null
    }, ExtArgs["result"]["userRecipe"]>
    composites: {}
  }

  type UserRecipeGetPayload<S extends boolean | null | undefined | UserRecipeDefaultArgs> = $Result.GetResult<Prisma.$UserRecipePayload, S>

  type UserRecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRecipeCountAggregateInputType | true
    }

  export interface UserRecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRecipe'], meta: { name: 'UserRecipe' } }
    /**
     * Find zero or one UserRecipe that matches the filter.
     * @param {UserRecipeFindUniqueArgs} args - Arguments to find a UserRecipe
     * @example
     * // Get one UserRecipe
     * const userRecipe = await prisma.userRecipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRecipeFindUniqueArgs>(args: SelectSubset<T, UserRecipeFindUniqueArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRecipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRecipeFindUniqueOrThrowArgs} args - Arguments to find a UserRecipe
     * @example
     * // Get one UserRecipe
     * const userRecipe = await prisma.userRecipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRecipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeFindFirstArgs} args - Arguments to find a UserRecipe
     * @example
     * // Get one UserRecipe
     * const userRecipe = await prisma.userRecipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRecipeFindFirstArgs>(args?: SelectSubset<T, UserRecipeFindFirstArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRecipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeFindFirstOrThrowArgs} args - Arguments to find a UserRecipe
     * @example
     * // Get one UserRecipe
     * const userRecipe = await prisma.userRecipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRecipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRecipes
     * const userRecipes = await prisma.userRecipe.findMany()
     * 
     * // Get first 10 UserRecipes
     * const userRecipes = await prisma.userRecipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRecipeWithIdOnly = await prisma.userRecipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRecipeFindManyArgs>(args?: SelectSubset<T, UserRecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRecipe.
     * @param {UserRecipeCreateArgs} args - Arguments to create a UserRecipe.
     * @example
     * // Create one UserRecipe
     * const UserRecipe = await prisma.userRecipe.create({
     *   data: {
     *     // ... data to create a UserRecipe
     *   }
     * })
     * 
     */
    create<T extends UserRecipeCreateArgs>(args: SelectSubset<T, UserRecipeCreateArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRecipes.
     * @param {UserRecipeCreateManyArgs} args - Arguments to create many UserRecipes.
     * @example
     * // Create many UserRecipes
     * const userRecipe = await prisma.userRecipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRecipeCreateManyArgs>(args?: SelectSubset<T, UserRecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRecipes and returns the data saved in the database.
     * @param {UserRecipeCreateManyAndReturnArgs} args - Arguments to create many UserRecipes.
     * @example
     * // Create many UserRecipes
     * const userRecipe = await prisma.userRecipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRecipes and only return the `id`
     * const userRecipeWithIdOnly = await prisma.userRecipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRecipe.
     * @param {UserRecipeDeleteArgs} args - Arguments to delete one UserRecipe.
     * @example
     * // Delete one UserRecipe
     * const UserRecipe = await prisma.userRecipe.delete({
     *   where: {
     *     // ... filter to delete one UserRecipe
     *   }
     * })
     * 
     */
    delete<T extends UserRecipeDeleteArgs>(args: SelectSubset<T, UserRecipeDeleteArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRecipe.
     * @param {UserRecipeUpdateArgs} args - Arguments to update one UserRecipe.
     * @example
     * // Update one UserRecipe
     * const userRecipe = await prisma.userRecipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRecipeUpdateArgs>(args: SelectSubset<T, UserRecipeUpdateArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRecipes.
     * @param {UserRecipeDeleteManyArgs} args - Arguments to filter UserRecipes to delete.
     * @example
     * // Delete a few UserRecipes
     * const { count } = await prisma.userRecipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRecipeDeleteManyArgs>(args?: SelectSubset<T, UserRecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRecipes
     * const userRecipe = await prisma.userRecipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRecipeUpdateManyArgs>(args: SelectSubset<T, UserRecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRecipes and returns the data updated in the database.
     * @param {UserRecipeUpdateManyAndReturnArgs} args - Arguments to update many UserRecipes.
     * @example
     * // Update many UserRecipes
     * const userRecipe = await prisma.userRecipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRecipes and only return the `id`
     * const userRecipeWithIdOnly = await prisma.userRecipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRecipe.
     * @param {UserRecipeUpsertArgs} args - Arguments to update or create a UserRecipe.
     * @example
     * // Update or create a UserRecipe
     * const userRecipe = await prisma.userRecipe.upsert({
     *   create: {
     *     // ... data to create a UserRecipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRecipe we want to update
     *   }
     * })
     */
    upsert<T extends UserRecipeUpsertArgs>(args: SelectSubset<T, UserRecipeUpsertArgs<ExtArgs>>): Prisma__UserRecipeClient<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeCountArgs} args - Arguments to filter UserRecipes to count.
     * @example
     * // Count the number of UserRecipes
     * const count = await prisma.userRecipe.count({
     *   where: {
     *     // ... the filter for the UserRecipes we want to count
     *   }
     * })
    **/
    count<T extends UserRecipeCountArgs>(
      args?: Subset<T, UserRecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRecipeAggregateArgs>(args: Subset<T, UserRecipeAggregateArgs>): Prisma.PrismaPromise<GetUserRecipeAggregateType<T>>

    /**
     * Group by UserRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRecipeGroupByArgs['orderBy'] }
        : { orderBy?: UserRecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRecipe model
   */
  readonly fields: UserRecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRecipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cachedRecipe<T extends UserRecipe$cachedRecipeArgs<ExtArgs> = {}>(args?: Subset<T, UserRecipe$cachedRecipeArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRecipe model
   */
  interface UserRecipeFieldRefs {
    readonly id: FieldRef<"UserRecipe", 'String'>
    readonly userId: FieldRef<"UserRecipe", 'String'>
    readonly sourceId: FieldRef<"UserRecipe", 'String'>
    readonly status: FieldRef<"UserRecipe", 'String'>
    readonly dateAdded: FieldRef<"UserRecipe", 'DateTime'>
    readonly cachedRecipeId: FieldRef<"UserRecipe", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserRecipe findUnique
   */
  export type UserRecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter, which UserRecipe to fetch.
     */
    where: UserRecipeWhereUniqueInput
  }

  /**
   * UserRecipe findUniqueOrThrow
   */
  export type UserRecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter, which UserRecipe to fetch.
     */
    where: UserRecipeWhereUniqueInput
  }

  /**
   * UserRecipe findFirst
   */
  export type UserRecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter, which UserRecipe to fetch.
     */
    where?: UserRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecipes to fetch.
     */
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRecipes.
     */
    cursor?: UserRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRecipes.
     */
    distinct?: UserRecipeScalarFieldEnum | UserRecipeScalarFieldEnum[]
  }

  /**
   * UserRecipe findFirstOrThrow
   */
  export type UserRecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter, which UserRecipe to fetch.
     */
    where?: UserRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecipes to fetch.
     */
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRecipes.
     */
    cursor?: UserRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRecipes.
     */
    distinct?: UserRecipeScalarFieldEnum | UserRecipeScalarFieldEnum[]
  }

  /**
   * UserRecipe findMany
   */
  export type UserRecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter, which UserRecipes to fetch.
     */
    where?: UserRecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRecipes to fetch.
     */
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRecipes.
     */
    cursor?: UserRecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRecipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRecipes.
     */
    skip?: number
    distinct?: UserRecipeScalarFieldEnum | UserRecipeScalarFieldEnum[]
  }

  /**
   * UserRecipe create
   */
  export type UserRecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRecipe.
     */
    data: XOR<UserRecipeCreateInput, UserRecipeUncheckedCreateInput>
  }

  /**
   * UserRecipe createMany
   */
  export type UserRecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRecipes.
     */
    data: UserRecipeCreateManyInput | UserRecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRecipe createManyAndReturn
   */
  export type UserRecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * The data used to create many UserRecipes.
     */
    data: UserRecipeCreateManyInput | UserRecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRecipe update
   */
  export type UserRecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRecipe.
     */
    data: XOR<UserRecipeUpdateInput, UserRecipeUncheckedUpdateInput>
    /**
     * Choose, which UserRecipe to update.
     */
    where: UserRecipeWhereUniqueInput
  }

  /**
   * UserRecipe updateMany
   */
  export type UserRecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRecipes.
     */
    data: XOR<UserRecipeUpdateManyMutationInput, UserRecipeUncheckedUpdateManyInput>
    /**
     * Filter which UserRecipes to update
     */
    where?: UserRecipeWhereInput
    /**
     * Limit how many UserRecipes to update.
     */
    limit?: number
  }

  /**
   * UserRecipe updateManyAndReturn
   */
  export type UserRecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * The data used to update UserRecipes.
     */
    data: XOR<UserRecipeUpdateManyMutationInput, UserRecipeUncheckedUpdateManyInput>
    /**
     * Filter which UserRecipes to update
     */
    where?: UserRecipeWhereInput
    /**
     * Limit how many UserRecipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRecipe upsert
   */
  export type UserRecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRecipe to update in case it exists.
     */
    where: UserRecipeWhereUniqueInput
    /**
     * In case the UserRecipe found by the `where` argument doesn't exist, create a new UserRecipe with this data.
     */
    create: XOR<UserRecipeCreateInput, UserRecipeUncheckedCreateInput>
    /**
     * In case the UserRecipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRecipeUpdateInput, UserRecipeUncheckedUpdateInput>
  }

  /**
   * UserRecipe delete
   */
  export type UserRecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    /**
     * Filter which UserRecipe to delete.
     */
    where: UserRecipeWhereUniqueInput
  }

  /**
   * UserRecipe deleteMany
   */
  export type UserRecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRecipes to delete
     */
    where?: UserRecipeWhereInput
    /**
     * Limit how many UserRecipes to delete.
     */
    limit?: number
  }

  /**
   * UserRecipe.cachedRecipe
   */
  export type UserRecipe$cachedRecipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
  }

  /**
   * UserRecipe without action
   */
  export type UserRecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
  }


  /**
   * Model MealPlan
   */

  export type AggregateMealPlan = {
    _count: MealPlanCountAggregateOutputType | null
    _min: MealPlanMinAggregateOutputType | null
    _max: MealPlanMaxAggregateOutputType | null
  }

  export type MealPlanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
  }

  export type MealPlanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
  }

  export type MealPlanCountAggregateOutputType = {
    id: number
    userId: number
    startDate: number
    endDate: number
    constraints: number
    createdAt: number
    _all: number
  }


  export type MealPlanMinAggregateInputType = {
    id?: true
    userId?: true
    startDate?: true
    endDate?: true
    createdAt?: true
  }

  export type MealPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    startDate?: true
    endDate?: true
    createdAt?: true
  }

  export type MealPlanCountAggregateInputType = {
    id?: true
    userId?: true
    startDate?: true
    endDate?: true
    constraints?: true
    createdAt?: true
    _all?: true
  }

  export type MealPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlan to aggregate.
     */
    where?: MealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlans to fetch.
     */
    orderBy?: MealPlanOrderByWithRelationInput | MealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealPlans
    **/
    _count?: true | MealPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealPlanMaxAggregateInputType
  }

  export type GetMealPlanAggregateType<T extends MealPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateMealPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealPlan[P]>
      : GetScalarType<T[P], AggregateMealPlan[P]>
  }




  export type MealPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanWhereInput
    orderBy?: MealPlanOrderByWithAggregationInput | MealPlanOrderByWithAggregationInput[]
    by: MealPlanScalarFieldEnum[] | MealPlanScalarFieldEnum
    having?: MealPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealPlanCountAggregateInputType | true
    _min?: MealPlanMinAggregateInputType
    _max?: MealPlanMaxAggregateInputType
  }

  export type MealPlanGroupByOutputType = {
    id: string
    userId: string
    startDate: Date
    endDate: Date
    constraints: JsonValue | null
    createdAt: Date
    _count: MealPlanCountAggregateOutputType | null
    _min: MealPlanMinAggregateOutputType | null
    _max: MealPlanMaxAggregateOutputType | null
  }

  type GetMealPlanGroupByPayload<T extends MealPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealPlanGroupByOutputType[P]>
            : GetScalarType<T[P], MealPlanGroupByOutputType[P]>
        }
      >
    >


  export type MealPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    constraints?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealPlanItems?: boolean | MealPlan$mealPlanItemsArgs<ExtArgs>
    _count?: boolean | MealPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlan"]>

  export type MealPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    constraints?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlan"]>

  export type MealPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    constraints?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlan"]>

  export type MealPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    constraints?: boolean
    createdAt?: boolean
  }

  export type MealPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "startDate" | "endDate" | "constraints" | "createdAt", ExtArgs["result"]["mealPlan"]>
  export type MealPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealPlanItems?: boolean | MealPlan$mealPlanItemsArgs<ExtArgs>
    _count?: boolean | MealPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MealPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MealPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MealPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mealPlanItems: Prisma.$MealPlanItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      startDate: Date
      endDate: Date
      constraints: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["mealPlan"]>
    composites: {}
  }

  type MealPlanGetPayload<S extends boolean | null | undefined | MealPlanDefaultArgs> = $Result.GetResult<Prisma.$MealPlanPayload, S>

  type MealPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealPlanCountAggregateInputType | true
    }

  export interface MealPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealPlan'], meta: { name: 'MealPlan' } }
    /**
     * Find zero or one MealPlan that matches the filter.
     * @param {MealPlanFindUniqueArgs} args - Arguments to find a MealPlan
     * @example
     * // Get one MealPlan
     * const mealPlan = await prisma.mealPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealPlanFindUniqueArgs>(args: SelectSubset<T, MealPlanFindUniqueArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealPlanFindUniqueOrThrowArgs} args - Arguments to find a MealPlan
     * @example
     * // Get one MealPlan
     * const mealPlan = await prisma.mealPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, MealPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanFindFirstArgs} args - Arguments to find a MealPlan
     * @example
     * // Get one MealPlan
     * const mealPlan = await prisma.mealPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealPlanFindFirstArgs>(args?: SelectSubset<T, MealPlanFindFirstArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanFindFirstOrThrowArgs} args - Arguments to find a MealPlan
     * @example
     * // Get one MealPlan
     * const mealPlan = await prisma.mealPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, MealPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealPlans
     * const mealPlans = await prisma.mealPlan.findMany()
     * 
     * // Get first 10 MealPlans
     * const mealPlans = await prisma.mealPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealPlanWithIdOnly = await prisma.mealPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealPlanFindManyArgs>(args?: SelectSubset<T, MealPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealPlan.
     * @param {MealPlanCreateArgs} args - Arguments to create a MealPlan.
     * @example
     * // Create one MealPlan
     * const MealPlan = await prisma.mealPlan.create({
     *   data: {
     *     // ... data to create a MealPlan
     *   }
     * })
     * 
     */
    create<T extends MealPlanCreateArgs>(args: SelectSubset<T, MealPlanCreateArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealPlans.
     * @param {MealPlanCreateManyArgs} args - Arguments to create many MealPlans.
     * @example
     * // Create many MealPlans
     * const mealPlan = await prisma.mealPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealPlanCreateManyArgs>(args?: SelectSubset<T, MealPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealPlans and returns the data saved in the database.
     * @param {MealPlanCreateManyAndReturnArgs} args - Arguments to create many MealPlans.
     * @example
     * // Create many MealPlans
     * const mealPlan = await prisma.mealPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealPlans and only return the `id`
     * const mealPlanWithIdOnly = await prisma.mealPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, MealPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealPlan.
     * @param {MealPlanDeleteArgs} args - Arguments to delete one MealPlan.
     * @example
     * // Delete one MealPlan
     * const MealPlan = await prisma.mealPlan.delete({
     *   where: {
     *     // ... filter to delete one MealPlan
     *   }
     * })
     * 
     */
    delete<T extends MealPlanDeleteArgs>(args: SelectSubset<T, MealPlanDeleteArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealPlan.
     * @param {MealPlanUpdateArgs} args - Arguments to update one MealPlan.
     * @example
     * // Update one MealPlan
     * const mealPlan = await prisma.mealPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealPlanUpdateArgs>(args: SelectSubset<T, MealPlanUpdateArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealPlans.
     * @param {MealPlanDeleteManyArgs} args - Arguments to filter MealPlans to delete.
     * @example
     * // Delete a few MealPlans
     * const { count } = await prisma.mealPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealPlanDeleteManyArgs>(args?: SelectSubset<T, MealPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealPlans
     * const mealPlan = await prisma.mealPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealPlanUpdateManyArgs>(args: SelectSubset<T, MealPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlans and returns the data updated in the database.
     * @param {MealPlanUpdateManyAndReturnArgs} args - Arguments to update many MealPlans.
     * @example
     * // Update many MealPlans
     * const mealPlan = await prisma.mealPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealPlans and only return the `id`
     * const mealPlanWithIdOnly = await prisma.mealPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, MealPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealPlan.
     * @param {MealPlanUpsertArgs} args - Arguments to update or create a MealPlan.
     * @example
     * // Update or create a MealPlan
     * const mealPlan = await prisma.mealPlan.upsert({
     *   create: {
     *     // ... data to create a MealPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealPlan we want to update
     *   }
     * })
     */
    upsert<T extends MealPlanUpsertArgs>(args: SelectSubset<T, MealPlanUpsertArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanCountArgs} args - Arguments to filter MealPlans to count.
     * @example
     * // Count the number of MealPlans
     * const count = await prisma.mealPlan.count({
     *   where: {
     *     // ... the filter for the MealPlans we want to count
     *   }
     * })
    **/
    count<T extends MealPlanCountArgs>(
      args?: Subset<T, MealPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealPlanAggregateArgs>(args: Subset<T, MealPlanAggregateArgs>): Prisma.PrismaPromise<GetMealPlanAggregateType<T>>

    /**
     * Group by MealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealPlanGroupByArgs['orderBy'] }
        : { orderBy?: MealPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealPlan model
   */
  readonly fields: MealPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mealPlanItems<T extends MealPlan$mealPlanItemsArgs<ExtArgs> = {}>(args?: Subset<T, MealPlan$mealPlanItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MealPlan model
   */
  interface MealPlanFieldRefs {
    readonly id: FieldRef<"MealPlan", 'String'>
    readonly userId: FieldRef<"MealPlan", 'String'>
    readonly startDate: FieldRef<"MealPlan", 'DateTime'>
    readonly endDate: FieldRef<"MealPlan", 'DateTime'>
    readonly constraints: FieldRef<"MealPlan", 'Json'>
    readonly createdAt: FieldRef<"MealPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MealPlan findUnique
   */
  export type MealPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter, which MealPlan to fetch.
     */
    where: MealPlanWhereUniqueInput
  }

  /**
   * MealPlan findUniqueOrThrow
   */
  export type MealPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter, which MealPlan to fetch.
     */
    where: MealPlanWhereUniqueInput
  }

  /**
   * MealPlan findFirst
   */
  export type MealPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter, which MealPlan to fetch.
     */
    where?: MealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlans to fetch.
     */
    orderBy?: MealPlanOrderByWithRelationInput | MealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlans.
     */
    cursor?: MealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlans.
     */
    distinct?: MealPlanScalarFieldEnum | MealPlanScalarFieldEnum[]
  }

  /**
   * MealPlan findFirstOrThrow
   */
  export type MealPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter, which MealPlan to fetch.
     */
    where?: MealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlans to fetch.
     */
    orderBy?: MealPlanOrderByWithRelationInput | MealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlans.
     */
    cursor?: MealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlans.
     */
    distinct?: MealPlanScalarFieldEnum | MealPlanScalarFieldEnum[]
  }

  /**
   * MealPlan findMany
   */
  export type MealPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter, which MealPlans to fetch.
     */
    where?: MealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlans to fetch.
     */
    orderBy?: MealPlanOrderByWithRelationInput | MealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealPlans.
     */
    cursor?: MealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlans.
     */
    skip?: number
    distinct?: MealPlanScalarFieldEnum | MealPlanScalarFieldEnum[]
  }

  /**
   * MealPlan create
   */
  export type MealPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a MealPlan.
     */
    data: XOR<MealPlanCreateInput, MealPlanUncheckedCreateInput>
  }

  /**
   * MealPlan createMany
   */
  export type MealPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealPlans.
     */
    data: MealPlanCreateManyInput | MealPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealPlan createManyAndReturn
   */
  export type MealPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * The data used to create many MealPlans.
     */
    data: MealPlanCreateManyInput | MealPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlan update
   */
  export type MealPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a MealPlan.
     */
    data: XOR<MealPlanUpdateInput, MealPlanUncheckedUpdateInput>
    /**
     * Choose, which MealPlan to update.
     */
    where: MealPlanWhereUniqueInput
  }

  /**
   * MealPlan updateMany
   */
  export type MealPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealPlans.
     */
    data: XOR<MealPlanUpdateManyMutationInput, MealPlanUncheckedUpdateManyInput>
    /**
     * Filter which MealPlans to update
     */
    where?: MealPlanWhereInput
    /**
     * Limit how many MealPlans to update.
     */
    limit?: number
  }

  /**
   * MealPlan updateManyAndReturn
   */
  export type MealPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * The data used to update MealPlans.
     */
    data: XOR<MealPlanUpdateManyMutationInput, MealPlanUncheckedUpdateManyInput>
    /**
     * Filter which MealPlans to update
     */
    where?: MealPlanWhereInput
    /**
     * Limit how many MealPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlan upsert
   */
  export type MealPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the MealPlan to update in case it exists.
     */
    where: MealPlanWhereUniqueInput
    /**
     * In case the MealPlan found by the `where` argument doesn't exist, create a new MealPlan with this data.
     */
    create: XOR<MealPlanCreateInput, MealPlanUncheckedCreateInput>
    /**
     * In case the MealPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealPlanUpdateInput, MealPlanUncheckedUpdateInput>
  }

  /**
   * MealPlan delete
   */
  export type MealPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
    /**
     * Filter which MealPlan to delete.
     */
    where: MealPlanWhereUniqueInput
  }

  /**
   * MealPlan deleteMany
   */
  export type MealPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlans to delete
     */
    where?: MealPlanWhereInput
    /**
     * Limit how many MealPlans to delete.
     */
    limit?: number
  }

  /**
   * MealPlan.mealPlanItems
   */
  export type MealPlan$mealPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    where?: MealPlanItemWhereInput
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    cursor?: MealPlanItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealPlanItemScalarFieldEnum | MealPlanItemScalarFieldEnum[]
  }

  /**
   * MealPlan without action
   */
  export type MealPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlan
     */
    select?: MealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlan
     */
    omit?: MealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanInclude<ExtArgs> | null
  }


  /**
   * Model MealPlanItem
   */

  export type AggregateMealPlanItem = {
    _count: MealPlanItemCountAggregateOutputType | null
    _avg: MealPlanItemAvgAggregateOutputType | null
    _sum: MealPlanItemSumAggregateOutputType | null
    _min: MealPlanItemMinAggregateOutputType | null
    _max: MealPlanItemMaxAggregateOutputType | null
  }

  export type MealPlanItemAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type MealPlanItemSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type MealPlanItemMinAggregateOutputType = {
    id: string | null
    mealPlanId: string | null
    sourceId: string | null
    dayOfWeek: number | null
    mealType: string | null
    cachedRecipeId: string | null
  }

  export type MealPlanItemMaxAggregateOutputType = {
    id: string | null
    mealPlanId: string | null
    sourceId: string | null
    dayOfWeek: number | null
    mealType: string | null
    cachedRecipeId: string | null
  }

  export type MealPlanItemCountAggregateOutputType = {
    id: number
    mealPlanId: number
    sourceId: number
    dayOfWeek: number
    mealType: number
    cachedRecipeId: number
    _all: number
  }


  export type MealPlanItemAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type MealPlanItemSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type MealPlanItemMinAggregateInputType = {
    id?: true
    mealPlanId?: true
    sourceId?: true
    dayOfWeek?: true
    mealType?: true
    cachedRecipeId?: true
  }

  export type MealPlanItemMaxAggregateInputType = {
    id?: true
    mealPlanId?: true
    sourceId?: true
    dayOfWeek?: true
    mealType?: true
    cachedRecipeId?: true
  }

  export type MealPlanItemCountAggregateInputType = {
    id?: true
    mealPlanId?: true
    sourceId?: true
    dayOfWeek?: true
    mealType?: true
    cachedRecipeId?: true
    _all?: true
  }

  export type MealPlanItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlanItem to aggregate.
     */
    where?: MealPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanItems to fetch.
     */
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealPlanItems
    **/
    _count?: true | MealPlanItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealPlanItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealPlanItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealPlanItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealPlanItemMaxAggregateInputType
  }

  export type GetMealPlanItemAggregateType<T extends MealPlanItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMealPlanItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealPlanItem[P]>
      : GetScalarType<T[P], AggregateMealPlanItem[P]>
  }




  export type MealPlanItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanItemWhereInput
    orderBy?: MealPlanItemOrderByWithAggregationInput | MealPlanItemOrderByWithAggregationInput[]
    by: MealPlanItemScalarFieldEnum[] | MealPlanItemScalarFieldEnum
    having?: MealPlanItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealPlanItemCountAggregateInputType | true
    _avg?: MealPlanItemAvgAggregateInputType
    _sum?: MealPlanItemSumAggregateInputType
    _min?: MealPlanItemMinAggregateInputType
    _max?: MealPlanItemMaxAggregateInputType
  }

  export type MealPlanItemGroupByOutputType = {
    id: string
    mealPlanId: string
    sourceId: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipeId: string | null
    _count: MealPlanItemCountAggregateOutputType | null
    _avg: MealPlanItemAvgAggregateOutputType | null
    _sum: MealPlanItemSumAggregateOutputType | null
    _min: MealPlanItemMinAggregateOutputType | null
    _max: MealPlanItemMaxAggregateOutputType | null
  }

  type GetMealPlanItemGroupByPayload<T extends MealPlanItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealPlanItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealPlanItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealPlanItemGroupByOutputType[P]>
            : GetScalarType<T[P], MealPlanItemGroupByOutputType[P]>
        }
      >
    >


  export type MealPlanItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealPlanId?: boolean
    sourceId?: boolean
    dayOfWeek?: boolean
    mealType?: boolean
    cachedRecipeId?: boolean
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanItem"]>

  export type MealPlanItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealPlanId?: boolean
    sourceId?: boolean
    dayOfWeek?: boolean
    mealType?: boolean
    cachedRecipeId?: boolean
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanItem"]>

  export type MealPlanItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mealPlanId?: boolean
    sourceId?: boolean
    dayOfWeek?: boolean
    mealType?: boolean
    cachedRecipeId?: boolean
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanItem"]>

  export type MealPlanItemSelectScalar = {
    id?: boolean
    mealPlanId?: boolean
    sourceId?: boolean
    dayOfWeek?: boolean
    mealType?: boolean
    cachedRecipeId?: boolean
  }

  export type MealPlanItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mealPlanId" | "sourceId" | "dayOfWeek" | "mealType" | "cachedRecipeId", ExtArgs["result"]["mealPlanItem"]>
  export type MealPlanItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }
  export type MealPlanItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }
  export type MealPlanItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | MealPlanDefaultArgs<ExtArgs>
    cachedRecipe?: boolean | MealPlanItem$cachedRecipeArgs<ExtArgs>
  }

  export type $MealPlanItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealPlanItem"
    objects: {
      mealPlan: Prisma.$MealPlanPayload<ExtArgs>
      cachedRecipe: Prisma.$RecipePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mealPlanId: string
      sourceId: string | null
      dayOfWeek: number
      mealType: string
      cachedRecipeId: string | null
    }, ExtArgs["result"]["mealPlanItem"]>
    composites: {}
  }

  type MealPlanItemGetPayload<S extends boolean | null | undefined | MealPlanItemDefaultArgs> = $Result.GetResult<Prisma.$MealPlanItemPayload, S>

  type MealPlanItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealPlanItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealPlanItemCountAggregateInputType | true
    }

  export interface MealPlanItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealPlanItem'], meta: { name: 'MealPlanItem' } }
    /**
     * Find zero or one MealPlanItem that matches the filter.
     * @param {MealPlanItemFindUniqueArgs} args - Arguments to find a MealPlanItem
     * @example
     * // Get one MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealPlanItemFindUniqueArgs>(args: SelectSubset<T, MealPlanItemFindUniqueArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealPlanItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealPlanItemFindUniqueOrThrowArgs} args - Arguments to find a MealPlanItem
     * @example
     * // Get one MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealPlanItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MealPlanItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlanItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemFindFirstArgs} args - Arguments to find a MealPlanItem
     * @example
     * // Get one MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealPlanItemFindFirstArgs>(args?: SelectSubset<T, MealPlanItemFindFirstArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlanItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemFindFirstOrThrowArgs} args - Arguments to find a MealPlanItem
     * @example
     * // Get one MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealPlanItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MealPlanItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealPlanItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealPlanItems
     * const mealPlanItems = await prisma.mealPlanItem.findMany()
     * 
     * // Get first 10 MealPlanItems
     * const mealPlanItems = await prisma.mealPlanItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealPlanItemWithIdOnly = await prisma.mealPlanItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealPlanItemFindManyArgs>(args?: SelectSubset<T, MealPlanItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealPlanItem.
     * @param {MealPlanItemCreateArgs} args - Arguments to create a MealPlanItem.
     * @example
     * // Create one MealPlanItem
     * const MealPlanItem = await prisma.mealPlanItem.create({
     *   data: {
     *     // ... data to create a MealPlanItem
     *   }
     * })
     * 
     */
    create<T extends MealPlanItemCreateArgs>(args: SelectSubset<T, MealPlanItemCreateArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealPlanItems.
     * @param {MealPlanItemCreateManyArgs} args - Arguments to create many MealPlanItems.
     * @example
     * // Create many MealPlanItems
     * const mealPlanItem = await prisma.mealPlanItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealPlanItemCreateManyArgs>(args?: SelectSubset<T, MealPlanItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealPlanItems and returns the data saved in the database.
     * @param {MealPlanItemCreateManyAndReturnArgs} args - Arguments to create many MealPlanItems.
     * @example
     * // Create many MealPlanItems
     * const mealPlanItem = await prisma.mealPlanItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealPlanItems and only return the `id`
     * const mealPlanItemWithIdOnly = await prisma.mealPlanItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealPlanItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MealPlanItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealPlanItem.
     * @param {MealPlanItemDeleteArgs} args - Arguments to delete one MealPlanItem.
     * @example
     * // Delete one MealPlanItem
     * const MealPlanItem = await prisma.mealPlanItem.delete({
     *   where: {
     *     // ... filter to delete one MealPlanItem
     *   }
     * })
     * 
     */
    delete<T extends MealPlanItemDeleteArgs>(args: SelectSubset<T, MealPlanItemDeleteArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealPlanItem.
     * @param {MealPlanItemUpdateArgs} args - Arguments to update one MealPlanItem.
     * @example
     * // Update one MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealPlanItemUpdateArgs>(args: SelectSubset<T, MealPlanItemUpdateArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealPlanItems.
     * @param {MealPlanItemDeleteManyArgs} args - Arguments to filter MealPlanItems to delete.
     * @example
     * // Delete a few MealPlanItems
     * const { count } = await prisma.mealPlanItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealPlanItemDeleteManyArgs>(args?: SelectSubset<T, MealPlanItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealPlanItems
     * const mealPlanItem = await prisma.mealPlanItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealPlanItemUpdateManyArgs>(args: SelectSubset<T, MealPlanItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlanItems and returns the data updated in the database.
     * @param {MealPlanItemUpdateManyAndReturnArgs} args - Arguments to update many MealPlanItems.
     * @example
     * // Update many MealPlanItems
     * const mealPlanItem = await prisma.mealPlanItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealPlanItems and only return the `id`
     * const mealPlanItemWithIdOnly = await prisma.mealPlanItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealPlanItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MealPlanItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealPlanItem.
     * @param {MealPlanItemUpsertArgs} args - Arguments to update or create a MealPlanItem.
     * @example
     * // Update or create a MealPlanItem
     * const mealPlanItem = await prisma.mealPlanItem.upsert({
     *   create: {
     *     // ... data to create a MealPlanItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealPlanItem we want to update
     *   }
     * })
     */
    upsert<T extends MealPlanItemUpsertArgs>(args: SelectSubset<T, MealPlanItemUpsertArgs<ExtArgs>>): Prisma__MealPlanItemClient<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemCountArgs} args - Arguments to filter MealPlanItems to count.
     * @example
     * // Count the number of MealPlanItems
     * const count = await prisma.mealPlanItem.count({
     *   where: {
     *     // ... the filter for the MealPlanItems we want to count
     *   }
     * })
    **/
    count<T extends MealPlanItemCountArgs>(
      args?: Subset<T, MealPlanItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealPlanItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealPlanItemAggregateArgs>(args: Subset<T, MealPlanItemAggregateArgs>): Prisma.PrismaPromise<GetMealPlanItemAggregateType<T>>

    /**
     * Group by MealPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealPlanItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealPlanItemGroupByArgs['orderBy'] }
        : { orderBy?: MealPlanItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealPlanItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealPlanItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealPlanItem model
   */
  readonly fields: MealPlanItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealPlanItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealPlanItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mealPlan<T extends MealPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MealPlanDefaultArgs<ExtArgs>>): Prisma__MealPlanClient<$Result.GetResult<Prisma.$MealPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cachedRecipe<T extends MealPlanItem$cachedRecipeArgs<ExtArgs> = {}>(args?: Subset<T, MealPlanItem$cachedRecipeArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MealPlanItem model
   */
  interface MealPlanItemFieldRefs {
    readonly id: FieldRef<"MealPlanItem", 'String'>
    readonly mealPlanId: FieldRef<"MealPlanItem", 'String'>
    readonly sourceId: FieldRef<"MealPlanItem", 'String'>
    readonly dayOfWeek: FieldRef<"MealPlanItem", 'Int'>
    readonly mealType: FieldRef<"MealPlanItem", 'String'>
    readonly cachedRecipeId: FieldRef<"MealPlanItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MealPlanItem findUnique
   */
  export type MealPlanItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanItem to fetch.
     */
    where: MealPlanItemWhereUniqueInput
  }

  /**
   * MealPlanItem findUniqueOrThrow
   */
  export type MealPlanItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanItem to fetch.
     */
    where: MealPlanItemWhereUniqueInput
  }

  /**
   * MealPlanItem findFirst
   */
  export type MealPlanItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanItem to fetch.
     */
    where?: MealPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanItems to fetch.
     */
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlanItems.
     */
    cursor?: MealPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlanItems.
     */
    distinct?: MealPlanItemScalarFieldEnum | MealPlanItemScalarFieldEnum[]
  }

  /**
   * MealPlanItem findFirstOrThrow
   */
  export type MealPlanItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanItem to fetch.
     */
    where?: MealPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanItems to fetch.
     */
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlanItems.
     */
    cursor?: MealPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlanItems.
     */
    distinct?: MealPlanItemScalarFieldEnum | MealPlanItemScalarFieldEnum[]
  }

  /**
   * MealPlanItem findMany
   */
  export type MealPlanItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanItems to fetch.
     */
    where?: MealPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanItems to fetch.
     */
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealPlanItems.
     */
    cursor?: MealPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanItems.
     */
    skip?: number
    distinct?: MealPlanItemScalarFieldEnum | MealPlanItemScalarFieldEnum[]
  }

  /**
   * MealPlanItem create
   */
  export type MealPlanItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MealPlanItem.
     */
    data: XOR<MealPlanItemCreateInput, MealPlanItemUncheckedCreateInput>
  }

  /**
   * MealPlanItem createMany
   */
  export type MealPlanItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealPlanItems.
     */
    data: MealPlanItemCreateManyInput | MealPlanItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealPlanItem createManyAndReturn
   */
  export type MealPlanItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * The data used to create many MealPlanItems.
     */
    data: MealPlanItemCreateManyInput | MealPlanItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlanItem update
   */
  export type MealPlanItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MealPlanItem.
     */
    data: XOR<MealPlanItemUpdateInput, MealPlanItemUncheckedUpdateInput>
    /**
     * Choose, which MealPlanItem to update.
     */
    where: MealPlanItemWhereUniqueInput
  }

  /**
   * MealPlanItem updateMany
   */
  export type MealPlanItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealPlanItems.
     */
    data: XOR<MealPlanItemUpdateManyMutationInput, MealPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which MealPlanItems to update
     */
    where?: MealPlanItemWhereInput
    /**
     * Limit how many MealPlanItems to update.
     */
    limit?: number
  }

  /**
   * MealPlanItem updateManyAndReturn
   */
  export type MealPlanItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * The data used to update MealPlanItems.
     */
    data: XOR<MealPlanItemUpdateManyMutationInput, MealPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which MealPlanItems to update
     */
    where?: MealPlanItemWhereInput
    /**
     * Limit how many MealPlanItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlanItem upsert
   */
  export type MealPlanItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MealPlanItem to update in case it exists.
     */
    where: MealPlanItemWhereUniqueInput
    /**
     * In case the MealPlanItem found by the `where` argument doesn't exist, create a new MealPlanItem with this data.
     */
    create: XOR<MealPlanItemCreateInput, MealPlanItemUncheckedCreateInput>
    /**
     * In case the MealPlanItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealPlanItemUpdateInput, MealPlanItemUncheckedUpdateInput>
  }

  /**
   * MealPlanItem delete
   */
  export type MealPlanItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    /**
     * Filter which MealPlanItem to delete.
     */
    where: MealPlanItemWhereUniqueInput
  }

  /**
   * MealPlanItem deleteMany
   */
  export type MealPlanItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlanItems to delete
     */
    where?: MealPlanItemWhereInput
    /**
     * Limit how many MealPlanItems to delete.
     */
    limit?: number
  }

  /**
   * MealPlanItem.cachedRecipe
   */
  export type MealPlanItem$cachedRecipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
  }

  /**
   * MealPlanItem without action
   */
  export type MealPlanItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
  }


  /**
   * Model Progress
   */

  export type AggregateProgress = {
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  export type ProgressAvgAggregateOutputType = {
    weight: number | null
    caloriesConsumed: number | null
  }

  export type ProgressSumAggregateOutputType = {
    weight: number | null
    caloriesConsumed: number | null
  }

  export type ProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    weight: number | null
    caloriesConsumed: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type ProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    weight: number | null
    caloriesConsumed: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type ProgressCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    weight: number
    caloriesConsumed: number
    notes: number
    createdAt: number
    _all: number
  }


  export type ProgressAvgAggregateInputType = {
    weight?: true
    caloriesConsumed?: true
  }

  export type ProgressSumAggregateInputType = {
    weight?: true
    caloriesConsumed?: true
  }

  export type ProgressMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    weight?: true
    caloriesConsumed?: true
    notes?: true
    createdAt?: true
  }

  export type ProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    weight?: true
    caloriesConsumed?: true
    notes?: true
    createdAt?: true
  }

  export type ProgressCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    weight?: true
    caloriesConsumed?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type ProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progress to aggregate.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Progresses
    **/
    _count?: true | ProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgressMaxAggregateInputType
  }

  export type GetProgressAggregateType<T extends ProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgress[P]>
      : GetScalarType<T[P], AggregateProgress[P]>
  }




  export type ProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressWhereInput
    orderBy?: ProgressOrderByWithAggregationInput | ProgressOrderByWithAggregationInput[]
    by: ProgressScalarFieldEnum[] | ProgressScalarFieldEnum
    having?: ProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgressCountAggregateInputType | true
    _avg?: ProgressAvgAggregateInputType
    _sum?: ProgressSumAggregateInputType
    _min?: ProgressMinAggregateInputType
    _max?: ProgressMaxAggregateInputType
  }

  export type ProgressGroupByOutputType = {
    id: string
    userId: string
    date: Date
    weight: number | null
    caloriesConsumed: number | null
    notes: string | null
    createdAt: Date
    _count: ProgressCountAggregateOutputType | null
    _avg: ProgressAvgAggregateOutputType | null
    _sum: ProgressSumAggregateOutputType | null
    _min: ProgressMinAggregateOutputType | null
    _max: ProgressMaxAggregateOutputType | null
  }

  type GetProgressGroupByPayload<T extends ProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ProgressGroupByOutputType[P]>
        }
      >
    >


  export type ProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    weight?: boolean
    caloriesConsumed?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    weight?: boolean
    caloriesConsumed?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    weight?: boolean
    caloriesConsumed?: boolean
    notes?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progress"]>

  export type ProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    weight?: boolean
    caloriesConsumed?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type ProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "weight" | "caloriesConsumed" | "notes" | "createdAt", ExtArgs["result"]["progress"]>
  export type ProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Progress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      weight: number | null
      caloriesConsumed: number | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["progress"]>
    composites: {}
  }

  type ProgressGetPayload<S extends boolean | null | undefined | ProgressDefaultArgs> = $Result.GetResult<Prisma.$ProgressPayload, S>

  type ProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgressCountAggregateInputType | true
    }

  export interface ProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Progress'], meta: { name: 'Progress' } }
    /**
     * Find zero or one Progress that matches the filter.
     * @param {ProgressFindUniqueArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgressFindUniqueArgs>(args: SelectSubset<T, ProgressFindUniqueArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Progress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgressFindUniqueOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgressFindFirstArgs>(args?: SelectSubset<T, ProgressFindFirstArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Progress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindFirstOrThrowArgs} args - Arguments to find a Progress
     * @example
     * // Get one Progress
     * const progress = await prisma.progress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Progresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Progresses
     * const progresses = await prisma.progress.findMany()
     * 
     * // Get first 10 Progresses
     * const progresses = await prisma.progress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progressWithIdOnly = await prisma.progress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgressFindManyArgs>(args?: SelectSubset<T, ProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Progress.
     * @param {ProgressCreateArgs} args - Arguments to create a Progress.
     * @example
     * // Create one Progress
     * const Progress = await prisma.progress.create({
     *   data: {
     *     // ... data to create a Progress
     *   }
     * })
     * 
     */
    create<T extends ProgressCreateArgs>(args: SelectSubset<T, ProgressCreateArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Progresses.
     * @param {ProgressCreateManyArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgressCreateManyArgs>(args?: SelectSubset<T, ProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Progresses and returns the data saved in the database.
     * @param {ProgressCreateManyAndReturnArgs} args - Arguments to create many Progresses.
     * @example
     * // Create many Progresses
     * const progress = await prisma.progress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Progress.
     * @param {ProgressDeleteArgs} args - Arguments to delete one Progress.
     * @example
     * // Delete one Progress
     * const Progress = await prisma.progress.delete({
     *   where: {
     *     // ... filter to delete one Progress
     *   }
     * })
     * 
     */
    delete<T extends ProgressDeleteArgs>(args: SelectSubset<T, ProgressDeleteArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Progress.
     * @param {ProgressUpdateArgs} args - Arguments to update one Progress.
     * @example
     * // Update one Progress
     * const progress = await prisma.progress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgressUpdateArgs>(args: SelectSubset<T, ProgressUpdateArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Progresses.
     * @param {ProgressDeleteManyArgs} args - Arguments to filter Progresses to delete.
     * @example
     * // Delete a few Progresses
     * const { count } = await prisma.progress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgressDeleteManyArgs>(args?: SelectSubset<T, ProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgressUpdateManyArgs>(args: SelectSubset<T, ProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Progresses and returns the data updated in the database.
     * @param {ProgressUpdateManyAndReturnArgs} args - Arguments to update many Progresses.
     * @example
     * // Update many Progresses
     * const progress = await prisma.progress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Progresses and only return the `id`
     * const progressWithIdOnly = await prisma.progress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Progress.
     * @param {ProgressUpsertArgs} args - Arguments to update or create a Progress.
     * @example
     * // Update or create a Progress
     * const progress = await prisma.progress.upsert({
     *   create: {
     *     // ... data to create a Progress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Progress we want to update
     *   }
     * })
     */
    upsert<T extends ProgressUpsertArgs>(args: SelectSubset<T, ProgressUpsertArgs<ExtArgs>>): Prisma__ProgressClient<$Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Progresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressCountArgs} args - Arguments to filter Progresses to count.
     * @example
     * // Count the number of Progresses
     * const count = await prisma.progress.count({
     *   where: {
     *     // ... the filter for the Progresses we want to count
     *   }
     * })
    **/
    count<T extends ProgressCountArgs>(
      args?: Subset<T, ProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgressAggregateArgs>(args: Subset<T, ProgressAggregateArgs>): Prisma.PrismaPromise<GetProgressAggregateType<T>>

    /**
     * Group by Progress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressGroupByArgs['orderBy'] }
        : { orderBy?: ProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Progress model
   */
  readonly fields: ProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Progress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Progress model
   */
  interface ProgressFieldRefs {
    readonly id: FieldRef<"Progress", 'String'>
    readonly userId: FieldRef<"Progress", 'String'>
    readonly date: FieldRef<"Progress", 'DateTime'>
    readonly weight: FieldRef<"Progress", 'Float'>
    readonly caloriesConsumed: FieldRef<"Progress", 'Int'>
    readonly notes: FieldRef<"Progress", 'String'>
    readonly createdAt: FieldRef<"Progress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Progress findUnique
   */
  export type ProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress findUniqueOrThrow
   */
  export type ProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress findFirst
   */
  export type ProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress findFirstOrThrow
   */
  export type ProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progress to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Progresses.
     */
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress findMany
   */
  export type ProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter, which Progresses to fetch.
     */
    where?: ProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Progresses to fetch.
     */
    orderBy?: ProgressOrderByWithRelationInput | ProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Progresses.
     */
    cursor?: ProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Progresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Progresses.
     */
    skip?: number
    distinct?: ProgressScalarFieldEnum | ProgressScalarFieldEnum[]
  }

  /**
   * Progress create
   */
  export type ProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a Progress.
     */
    data: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
  }

  /**
   * Progress createMany
   */
  export type ProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Progress createManyAndReturn
   */
  export type ProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * The data used to create many Progresses.
     */
    data: ProgressCreateManyInput | ProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progress update
   */
  export type ProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a Progress.
     */
    data: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
    /**
     * Choose, which Progress to update.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress updateMany
   */
  export type ProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to update.
     */
    limit?: number
  }

  /**
   * Progress updateManyAndReturn
   */
  export type ProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * The data used to update Progresses.
     */
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyInput>
    /**
     * Filter which Progresses to update
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Progress upsert
   */
  export type ProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the Progress to update in case it exists.
     */
    where: ProgressWhereUniqueInput
    /**
     * In case the Progress found by the `where` argument doesn't exist, create a new Progress with this data.
     */
    create: XOR<ProgressCreateInput, ProgressUncheckedCreateInput>
    /**
     * In case the Progress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressUpdateInput, ProgressUncheckedUpdateInput>
  }

  /**
   * Progress delete
   */
  export type ProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
    /**
     * Filter which Progress to delete.
     */
    where: ProgressWhereUniqueInput
  }

  /**
   * Progress deleteMany
   */
  export type ProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Progresses to delete
     */
    where?: ProgressWhereInput
    /**
     * Limit how many Progresses to delete.
     */
    limit?: number
  }

  /**
   * Progress without action
   */
  export type ProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: ProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Progress
     */
    omit?: ProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressInclude<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeAvgAggregateOutputType = {
    prepTime: number | null
    cookTime: number | null
    totalTime: number | null
    servings: number | null
    userRating: number | null
    savedCount: number | null
  }

  export type RecipeSumAggregateOutputType = {
    prepTime: number | null
    cookTime: number | null
    totalTime: number | null
    servings: number | null
    userRating: number | null
    savedCount: number | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    fallbackImageUrl: string | null
    sourceType: $Enums.RecipeSourceType | null
    sourceId: string | null
    sourceUrl: string | null
    cuisine: string | null
    mealType: string | null
    difficulty: $Enums.RecipeDifficulty | null
    prepTime: number | null
    cookTime: number | null
    totalTime: number | null
    servings: number | null
    userRating: number | null
    savedCount: number | null
    isPublic: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    fallbackImageUrl: string | null
    sourceType: $Enums.RecipeSourceType | null
    sourceId: string | null
    sourceUrl: string | null
    cuisine: string | null
    mealType: string | null
    difficulty: $Enums.RecipeDifficulty | null
    prepTime: number | null
    cookTime: number | null
    totalTime: number | null
    servings: number | null
    userRating: number | null
    savedCount: number | null
    isPublic: boolean | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    title: number
    description: number
    imageUrl: number
    fallbackImageUrl: number
    sourceType: number
    sourceId: number
    sourceUrl: number
    cuisine: number
    mealType: number
    difficulty: number
    prepTime: number
    cookTime: number
    totalTime: number
    servings: number
    instructions: number
    nutrition: number
    tags: number
    namedEntities: number
    userRating: number
    savedCount: number
    isPublic: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecipeAvgAggregateInputType = {
    prepTime?: true
    cookTime?: true
    totalTime?: true
    servings?: true
    userRating?: true
    savedCount?: true
  }

  export type RecipeSumAggregateInputType = {
    prepTime?: true
    cookTime?: true
    totalTime?: true
    servings?: true
    userRating?: true
    savedCount?: true
  }

  export type RecipeMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    fallbackImageUrl?: true
    sourceType?: true
    sourceId?: true
    sourceUrl?: true
    cuisine?: true
    mealType?: true
    difficulty?: true
    prepTime?: true
    cookTime?: true
    totalTime?: true
    servings?: true
    userRating?: true
    savedCount?: true
    isPublic?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    fallbackImageUrl?: true
    sourceType?: true
    sourceId?: true
    sourceUrl?: true
    cuisine?: true
    mealType?: true
    difficulty?: true
    prepTime?: true
    cookTime?: true
    totalTime?: true
    servings?: true
    userRating?: true
    savedCount?: true
    isPublic?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    imageUrl?: true
    fallbackImageUrl?: true
    sourceType?: true
    sourceId?: true
    sourceUrl?: true
    cuisine?: true
    mealType?: true
    difficulty?: true
    prepTime?: true
    cookTime?: true
    totalTime?: true
    servings?: true
    instructions?: true
    nutrition?: true
    tags?: true
    namedEntities?: true
    userRating?: true
    savedCount?: true
    isPublic?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _avg?: RecipeAvgAggregateInputType
    _sum?: RecipeSumAggregateInputType
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    title: string
    description: string | null
    imageUrl: string | null
    fallbackImageUrl: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId: string | null
    sourceUrl: string | null
    cuisine: string | null
    mealType: string | null
    difficulty: $Enums.RecipeDifficulty | null
    prepTime: number | null
    cookTime: number | null
    totalTime: number | null
    servings: number | null
    instructions: string[]
    nutrition: JsonValue | null
    tags: string[]
    namedEntities: string[]
    userRating: number | null
    savedCount: number
    isPublic: boolean
    createdById: string | null
    createdAt: Date
    updatedAt: Date
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    fallbackImageUrl?: boolean
    sourceType?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    cuisine?: boolean
    mealType?: boolean
    difficulty?: boolean
    prepTime?: boolean
    cookTime?: boolean
    totalTime?: boolean
    servings?: boolean
    instructions?: boolean
    nutrition?: boolean
    tags?: boolean
    namedEntities?: boolean
    userRating?: boolean
    savedCount?: boolean
    isPublic?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ingredients?: boolean | Recipe$ingredientsArgs<ExtArgs>
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
    userRecipes?: boolean | Recipe$userRecipesArgs<ExtArgs>
    mealPlanItems?: boolean | Recipe$mealPlanItemsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    fallbackImageUrl?: boolean
    sourceType?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    cuisine?: boolean
    mealType?: boolean
    difficulty?: boolean
    prepTime?: boolean
    cookTime?: boolean
    totalTime?: boolean
    servings?: boolean
    instructions?: boolean
    nutrition?: boolean
    tags?: boolean
    namedEntities?: boolean
    userRating?: boolean
    savedCount?: boolean
    isPublic?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    fallbackImageUrl?: boolean
    sourceType?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    cuisine?: boolean
    mealType?: boolean
    difficulty?: boolean
    prepTime?: boolean
    cookTime?: boolean
    totalTime?: boolean
    servings?: boolean
    instructions?: boolean
    nutrition?: boolean
    tags?: boolean
    namedEntities?: boolean
    userRating?: boolean
    savedCount?: boolean
    isPublic?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    fallbackImageUrl?: boolean
    sourceType?: boolean
    sourceId?: boolean
    sourceUrl?: boolean
    cuisine?: boolean
    mealType?: boolean
    difficulty?: boolean
    prepTime?: boolean
    cookTime?: boolean
    totalTime?: boolean
    servings?: boolean
    instructions?: boolean
    nutrition?: boolean
    tags?: boolean
    namedEntities?: boolean
    userRating?: boolean
    savedCount?: boolean
    isPublic?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "imageUrl" | "fallbackImageUrl" | "sourceType" | "sourceId" | "sourceUrl" | "cuisine" | "mealType" | "difficulty" | "prepTime" | "cookTime" | "totalTime" | "servings" | "instructions" | "nutrition" | "tags" | "namedEntities" | "userRating" | "savedCount" | "isPublic" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["recipe"]>
  export type RecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ingredients?: boolean | Recipe$ingredientsArgs<ExtArgs>
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
    userRecipes?: boolean | Recipe$userRecipesArgs<ExtArgs>
    mealPlanItems?: boolean | Recipe$mealPlanItemsArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
  }
  export type RecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Recipe$createdByArgs<ExtArgs>
  }

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {
      ingredients: Prisma.$RecipeIngredientPayload<ExtArgs>[]
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      userRecipes: Prisma.$UserRecipePayload<ExtArgs>[]
      mealPlanItems: Prisma.$MealPlanItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      imageUrl: string | null
      fallbackImageUrl: string | null
      sourceType: $Enums.RecipeSourceType
      sourceId: string | null
      sourceUrl: string | null
      cuisine: string | null
      mealType: string | null
      difficulty: $Enums.RecipeDifficulty | null
      prepTime: number | null
      cookTime: number | null
      totalTime: number | null
      servings: number | null
      instructions: string[]
      nutrition: Prisma.JsonValue | null
      tags: string[]
      namedEntities: string[]
      userRating: number | null
      savedCount: number
      isPublic: boolean
      createdById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipeCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {RecipeUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ingredients<T extends Recipe$ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdBy<T extends Recipe$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    userRecipes<T extends Recipe$userRecipesArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$userRecipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mealPlanItems<T extends Recipe$mealPlanItemsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$mealPlanItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly title: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly imageUrl: FieldRef<"Recipe", 'String'>
    readonly fallbackImageUrl: FieldRef<"Recipe", 'String'>
    readonly sourceType: FieldRef<"Recipe", 'RecipeSourceType'>
    readonly sourceId: FieldRef<"Recipe", 'String'>
    readonly sourceUrl: FieldRef<"Recipe", 'String'>
    readonly cuisine: FieldRef<"Recipe", 'String'>
    readonly mealType: FieldRef<"Recipe", 'String'>
    readonly difficulty: FieldRef<"Recipe", 'RecipeDifficulty'>
    readonly prepTime: FieldRef<"Recipe", 'Int'>
    readonly cookTime: FieldRef<"Recipe", 'Int'>
    readonly totalTime: FieldRef<"Recipe", 'Int'>
    readonly servings: FieldRef<"Recipe", 'Int'>
    readonly instructions: FieldRef<"Recipe", 'String[]'>
    readonly nutrition: FieldRef<"Recipe", 'Json'>
    readonly tags: FieldRef<"Recipe", 'String[]'>
    readonly namedEntities: FieldRef<"Recipe", 'String[]'>
    readonly userRating: FieldRef<"Recipe", 'Float'>
    readonly savedCount: FieldRef<"Recipe", 'Int'>
    readonly isPublic: FieldRef<"Recipe", 'Boolean'>
    readonly createdById: FieldRef<"Recipe", 'String'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe createManyAndReturn
   */
  export type RecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe updateManyAndReturn
   */
  export type RecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number
  }

  /**
   * Recipe.ingredients
   */
  export type Recipe$ingredientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    cursor?: RecipeIngredientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * Recipe.createdBy
   */
  export type Recipe$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Recipe.userRecipes
   */
  export type Recipe$userRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRecipe
     */
    select?: UserRecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRecipe
     */
    omit?: UserRecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRecipeInclude<ExtArgs> | null
    where?: UserRecipeWhereInput
    orderBy?: UserRecipeOrderByWithRelationInput | UserRecipeOrderByWithRelationInput[]
    cursor?: UserRecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRecipeScalarFieldEnum | UserRecipeScalarFieldEnum[]
  }

  /**
   * Recipe.mealPlanItems
   */
  export type Recipe$mealPlanItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanItem
     */
    select?: MealPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanItem
     */
    omit?: MealPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanItemInclude<ExtArgs> | null
    where?: MealPlanItemWhereInput
    orderBy?: MealPlanItemOrderByWithRelationInput | MealPlanItemOrderByWithRelationInput[]
    cursor?: MealPlanItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealPlanItemScalarFieldEnum | MealPlanItemScalarFieldEnum[]
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
  }


  /**
   * Model RecipeIngredient
   */

  export type AggregateRecipeIngredient = {
    _count: RecipeIngredientCountAggregateOutputType | null
    _avg: RecipeIngredientAvgAggregateOutputType | null
    _sum: RecipeIngredientSumAggregateOutputType | null
    _min: RecipeIngredientMinAggregateOutputType | null
    _max: RecipeIngredientMaxAggregateOutputType | null
  }

  export type RecipeIngredientAvgAggregateOutputType = {
    ingredientId: number | null
    amount: number | null
  }

  export type RecipeIngredientSumAggregateOutputType = {
    ingredientId: number | null
    amount: number | null
  }

  export type RecipeIngredientMinAggregateOutputType = {
    id: string | null
    recipeId: string | null
    ingredientId: number | null
    name: string | null
    amount: number | null
    unit: string | null
    original: string | null
    image: string | null
  }

  export type RecipeIngredientMaxAggregateOutputType = {
    id: string | null
    recipeId: string | null
    ingredientId: number | null
    name: string | null
    amount: number | null
    unit: string | null
    original: string | null
    image: string | null
  }

  export type RecipeIngredientCountAggregateOutputType = {
    id: number
    recipeId: number
    ingredientId: number
    name: number
    amount: number
    unit: number
    original: number
    image: number
    _all: number
  }


  export type RecipeIngredientAvgAggregateInputType = {
    ingredientId?: true
    amount?: true
  }

  export type RecipeIngredientSumAggregateInputType = {
    ingredientId?: true
    amount?: true
  }

  export type RecipeIngredientMinAggregateInputType = {
    id?: true
    recipeId?: true
    ingredientId?: true
    name?: true
    amount?: true
    unit?: true
    original?: true
    image?: true
  }

  export type RecipeIngredientMaxAggregateInputType = {
    id?: true
    recipeId?: true
    ingredientId?: true
    name?: true
    amount?: true
    unit?: true
    original?: true
    image?: true
  }

  export type RecipeIngredientCountAggregateInputType = {
    id?: true
    recipeId?: true
    ingredientId?: true
    name?: true
    amount?: true
    unit?: true
    original?: true
    image?: true
    _all?: true
  }

  export type RecipeIngredientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeIngredient to aggregate.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeIngredients
    **/
    _count?: true | RecipeIngredientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeIngredientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeIngredientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeIngredientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeIngredientMaxAggregateInputType
  }

  export type GetRecipeIngredientAggregateType<T extends RecipeIngredientAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeIngredient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeIngredient[P]>
      : GetScalarType<T[P], AggregateRecipeIngredient[P]>
  }




  export type RecipeIngredientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeIngredientWhereInput
    orderBy?: RecipeIngredientOrderByWithAggregationInput | RecipeIngredientOrderByWithAggregationInput[]
    by: RecipeIngredientScalarFieldEnum[] | RecipeIngredientScalarFieldEnum
    having?: RecipeIngredientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeIngredientCountAggregateInputType | true
    _avg?: RecipeIngredientAvgAggregateInputType
    _sum?: RecipeIngredientSumAggregateInputType
    _min?: RecipeIngredientMinAggregateInputType
    _max?: RecipeIngredientMaxAggregateInputType
  }

  export type RecipeIngredientGroupByOutputType = {
    id: string
    recipeId: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image: string | null
    _count: RecipeIngredientCountAggregateOutputType | null
    _avg: RecipeIngredientAvgAggregateOutputType | null
    _sum: RecipeIngredientSumAggregateOutputType | null
    _min: RecipeIngredientMinAggregateOutputType | null
    _max: RecipeIngredientMaxAggregateOutputType | null
  }

  type GetRecipeIngredientGroupByPayload<T extends RecipeIngredientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeIngredientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeIngredientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeIngredientGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeIngredientGroupByOutputType[P]>
        }
      >
    >


  export type RecipeIngredientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipeId?: boolean
    ingredientId?: boolean
    name?: boolean
    amount?: boolean
    unit?: boolean
    original?: boolean
    image?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeIngredient"]>

  export type RecipeIngredientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipeId?: boolean
    ingredientId?: boolean
    name?: boolean
    amount?: boolean
    unit?: boolean
    original?: boolean
    image?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeIngredient"]>

  export type RecipeIngredientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recipeId?: boolean
    ingredientId?: boolean
    name?: boolean
    amount?: boolean
    unit?: boolean
    original?: boolean
    image?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeIngredient"]>

  export type RecipeIngredientSelectScalar = {
    id?: boolean
    recipeId?: boolean
    ingredientId?: boolean
    name?: boolean
    amount?: boolean
    unit?: boolean
    original?: boolean
    image?: boolean
  }

  export type RecipeIngredientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recipeId" | "ingredientId" | "name" | "amount" | "unit" | "original" | "image", ExtArgs["result"]["recipeIngredient"]>
  export type RecipeIngredientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeIngredientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeIngredientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $RecipeIngredientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeIngredient"
    objects: {
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recipeId: string
      ingredientId: number
      name: string
      amount: number
      unit: string
      original: string
      image: string | null
    }, ExtArgs["result"]["recipeIngredient"]>
    composites: {}
  }

  type RecipeIngredientGetPayload<S extends boolean | null | undefined | RecipeIngredientDefaultArgs> = $Result.GetResult<Prisma.$RecipeIngredientPayload, S>

  type RecipeIngredientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeIngredientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeIngredientCountAggregateInputType | true
    }

  export interface RecipeIngredientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeIngredient'], meta: { name: 'RecipeIngredient' } }
    /**
     * Find zero or one RecipeIngredient that matches the filter.
     * @param {RecipeIngredientFindUniqueArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeIngredientFindUniqueArgs>(args: SelectSubset<T, RecipeIngredientFindUniqueArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeIngredient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeIngredientFindUniqueOrThrowArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeIngredientFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeIngredientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeIngredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindFirstArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeIngredientFindFirstArgs>(args?: SelectSubset<T, RecipeIngredientFindFirstArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeIngredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindFirstOrThrowArgs} args - Arguments to find a RecipeIngredient
     * @example
     * // Get one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeIngredientFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeIngredientFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeIngredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeIngredients
     * const recipeIngredients = await prisma.recipeIngredient.findMany()
     * 
     * // Get first 10 RecipeIngredients
     * const recipeIngredients = await prisma.recipeIngredient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeIngredientWithIdOnly = await prisma.recipeIngredient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeIngredientFindManyArgs>(args?: SelectSubset<T, RecipeIngredientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeIngredient.
     * @param {RecipeIngredientCreateArgs} args - Arguments to create a RecipeIngredient.
     * @example
     * // Create one RecipeIngredient
     * const RecipeIngredient = await prisma.recipeIngredient.create({
     *   data: {
     *     // ... data to create a RecipeIngredient
     *   }
     * })
     * 
     */
    create<T extends RecipeIngredientCreateArgs>(args: SelectSubset<T, RecipeIngredientCreateArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeIngredients.
     * @param {RecipeIngredientCreateManyArgs} args - Arguments to create many RecipeIngredients.
     * @example
     * // Create many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeIngredientCreateManyArgs>(args?: SelectSubset<T, RecipeIngredientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeIngredients and returns the data saved in the database.
     * @param {RecipeIngredientCreateManyAndReturnArgs} args - Arguments to create many RecipeIngredients.
     * @example
     * // Create many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeIngredients and only return the `id`
     * const recipeIngredientWithIdOnly = await prisma.recipeIngredient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeIngredientCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeIngredientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecipeIngredient.
     * @param {RecipeIngredientDeleteArgs} args - Arguments to delete one RecipeIngredient.
     * @example
     * // Delete one RecipeIngredient
     * const RecipeIngredient = await prisma.recipeIngredient.delete({
     *   where: {
     *     // ... filter to delete one RecipeIngredient
     *   }
     * })
     * 
     */
    delete<T extends RecipeIngredientDeleteArgs>(args: SelectSubset<T, RecipeIngredientDeleteArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeIngredient.
     * @param {RecipeIngredientUpdateArgs} args - Arguments to update one RecipeIngredient.
     * @example
     * // Update one RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeIngredientUpdateArgs>(args: SelectSubset<T, RecipeIngredientUpdateArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeIngredients.
     * @param {RecipeIngredientDeleteManyArgs} args - Arguments to filter RecipeIngredients to delete.
     * @example
     * // Delete a few RecipeIngredients
     * const { count } = await prisma.recipeIngredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeIngredientDeleteManyArgs>(args?: SelectSubset<T, RecipeIngredientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeIngredientUpdateManyArgs>(args: SelectSubset<T, RecipeIngredientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeIngredients and returns the data updated in the database.
     * @param {RecipeIngredientUpdateManyAndReturnArgs} args - Arguments to update many RecipeIngredients.
     * @example
     * // Update many RecipeIngredients
     * const recipeIngredient = await prisma.recipeIngredient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecipeIngredients and only return the `id`
     * const recipeIngredientWithIdOnly = await prisma.recipeIngredient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeIngredientUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeIngredientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecipeIngredient.
     * @param {RecipeIngredientUpsertArgs} args - Arguments to update or create a RecipeIngredient.
     * @example
     * // Update or create a RecipeIngredient
     * const recipeIngredient = await prisma.recipeIngredient.upsert({
     *   create: {
     *     // ... data to create a RecipeIngredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeIngredient we want to update
     *   }
     * })
     */
    upsert<T extends RecipeIngredientUpsertArgs>(args: SelectSubset<T, RecipeIngredientUpsertArgs<ExtArgs>>): Prisma__RecipeIngredientClient<$Result.GetResult<Prisma.$RecipeIngredientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeIngredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientCountArgs} args - Arguments to filter RecipeIngredients to count.
     * @example
     * // Count the number of RecipeIngredients
     * const count = await prisma.recipeIngredient.count({
     *   where: {
     *     // ... the filter for the RecipeIngredients we want to count
     *   }
     * })
    **/
    count<T extends RecipeIngredientCountArgs>(
      args?: Subset<T, RecipeIngredientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeIngredientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeIngredientAggregateArgs>(args: Subset<T, RecipeIngredientAggregateArgs>): Prisma.PrismaPromise<GetRecipeIngredientAggregateType<T>>

    /**
     * Group by RecipeIngredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeIngredientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeIngredientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeIngredientGroupByArgs['orderBy'] }
        : { orderBy?: RecipeIngredientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeIngredientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeIngredientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeIngredient model
   */
  readonly fields: RecipeIngredientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeIngredient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeIngredientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeIngredient model
   */
  interface RecipeIngredientFieldRefs {
    readonly id: FieldRef<"RecipeIngredient", 'String'>
    readonly recipeId: FieldRef<"RecipeIngredient", 'String'>
    readonly ingredientId: FieldRef<"RecipeIngredient", 'Int'>
    readonly name: FieldRef<"RecipeIngredient", 'String'>
    readonly amount: FieldRef<"RecipeIngredient", 'Float'>
    readonly unit: FieldRef<"RecipeIngredient", 'String'>
    readonly original: FieldRef<"RecipeIngredient", 'String'>
    readonly image: FieldRef<"RecipeIngredient", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecipeIngredient findUnique
   */
  export type RecipeIngredientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient findUniqueOrThrow
   */
  export type RecipeIngredientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient findFirst
   */
  export type RecipeIngredientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeIngredients.
     */
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient findFirstOrThrow
   */
  export type RecipeIngredientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredient to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeIngredients.
     */
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient findMany
   */
  export type RecipeIngredientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter, which RecipeIngredients to fetch.
     */
    where?: RecipeIngredientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeIngredients to fetch.
     */
    orderBy?: RecipeIngredientOrderByWithRelationInput | RecipeIngredientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeIngredients.
     */
    cursor?: RecipeIngredientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeIngredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeIngredients.
     */
    skip?: number
    distinct?: RecipeIngredientScalarFieldEnum | RecipeIngredientScalarFieldEnum[]
  }

  /**
   * RecipeIngredient create
   */
  export type RecipeIngredientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeIngredient.
     */
    data: XOR<RecipeIngredientCreateInput, RecipeIngredientUncheckedCreateInput>
  }

  /**
   * RecipeIngredient createMany
   */
  export type RecipeIngredientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeIngredients.
     */
    data: RecipeIngredientCreateManyInput | RecipeIngredientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeIngredient createManyAndReturn
   */
  export type RecipeIngredientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * The data used to create many RecipeIngredients.
     */
    data: RecipeIngredientCreateManyInput | RecipeIngredientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeIngredient update
   */
  export type RecipeIngredientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeIngredient.
     */
    data: XOR<RecipeIngredientUpdateInput, RecipeIngredientUncheckedUpdateInput>
    /**
     * Choose, which RecipeIngredient to update.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient updateMany
   */
  export type RecipeIngredientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeIngredients.
     */
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyInput>
    /**
     * Filter which RecipeIngredients to update
     */
    where?: RecipeIngredientWhereInput
    /**
     * Limit how many RecipeIngredients to update.
     */
    limit?: number
  }

  /**
   * RecipeIngredient updateManyAndReturn
   */
  export type RecipeIngredientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * The data used to update RecipeIngredients.
     */
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyInput>
    /**
     * Filter which RecipeIngredients to update
     */
    where?: RecipeIngredientWhereInput
    /**
     * Limit how many RecipeIngredients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeIngredient upsert
   */
  export type RecipeIngredientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeIngredient to update in case it exists.
     */
    where: RecipeIngredientWhereUniqueInput
    /**
     * In case the RecipeIngredient found by the `where` argument doesn't exist, create a new RecipeIngredient with this data.
     */
    create: XOR<RecipeIngredientCreateInput, RecipeIngredientUncheckedCreateInput>
    /**
     * In case the RecipeIngredient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeIngredientUpdateInput, RecipeIngredientUncheckedUpdateInput>
  }

  /**
   * RecipeIngredient delete
   */
  export type RecipeIngredientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
    /**
     * Filter which RecipeIngredient to delete.
     */
    where: RecipeIngredientWhereUniqueInput
  }

  /**
   * RecipeIngredient deleteMany
   */
  export type RecipeIngredientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeIngredients to delete
     */
    where?: RecipeIngredientWhereInput
    /**
     * Limit how many RecipeIngredients to delete.
     */
    limit?: number
  }

  /**
   * RecipeIngredient without action
   */
  export type RecipeIngredientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeIngredient
     */
    select?: RecipeIngredientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeIngredient
     */
    omit?: RecipeIngredientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIngredientInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    name: 'name',
    age: 'age',
    weight: 'weight',
    goals: 'goals',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    activityLevel: 'activityLevel',
    height: 'height',
    diet_preference: 'diet_preference'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserRecipeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceId: 'sourceId',
    status: 'status',
    dateAdded: 'dateAdded',
    cachedRecipeId: 'cachedRecipeId'
  };

  export type UserRecipeScalarFieldEnum = (typeof UserRecipeScalarFieldEnum)[keyof typeof UserRecipeScalarFieldEnum]


  export const MealPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    startDate: 'startDate',
    endDate: 'endDate',
    constraints: 'constraints',
    createdAt: 'createdAt'
  };

  export type MealPlanScalarFieldEnum = (typeof MealPlanScalarFieldEnum)[keyof typeof MealPlanScalarFieldEnum]


  export const MealPlanItemScalarFieldEnum: {
    id: 'id',
    mealPlanId: 'mealPlanId',
    sourceId: 'sourceId',
    dayOfWeek: 'dayOfWeek',
    mealType: 'mealType',
    cachedRecipeId: 'cachedRecipeId'
  };

  export type MealPlanItemScalarFieldEnum = (typeof MealPlanItemScalarFieldEnum)[keyof typeof MealPlanItemScalarFieldEnum]


  export const ProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    weight: 'weight',
    caloriesConsumed: 'caloriesConsumed',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type ProgressScalarFieldEnum = (typeof ProgressScalarFieldEnum)[keyof typeof ProgressScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    imageUrl: 'imageUrl',
    fallbackImageUrl: 'fallbackImageUrl',
    sourceType: 'sourceType',
    sourceId: 'sourceId',
    sourceUrl: 'sourceUrl',
    cuisine: 'cuisine',
    mealType: 'mealType',
    difficulty: 'difficulty',
    prepTime: 'prepTime',
    cookTime: 'cookTime',
    totalTime: 'totalTime',
    servings: 'servings',
    instructions: 'instructions',
    nutrition: 'nutrition',
    tags: 'tags',
    namedEntities: 'namedEntities',
    userRating: 'userRating',
    savedCount: 'savedCount',
    isPublic: 'isPublic',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const RecipeIngredientScalarFieldEnum: {
    id: 'id',
    recipeId: 'recipeId',
    ingredientId: 'ingredientId',
    name: 'name',
    amount: 'amount',
    unit: 'unit',
    original: 'original',
    image: 'image'
  };

  export type RecipeIngredientScalarFieldEnum = (typeof RecipeIngredientScalarFieldEnum)[keyof typeof RecipeIngredientScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'RecipeSourceType'
   */
  export type EnumRecipeSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeSourceType'>
    


  /**
   * Reference to a field of type 'RecipeSourceType[]'
   */
  export type ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeSourceType[]'>
    


  /**
   * Reference to a field of type 'RecipeDifficulty'
   */
  export type EnumRecipeDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeDifficulty'>
    


  /**
   * Reference to a field of type 'RecipeDifficulty[]'
   */
  export type ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecipeDifficulty[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    age?: IntNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    goals?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activityLevel?: StringNullableFilter<"User"> | string | null
    height?: FloatNullableFilter<"User"> | number | null
    diet_preference?: StringNullableFilter<"User"> | string | null
    mealPlans?: MealPlanListRelationFilter
    progress?: ProgressListRelationFilter
    userRecipes?: UserRecipeListRelationFilter
    recipes?: RecipeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    goals?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityLevel?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    diet_preference?: SortOrderInput | SortOrder
    mealPlans?: MealPlanOrderByRelationAggregateInput
    progress?: ProgressOrderByRelationAggregateInput
    userRecipes?: UserRecipeOrderByRelationAggregateInput
    recipes?: RecipeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    age?: IntNullableFilter<"User"> | number | null
    weight?: FloatNullableFilter<"User"> | number | null
    goals?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activityLevel?: StringNullableFilter<"User"> | string | null
    height?: FloatNullableFilter<"User"> | number | null
    diet_preference?: StringNullableFilter<"User"> | string | null
    mealPlans?: MealPlanListRelationFilter
    progress?: ProgressListRelationFilter
    userRecipes?: UserRecipeListRelationFilter
    recipes?: RecipeListRelationFilter
  }, "id" | "clerkId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    goals?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityLevel?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    diet_preference?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"User"> | number | null
    goals?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    activityLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    height?: FloatNullableWithAggregatesFilter<"User"> | number | null
    diet_preference?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserRecipeWhereInput = {
    AND?: UserRecipeWhereInput | UserRecipeWhereInput[]
    OR?: UserRecipeWhereInput[]
    NOT?: UserRecipeWhereInput | UserRecipeWhereInput[]
    id?: StringFilter<"UserRecipe"> | string
    userId?: StringFilter<"UserRecipe"> | string
    sourceId?: StringNullableFilter<"UserRecipe"> | string | null
    status?: StringFilter<"UserRecipe"> | string
    dateAdded?: DateTimeFilter<"UserRecipe"> | Date | string
    cachedRecipeId?: StringNullableFilter<"UserRecipe"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cachedRecipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }

  export type UserRecipeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    dateAdded?: SortOrder
    cachedRecipeId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    cachedRecipe?: RecipeOrderByWithRelationInput
  }

  export type UserRecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_sourceId_status?: UserRecipeUserIdSourceIdStatusCompoundUniqueInput
    AND?: UserRecipeWhereInput | UserRecipeWhereInput[]
    OR?: UserRecipeWhereInput[]
    NOT?: UserRecipeWhereInput | UserRecipeWhereInput[]
    userId?: StringFilter<"UserRecipe"> | string
    sourceId?: StringNullableFilter<"UserRecipe"> | string | null
    status?: StringFilter<"UserRecipe"> | string
    dateAdded?: DateTimeFilter<"UserRecipe"> | Date | string
    cachedRecipeId?: StringNullableFilter<"UserRecipe"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cachedRecipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }, "id" | "userId_sourceId_status">

  export type UserRecipeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    dateAdded?: SortOrder
    cachedRecipeId?: SortOrderInput | SortOrder
    _count?: UserRecipeCountOrderByAggregateInput
    _max?: UserRecipeMaxOrderByAggregateInput
    _min?: UserRecipeMinOrderByAggregateInput
  }

  export type UserRecipeScalarWhereWithAggregatesInput = {
    AND?: UserRecipeScalarWhereWithAggregatesInput | UserRecipeScalarWhereWithAggregatesInput[]
    OR?: UserRecipeScalarWhereWithAggregatesInput[]
    NOT?: UserRecipeScalarWhereWithAggregatesInput | UserRecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserRecipe"> | string
    userId?: StringWithAggregatesFilter<"UserRecipe"> | string
    sourceId?: StringNullableWithAggregatesFilter<"UserRecipe"> | string | null
    status?: StringWithAggregatesFilter<"UserRecipe"> | string
    dateAdded?: DateTimeWithAggregatesFilter<"UserRecipe"> | Date | string
    cachedRecipeId?: StringNullableWithAggregatesFilter<"UserRecipe"> | string | null
  }

  export type MealPlanWhereInput = {
    AND?: MealPlanWhereInput | MealPlanWhereInput[]
    OR?: MealPlanWhereInput[]
    NOT?: MealPlanWhereInput | MealPlanWhereInput[]
    id?: StringFilter<"MealPlan"> | string
    userId?: StringFilter<"MealPlan"> | string
    startDate?: DateTimeFilter<"MealPlan"> | Date | string
    endDate?: DateTimeFilter<"MealPlan"> | Date | string
    constraints?: JsonNullableFilter<"MealPlan">
    createdAt?: DateTimeFilter<"MealPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealPlanItems?: MealPlanItemListRelationFilter
  }

  export type MealPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    constraints?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    mealPlanItems?: MealPlanItemOrderByRelationAggregateInput
  }

  export type MealPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealPlanWhereInput | MealPlanWhereInput[]
    OR?: MealPlanWhereInput[]
    NOT?: MealPlanWhereInput | MealPlanWhereInput[]
    userId?: StringFilter<"MealPlan"> | string
    startDate?: DateTimeFilter<"MealPlan"> | Date | string
    endDate?: DateTimeFilter<"MealPlan"> | Date | string
    constraints?: JsonNullableFilter<"MealPlan">
    createdAt?: DateTimeFilter<"MealPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealPlanItems?: MealPlanItemListRelationFilter
  }, "id">

  export type MealPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    constraints?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MealPlanCountOrderByAggregateInput
    _max?: MealPlanMaxOrderByAggregateInput
    _min?: MealPlanMinOrderByAggregateInput
  }

  export type MealPlanScalarWhereWithAggregatesInput = {
    AND?: MealPlanScalarWhereWithAggregatesInput | MealPlanScalarWhereWithAggregatesInput[]
    OR?: MealPlanScalarWhereWithAggregatesInput[]
    NOT?: MealPlanScalarWhereWithAggregatesInput | MealPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealPlan"> | string
    userId?: StringWithAggregatesFilter<"MealPlan"> | string
    startDate?: DateTimeWithAggregatesFilter<"MealPlan"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"MealPlan"> | Date | string
    constraints?: JsonNullableWithAggregatesFilter<"MealPlan">
    createdAt?: DateTimeWithAggregatesFilter<"MealPlan"> | Date | string
  }

  export type MealPlanItemWhereInput = {
    AND?: MealPlanItemWhereInput | MealPlanItemWhereInput[]
    OR?: MealPlanItemWhereInput[]
    NOT?: MealPlanItemWhereInput | MealPlanItemWhereInput[]
    id?: StringFilter<"MealPlanItem"> | string
    mealPlanId?: StringFilter<"MealPlanItem"> | string
    sourceId?: StringNullableFilter<"MealPlanItem"> | string | null
    dayOfWeek?: IntFilter<"MealPlanItem"> | number
    mealType?: StringFilter<"MealPlanItem"> | string
    cachedRecipeId?: StringNullableFilter<"MealPlanItem"> | string | null
    mealPlan?: XOR<MealPlanScalarRelationFilter, MealPlanWhereInput>
    cachedRecipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }

  export type MealPlanItemOrderByWithRelationInput = {
    id?: SortOrder
    mealPlanId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    dayOfWeek?: SortOrder
    mealType?: SortOrder
    cachedRecipeId?: SortOrderInput | SortOrder
    mealPlan?: MealPlanOrderByWithRelationInput
    cachedRecipe?: RecipeOrderByWithRelationInput
  }

  export type MealPlanItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    mealPlanId_dayOfWeek_mealType?: MealPlanItemMealPlanIdDayOfWeekMealTypeCompoundUniqueInput
    AND?: MealPlanItemWhereInput | MealPlanItemWhereInput[]
    OR?: MealPlanItemWhereInput[]
    NOT?: MealPlanItemWhereInput | MealPlanItemWhereInput[]
    mealPlanId?: StringFilter<"MealPlanItem"> | string
    sourceId?: StringNullableFilter<"MealPlanItem"> | string | null
    dayOfWeek?: IntFilter<"MealPlanItem"> | number
    mealType?: StringFilter<"MealPlanItem"> | string
    cachedRecipeId?: StringNullableFilter<"MealPlanItem"> | string | null
    mealPlan?: XOR<MealPlanScalarRelationFilter, MealPlanWhereInput>
    cachedRecipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }, "id" | "mealPlanId_dayOfWeek_mealType">

  export type MealPlanItemOrderByWithAggregationInput = {
    id?: SortOrder
    mealPlanId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    dayOfWeek?: SortOrder
    mealType?: SortOrder
    cachedRecipeId?: SortOrderInput | SortOrder
    _count?: MealPlanItemCountOrderByAggregateInput
    _avg?: MealPlanItemAvgOrderByAggregateInput
    _max?: MealPlanItemMaxOrderByAggregateInput
    _min?: MealPlanItemMinOrderByAggregateInput
    _sum?: MealPlanItemSumOrderByAggregateInput
  }

  export type MealPlanItemScalarWhereWithAggregatesInput = {
    AND?: MealPlanItemScalarWhereWithAggregatesInput | MealPlanItemScalarWhereWithAggregatesInput[]
    OR?: MealPlanItemScalarWhereWithAggregatesInput[]
    NOT?: MealPlanItemScalarWhereWithAggregatesInput | MealPlanItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealPlanItem"> | string
    mealPlanId?: StringWithAggregatesFilter<"MealPlanItem"> | string
    sourceId?: StringNullableWithAggregatesFilter<"MealPlanItem"> | string | null
    dayOfWeek?: IntWithAggregatesFilter<"MealPlanItem"> | number
    mealType?: StringWithAggregatesFilter<"MealPlanItem"> | string
    cachedRecipeId?: StringNullableWithAggregatesFilter<"MealPlanItem"> | string | null
  }

  export type ProgressWhereInput = {
    AND?: ProgressWhereInput | ProgressWhereInput[]
    OR?: ProgressWhereInput[]
    NOT?: ProgressWhereInput | ProgressWhereInput[]
    id?: StringFilter<"Progress"> | string
    userId?: StringFilter<"Progress"> | string
    date?: DateTimeFilter<"Progress"> | Date | string
    weight?: FloatNullableFilter<"Progress"> | number | null
    caloriesConsumed?: IntNullableFilter<"Progress"> | number | null
    notes?: StringNullableFilter<"Progress"> | string | null
    createdAt?: DateTimeFilter<"Progress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    weight?: SortOrderInput | SortOrder
    caloriesConsumed?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgressWhereInput | ProgressWhereInput[]
    OR?: ProgressWhereInput[]
    NOT?: ProgressWhereInput | ProgressWhereInput[]
    userId?: StringFilter<"Progress"> | string
    date?: DateTimeFilter<"Progress"> | Date | string
    weight?: FloatNullableFilter<"Progress"> | number | null
    caloriesConsumed?: IntNullableFilter<"Progress"> | number | null
    notes?: StringNullableFilter<"Progress"> | string | null
    createdAt?: DateTimeFilter<"Progress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    weight?: SortOrderInput | SortOrder
    caloriesConsumed?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProgressCountOrderByAggregateInput
    _avg?: ProgressAvgOrderByAggregateInput
    _max?: ProgressMaxOrderByAggregateInput
    _min?: ProgressMinOrderByAggregateInput
    _sum?: ProgressSumOrderByAggregateInput
  }

  export type ProgressScalarWhereWithAggregatesInput = {
    AND?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[]
    OR?: ProgressScalarWhereWithAggregatesInput[]
    NOT?: ProgressScalarWhereWithAggregatesInput | ProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Progress"> | string
    userId?: StringWithAggregatesFilter<"Progress"> | string
    date?: DateTimeWithAggregatesFilter<"Progress"> | Date | string
    weight?: FloatNullableWithAggregatesFilter<"Progress"> | number | null
    caloriesConsumed?: IntNullableWithAggregatesFilter<"Progress"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Progress"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Progress"> | Date | string
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    fallbackImageUrl?: StringNullableFilter<"Recipe"> | string | null
    sourceType?: EnumRecipeSourceTypeFilter<"Recipe"> | $Enums.RecipeSourceType
    sourceId?: StringNullableFilter<"Recipe"> | string | null
    sourceUrl?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringNullableFilter<"Recipe"> | string | null
    mealType?: StringNullableFilter<"Recipe"> | string | null
    difficulty?: EnumRecipeDifficultyNullableFilter<"Recipe"> | $Enums.RecipeDifficulty | null
    prepTime?: IntNullableFilter<"Recipe"> | number | null
    cookTime?: IntNullableFilter<"Recipe"> | number | null
    totalTime?: IntNullableFilter<"Recipe"> | number | null
    servings?: IntNullableFilter<"Recipe"> | number | null
    instructions?: StringNullableListFilter<"Recipe">
    nutrition?: JsonNullableFilter<"Recipe">
    tags?: StringNullableListFilter<"Recipe">
    namedEntities?: StringNullableListFilter<"Recipe">
    userRating?: FloatNullableFilter<"Recipe"> | number | null
    savedCount?: IntFilter<"Recipe"> | number
    isPublic?: BoolFilter<"Recipe"> | boolean
    createdById?: StringNullableFilter<"Recipe"> | string | null
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    ingredients?: RecipeIngredientListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    userRecipes?: UserRecipeListRelationFilter
    mealPlanItems?: MealPlanItemListRelationFilter
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fallbackImageUrl?: SortOrderInput | SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    cuisine?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    prepTime?: SortOrderInput | SortOrder
    cookTime?: SortOrderInput | SortOrder
    totalTime?: SortOrderInput | SortOrder
    servings?: SortOrderInput | SortOrder
    instructions?: SortOrder
    nutrition?: SortOrderInput | SortOrder
    tags?: SortOrder
    namedEntities?: SortOrder
    userRating?: SortOrderInput | SortOrder
    savedCount?: SortOrder
    isPublic?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ingredients?: RecipeIngredientOrderByRelationAggregateInput
    createdBy?: UserOrderByWithRelationInput
    userRecipes?: UserRecipeOrderByRelationAggregateInput
    mealPlanItems?: MealPlanItemOrderByRelationAggregateInput
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    title?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    fallbackImageUrl?: StringNullableFilter<"Recipe"> | string | null
    sourceType?: EnumRecipeSourceTypeFilter<"Recipe"> | $Enums.RecipeSourceType
    sourceId?: StringNullableFilter<"Recipe"> | string | null
    sourceUrl?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringNullableFilter<"Recipe"> | string | null
    mealType?: StringNullableFilter<"Recipe"> | string | null
    difficulty?: EnumRecipeDifficultyNullableFilter<"Recipe"> | $Enums.RecipeDifficulty | null
    prepTime?: IntNullableFilter<"Recipe"> | number | null
    cookTime?: IntNullableFilter<"Recipe"> | number | null
    totalTime?: IntNullableFilter<"Recipe"> | number | null
    servings?: IntNullableFilter<"Recipe"> | number | null
    instructions?: StringNullableListFilter<"Recipe">
    nutrition?: JsonNullableFilter<"Recipe">
    tags?: StringNullableListFilter<"Recipe">
    namedEntities?: StringNullableListFilter<"Recipe">
    userRating?: FloatNullableFilter<"Recipe"> | number | null
    savedCount?: IntFilter<"Recipe"> | number
    isPublic?: BoolFilter<"Recipe"> | boolean
    createdById?: StringNullableFilter<"Recipe"> | string | null
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    ingredients?: RecipeIngredientListRelationFilter
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    userRecipes?: UserRecipeListRelationFilter
    mealPlanItems?: MealPlanItemListRelationFilter
  }, "id">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    fallbackImageUrl?: SortOrderInput | SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    cuisine?: SortOrderInput | SortOrder
    mealType?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    prepTime?: SortOrderInput | SortOrder
    cookTime?: SortOrderInput | SortOrder
    totalTime?: SortOrderInput | SortOrder
    servings?: SortOrderInput | SortOrder
    instructions?: SortOrder
    nutrition?: SortOrderInput | SortOrder
    tags?: SortOrder
    namedEntities?: SortOrder
    userRating?: SortOrderInput | SortOrder
    savedCount?: SortOrder
    isPublic?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _avg?: RecipeAvgOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
    _sum?: RecipeSumOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    title?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    fallbackImageUrl?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    sourceType?: EnumRecipeSourceTypeWithAggregatesFilter<"Recipe"> | $Enums.RecipeSourceType
    sourceId?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    sourceUrl?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    cuisine?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    mealType?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    difficulty?: EnumRecipeDifficultyNullableWithAggregatesFilter<"Recipe"> | $Enums.RecipeDifficulty | null
    prepTime?: IntNullableWithAggregatesFilter<"Recipe"> | number | null
    cookTime?: IntNullableWithAggregatesFilter<"Recipe"> | number | null
    totalTime?: IntNullableWithAggregatesFilter<"Recipe"> | number | null
    servings?: IntNullableWithAggregatesFilter<"Recipe"> | number | null
    instructions?: StringNullableListFilter<"Recipe">
    nutrition?: JsonNullableWithAggregatesFilter<"Recipe">
    tags?: StringNullableListFilter<"Recipe">
    namedEntities?: StringNullableListFilter<"Recipe">
    userRating?: FloatNullableWithAggregatesFilter<"Recipe"> | number | null
    savedCount?: IntWithAggregatesFilter<"Recipe"> | number
    isPublic?: BoolWithAggregatesFilter<"Recipe"> | boolean
    createdById?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
  }

  export type RecipeIngredientWhereInput = {
    AND?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    OR?: RecipeIngredientWhereInput[]
    NOT?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    id?: StringFilter<"RecipeIngredient"> | string
    recipeId?: StringFilter<"RecipeIngredient"> | string
    ingredientId?: IntFilter<"RecipeIngredient"> | number
    name?: StringFilter<"RecipeIngredient"> | string
    amount?: FloatFilter<"RecipeIngredient"> | number
    unit?: StringFilter<"RecipeIngredient"> | string
    original?: StringFilter<"RecipeIngredient"> | string
    image?: StringNullableFilter<"RecipeIngredient"> | string | null
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type RecipeIngredientOrderByWithRelationInput = {
    id?: SortOrder
    recipeId?: SortOrder
    ingredientId?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    unit?: SortOrder
    original?: SortOrder
    image?: SortOrderInput | SortOrder
    recipe?: RecipeOrderByWithRelationInput
  }

  export type RecipeIngredientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    OR?: RecipeIngredientWhereInput[]
    NOT?: RecipeIngredientWhereInput | RecipeIngredientWhereInput[]
    recipeId?: StringFilter<"RecipeIngredient"> | string
    ingredientId?: IntFilter<"RecipeIngredient"> | number
    name?: StringFilter<"RecipeIngredient"> | string
    amount?: FloatFilter<"RecipeIngredient"> | number
    unit?: StringFilter<"RecipeIngredient"> | string
    original?: StringFilter<"RecipeIngredient"> | string
    image?: StringNullableFilter<"RecipeIngredient"> | string | null
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id">

  export type RecipeIngredientOrderByWithAggregationInput = {
    id?: SortOrder
    recipeId?: SortOrder
    ingredientId?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    unit?: SortOrder
    original?: SortOrder
    image?: SortOrderInput | SortOrder
    _count?: RecipeIngredientCountOrderByAggregateInput
    _avg?: RecipeIngredientAvgOrderByAggregateInput
    _max?: RecipeIngredientMaxOrderByAggregateInput
    _min?: RecipeIngredientMinOrderByAggregateInput
    _sum?: RecipeIngredientSumOrderByAggregateInput
  }

  export type RecipeIngredientScalarWhereWithAggregatesInput = {
    AND?: RecipeIngredientScalarWhereWithAggregatesInput | RecipeIngredientScalarWhereWithAggregatesInput[]
    OR?: RecipeIngredientScalarWhereWithAggregatesInput[]
    NOT?: RecipeIngredientScalarWhereWithAggregatesInput | RecipeIngredientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    recipeId?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    ingredientId?: IntWithAggregatesFilter<"RecipeIngredient"> | number
    name?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    amount?: FloatWithAggregatesFilter<"RecipeIngredient"> | number
    unit?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    original?: StringWithAggregatesFilter<"RecipeIngredient"> | string
    image?: StringNullableWithAggregatesFilter<"RecipeIngredient"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecipeCreateInput = {
    id?: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    user: UserCreateNestedOneWithoutUserRecipesInput
    cachedRecipe?: RecipeCreateNestedOneWithoutUserRecipesInput
  }

  export type UserRecipeUncheckedCreateInput = {
    id?: string
    userId: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    cachedRecipeId?: string | null
  }

  export type UserRecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserRecipesNestedInput
    cachedRecipe?: RecipeUpdateOneWithoutUserRecipesNestedInput
  }

  export type UserRecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecipeCreateManyInput = {
    id?: string
    userId: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    cachedRecipeId?: string | null
  }

  export type UserRecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealPlanCreateInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMealPlansInput
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutMealPlanInput
  }

  export type MealPlanUncheckedCreateInput = {
    id?: string
    userId: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutMealPlanInput
  }

  export type MealPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMealPlansNestedInput
    mealPlanItems?: MealPlanItemUpdateManyWithoutMealPlanNestedInput
  }

  export type MealPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutMealPlanNestedInput
  }

  export type MealPlanCreateManyInput = {
    id?: string
    userId: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MealPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealPlanItemCreateInput = {
    id?: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    mealPlan: MealPlanCreateNestedOneWithoutMealPlanItemsInput
    cachedRecipe?: RecipeCreateNestedOneWithoutMealPlanItemsInput
  }

  export type MealPlanItemUncheckedCreateInput = {
    id?: string
    mealPlanId: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipeId?: string | null
  }

  export type MealPlanItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    mealPlan?: MealPlanUpdateOneRequiredWithoutMealPlanItemsNestedInput
    cachedRecipe?: RecipeUpdateOneWithoutMealPlanItemsNestedInput
  }

  export type MealPlanItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlanId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealPlanItemCreateManyInput = {
    id?: string
    mealPlanId: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipeId?: string | null
  }

  export type MealPlanItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
  }

  export type MealPlanItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlanId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProgressCreateInput = {
    id?: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutProgressInput
  }

  export type ProgressUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type ProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProgressNestedInput
  }

  export type ProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type ProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeCreateInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    createdBy?: UserCreateNestedOneWithoutRecipesInput
    userRecipes?: UserRecipeCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    createdBy?: UserUpdateOneWithoutRecipesNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeIngredientCreateInput = {
    id?: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
    recipe: RecipeCreateNestedOneWithoutIngredientsInput
  }

  export type RecipeIngredientUncheckedCreateInput = {
    id?: string
    recipeId: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
  }

  export type RecipeIngredientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    recipe?: RecipeUpdateOneRequiredWithoutIngredientsNestedInput
  }

  export type RecipeIngredientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeIngredientCreateManyInput = {
    id?: string
    recipeId: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
  }

  export type RecipeIngredientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeIngredientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MealPlanListRelationFilter = {
    every?: MealPlanWhereInput
    some?: MealPlanWhereInput
    none?: MealPlanWhereInput
  }

  export type ProgressListRelationFilter = {
    every?: ProgressWhereInput
    some?: ProgressWhereInput
    none?: ProgressWhereInput
  }

  export type UserRecipeListRelationFilter = {
    every?: UserRecipeWhereInput
    some?: UserRecipeWhereInput
    none?: UserRecipeWhereInput
  }

  export type RecipeListRelationFilter = {
    every?: RecipeWhereInput
    some?: RecipeWhereInput
    none?: RecipeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MealPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityLevel?: SortOrder
    height?: SortOrder
    diet_preference?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityLevel?: SortOrder
    height?: SortOrder
    diet_preference?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    age?: SortOrder
    weight?: SortOrder
    goals?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activityLevel?: SortOrder
    height?: SortOrder
    diet_preference?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    age?: SortOrder
    weight?: SortOrder
    height?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RecipeNullableScalarRelationFilter = {
    is?: RecipeWhereInput | null
    isNot?: RecipeWhereInput | null
  }

  export type UserRecipeUserIdSourceIdStatusCompoundUniqueInput = {
    userId: string
    sourceId: string
    status: string
  }

  export type UserRecipeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    status?: SortOrder
    dateAdded?: SortOrder
    cachedRecipeId?: SortOrder
  }

  export type UserRecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    status?: SortOrder
    dateAdded?: SortOrder
    cachedRecipeId?: SortOrder
  }

  export type UserRecipeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    status?: SortOrder
    dateAdded?: SortOrder
    cachedRecipeId?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MealPlanItemListRelationFilter = {
    every?: MealPlanItemWhereInput
    some?: MealPlanItemWhereInput
    none?: MealPlanItemWhereInput
  }

  export type MealPlanItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MealPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    constraints?: SortOrder
    createdAt?: SortOrder
  }

  export type MealPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
  }

  export type MealPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MealPlanScalarRelationFilter = {
    is?: MealPlanWhereInput
    isNot?: MealPlanWhereInput
  }

  export type MealPlanItemMealPlanIdDayOfWeekMealTypeCompoundUniqueInput = {
    mealPlanId: string
    dayOfWeek: number
    mealType: string
  }

  export type MealPlanItemCountOrderByAggregateInput = {
    id?: SortOrder
    mealPlanId?: SortOrder
    sourceId?: SortOrder
    dayOfWeek?: SortOrder
    mealType?: SortOrder
    cachedRecipeId?: SortOrder
  }

  export type MealPlanItemAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type MealPlanItemMaxOrderByAggregateInput = {
    id?: SortOrder
    mealPlanId?: SortOrder
    sourceId?: SortOrder
    dayOfWeek?: SortOrder
    mealType?: SortOrder
    cachedRecipeId?: SortOrder
  }

  export type MealPlanItemMinOrderByAggregateInput = {
    id?: SortOrder
    mealPlanId?: SortOrder
    sourceId?: SortOrder
    dayOfWeek?: SortOrder
    mealType?: SortOrder
    cachedRecipeId?: SortOrder
  }

  export type MealPlanItemSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    caloriesConsumed?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgressAvgOrderByAggregateInput = {
    weight?: SortOrder
    caloriesConsumed?: SortOrder
  }

  export type ProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    caloriesConsumed?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    caloriesConsumed?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgressSumOrderByAggregateInput = {
    weight?: SortOrder
    caloriesConsumed?: SortOrder
  }

  export type EnumRecipeSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeSourceType | EnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeSourceTypeFilter<$PrismaModel> | $Enums.RecipeSourceType
  }

  export type EnumRecipeDifficultyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeDifficulty | EnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel> | $Enums.RecipeDifficulty | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RecipeIngredientListRelationFilter = {
    every?: RecipeIngredientWhereInput
    some?: RecipeIngredientWhereInput
    none?: RecipeIngredientWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RecipeIngredientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    fallbackImageUrl?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    cuisine?: SortOrder
    mealType?: SortOrder
    difficulty?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    totalTime?: SortOrder
    servings?: SortOrder
    instructions?: SortOrder
    nutrition?: SortOrder
    tags?: SortOrder
    namedEntities?: SortOrder
    userRating?: SortOrder
    savedCount?: SortOrder
    isPublic?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeAvgOrderByAggregateInput = {
    prepTime?: SortOrder
    cookTime?: SortOrder
    totalTime?: SortOrder
    servings?: SortOrder
    userRating?: SortOrder
    savedCount?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    fallbackImageUrl?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    cuisine?: SortOrder
    mealType?: SortOrder
    difficulty?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    totalTime?: SortOrder
    servings?: SortOrder
    userRating?: SortOrder
    savedCount?: SortOrder
    isPublic?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    fallbackImageUrl?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    sourceUrl?: SortOrder
    cuisine?: SortOrder
    mealType?: SortOrder
    difficulty?: SortOrder
    prepTime?: SortOrder
    cookTime?: SortOrder
    totalTime?: SortOrder
    servings?: SortOrder
    userRating?: SortOrder
    savedCount?: SortOrder
    isPublic?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeSumOrderByAggregateInput = {
    prepTime?: SortOrder
    cookTime?: SortOrder
    totalTime?: SortOrder
    servings?: SortOrder
    userRating?: SortOrder
    savedCount?: SortOrder
  }

  export type EnumRecipeSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeSourceType | EnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecipeSourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecipeSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumRecipeSourceTypeFilter<$PrismaModel>
  }

  export type EnumRecipeDifficultyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeDifficulty | EnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecipeDifficultyNullableWithAggregatesFilter<$PrismaModel> | $Enums.RecipeDifficulty | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel>
    _max?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RecipeScalarRelationFilter = {
    is?: RecipeWhereInput
    isNot?: RecipeWhereInput
  }

  export type RecipeIngredientCountOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    ingredientId?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    unit?: SortOrder
    original?: SortOrder
    image?: SortOrder
  }

  export type RecipeIngredientAvgOrderByAggregateInput = {
    ingredientId?: SortOrder
    amount?: SortOrder
  }

  export type RecipeIngredientMaxOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    ingredientId?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    unit?: SortOrder
    original?: SortOrder
    image?: SortOrder
  }

  export type RecipeIngredientMinOrderByAggregateInput = {
    id?: SortOrder
    recipeId?: SortOrder
    ingredientId?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    unit?: SortOrder
    original?: SortOrder
    image?: SortOrder
  }

  export type RecipeIngredientSumOrderByAggregateInput = {
    ingredientId?: SortOrder
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type MealPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput> | MealPlanCreateWithoutUserInput[] | MealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealPlanCreateOrConnectWithoutUserInput | MealPlanCreateOrConnectWithoutUserInput[]
    createMany?: MealPlanCreateManyUserInputEnvelope
    connect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
  }

  export type ProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput> | ProgressCreateWithoutUserInput[] | ProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutUserInput | ProgressCreateOrConnectWithoutUserInput[]
    createMany?: ProgressCreateManyUserInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type UserRecipeCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput> | UserRecipeCreateWithoutUserInput[] | UserRecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutUserInput | UserRecipeCreateOrConnectWithoutUserInput[]
    createMany?: UserRecipeCreateManyUserInputEnvelope
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
  }

  export type RecipeCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput> | RecipeCreateWithoutCreatedByInput[] | RecipeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutCreatedByInput | RecipeCreateOrConnectWithoutCreatedByInput[]
    createMany?: RecipeCreateManyCreatedByInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type MealPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput> | MealPlanCreateWithoutUserInput[] | MealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealPlanCreateOrConnectWithoutUserInput | MealPlanCreateOrConnectWithoutUserInput[]
    createMany?: MealPlanCreateManyUserInputEnvelope
    connect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
  }

  export type ProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput> | ProgressCreateWithoutUserInput[] | ProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutUserInput | ProgressCreateOrConnectWithoutUserInput[]
    createMany?: ProgressCreateManyUserInputEnvelope
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
  }

  export type UserRecipeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput> | UserRecipeCreateWithoutUserInput[] | UserRecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutUserInput | UserRecipeCreateOrConnectWithoutUserInput[]
    createMany?: UserRecipeCreateManyUserInputEnvelope
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
  }

  export type RecipeUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput> | RecipeCreateWithoutCreatedByInput[] | RecipeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutCreatedByInput | RecipeCreateOrConnectWithoutCreatedByInput[]
    createMany?: RecipeCreateManyCreatedByInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MealPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput> | MealPlanCreateWithoutUserInput[] | MealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealPlanCreateOrConnectWithoutUserInput | MealPlanCreateOrConnectWithoutUserInput[]
    upsert?: MealPlanUpsertWithWhereUniqueWithoutUserInput | MealPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealPlanCreateManyUserInputEnvelope
    set?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    disconnect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    delete?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    connect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    update?: MealPlanUpdateWithWhereUniqueWithoutUserInput | MealPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealPlanUpdateManyWithWhereWithoutUserInput | MealPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealPlanScalarWhereInput | MealPlanScalarWhereInput[]
  }

  export type ProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput> | ProgressCreateWithoutUserInput[] | ProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutUserInput | ProgressCreateOrConnectWithoutUserInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutUserInput | ProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgressCreateManyUserInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutUserInput | ProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutUserInput | ProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type UserRecipeUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput> | UserRecipeCreateWithoutUserInput[] | UserRecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutUserInput | UserRecipeCreateOrConnectWithoutUserInput[]
    upsert?: UserRecipeUpsertWithWhereUniqueWithoutUserInput | UserRecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRecipeCreateManyUserInputEnvelope
    set?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    disconnect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    delete?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    update?: UserRecipeUpdateWithWhereUniqueWithoutUserInput | UserRecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRecipeUpdateManyWithWhereWithoutUserInput | UserRecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
  }

  export type RecipeUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput> | RecipeCreateWithoutCreatedByInput[] | RecipeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutCreatedByInput | RecipeCreateOrConnectWithoutCreatedByInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutCreatedByInput | RecipeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: RecipeCreateManyCreatedByInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutCreatedByInput | RecipeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutCreatedByInput | RecipeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type MealPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput> | MealPlanCreateWithoutUserInput[] | MealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MealPlanCreateOrConnectWithoutUserInput | MealPlanCreateOrConnectWithoutUserInput[]
    upsert?: MealPlanUpsertWithWhereUniqueWithoutUserInput | MealPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MealPlanCreateManyUserInputEnvelope
    set?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    disconnect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    delete?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    connect?: MealPlanWhereUniqueInput | MealPlanWhereUniqueInput[]
    update?: MealPlanUpdateWithWhereUniqueWithoutUserInput | MealPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MealPlanUpdateManyWithWhereWithoutUserInput | MealPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MealPlanScalarWhereInput | MealPlanScalarWhereInput[]
  }

  export type ProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput> | ProgressCreateWithoutUserInput[] | ProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProgressCreateOrConnectWithoutUserInput | ProgressCreateOrConnectWithoutUserInput[]
    upsert?: ProgressUpsertWithWhereUniqueWithoutUserInput | ProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProgressCreateManyUserInputEnvelope
    set?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    disconnect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    delete?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    connect?: ProgressWhereUniqueInput | ProgressWhereUniqueInput[]
    update?: ProgressUpdateWithWhereUniqueWithoutUserInput | ProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProgressUpdateManyWithWhereWithoutUserInput | ProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
  }

  export type UserRecipeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput> | UserRecipeCreateWithoutUserInput[] | UserRecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutUserInput | UserRecipeCreateOrConnectWithoutUserInput[]
    upsert?: UserRecipeUpsertWithWhereUniqueWithoutUserInput | UserRecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRecipeCreateManyUserInputEnvelope
    set?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    disconnect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    delete?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    update?: UserRecipeUpdateWithWhereUniqueWithoutUserInput | UserRecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRecipeUpdateManyWithWhereWithoutUserInput | UserRecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
  }

  export type RecipeUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput> | RecipeCreateWithoutCreatedByInput[] | RecipeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutCreatedByInput | RecipeCreateOrConnectWithoutCreatedByInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutCreatedByInput | RecipeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: RecipeCreateManyCreatedByInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutCreatedByInput | RecipeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutCreatedByInput | RecipeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserRecipesInput = {
    create?: XOR<UserCreateWithoutUserRecipesInput, UserUncheckedCreateWithoutUserRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRecipesInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutUserRecipesInput = {
    create?: XOR<RecipeCreateWithoutUserRecipesInput, RecipeUncheckedCreateWithoutUserRecipesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutUserRecipesInput
    connect?: RecipeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserRecipesNestedInput = {
    create?: XOR<UserCreateWithoutUserRecipesInput, UserUncheckedCreateWithoutUserRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRecipesInput
    upsert?: UserUpsertWithoutUserRecipesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserRecipesInput, UserUpdateWithoutUserRecipesInput>, UserUncheckedUpdateWithoutUserRecipesInput>
  }

  export type RecipeUpdateOneWithoutUserRecipesNestedInput = {
    create?: XOR<RecipeCreateWithoutUserRecipesInput, RecipeUncheckedCreateWithoutUserRecipesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutUserRecipesInput
    upsert?: RecipeUpsertWithoutUserRecipesInput
    disconnect?: RecipeWhereInput | boolean
    delete?: RecipeWhereInput | boolean
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutUserRecipesInput, RecipeUpdateWithoutUserRecipesInput>, RecipeUncheckedUpdateWithoutUserRecipesInput>
  }

  export type UserCreateNestedOneWithoutMealPlansInput = {
    create?: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealPlansInput
    connect?: UserWhereUniqueInput
  }

  export type MealPlanItemCreateNestedManyWithoutMealPlanInput = {
    create?: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput> | MealPlanItemCreateWithoutMealPlanInput[] | MealPlanItemUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutMealPlanInput | MealPlanItemCreateOrConnectWithoutMealPlanInput[]
    createMany?: MealPlanItemCreateManyMealPlanInputEnvelope
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
  }

  export type MealPlanItemUncheckedCreateNestedManyWithoutMealPlanInput = {
    create?: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput> | MealPlanItemCreateWithoutMealPlanInput[] | MealPlanItemUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutMealPlanInput | MealPlanItemCreateOrConnectWithoutMealPlanInput[]
    createMany?: MealPlanItemCreateManyMealPlanInputEnvelope
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMealPlansNestedInput = {
    create?: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealPlansInput
    upsert?: UserUpsertWithoutMealPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMealPlansInput, UserUpdateWithoutMealPlansInput>, UserUncheckedUpdateWithoutMealPlansInput>
  }

  export type MealPlanItemUpdateManyWithoutMealPlanNestedInput = {
    create?: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput> | MealPlanItemCreateWithoutMealPlanInput[] | MealPlanItemUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutMealPlanInput | MealPlanItemCreateOrConnectWithoutMealPlanInput[]
    upsert?: MealPlanItemUpsertWithWhereUniqueWithoutMealPlanInput | MealPlanItemUpsertWithWhereUniqueWithoutMealPlanInput[]
    createMany?: MealPlanItemCreateManyMealPlanInputEnvelope
    set?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    disconnect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    delete?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    update?: MealPlanItemUpdateWithWhereUniqueWithoutMealPlanInput | MealPlanItemUpdateWithWhereUniqueWithoutMealPlanInput[]
    updateMany?: MealPlanItemUpdateManyWithWhereWithoutMealPlanInput | MealPlanItemUpdateManyWithWhereWithoutMealPlanInput[]
    deleteMany?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
  }

  export type MealPlanItemUncheckedUpdateManyWithoutMealPlanNestedInput = {
    create?: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput> | MealPlanItemCreateWithoutMealPlanInput[] | MealPlanItemUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutMealPlanInput | MealPlanItemCreateOrConnectWithoutMealPlanInput[]
    upsert?: MealPlanItemUpsertWithWhereUniqueWithoutMealPlanInput | MealPlanItemUpsertWithWhereUniqueWithoutMealPlanInput[]
    createMany?: MealPlanItemCreateManyMealPlanInputEnvelope
    set?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    disconnect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    delete?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    update?: MealPlanItemUpdateWithWhereUniqueWithoutMealPlanInput | MealPlanItemUpdateWithWhereUniqueWithoutMealPlanInput[]
    updateMany?: MealPlanItemUpdateManyWithWhereWithoutMealPlanInput | MealPlanItemUpdateManyWithWhereWithoutMealPlanInput[]
    deleteMany?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
  }

  export type MealPlanCreateNestedOneWithoutMealPlanItemsInput = {
    create?: XOR<MealPlanCreateWithoutMealPlanItemsInput, MealPlanUncheckedCreateWithoutMealPlanItemsInput>
    connectOrCreate?: MealPlanCreateOrConnectWithoutMealPlanItemsInput
    connect?: MealPlanWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutMealPlanItemsInput = {
    create?: XOR<RecipeCreateWithoutMealPlanItemsInput, RecipeUncheckedCreateWithoutMealPlanItemsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutMealPlanItemsInput
    connect?: RecipeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MealPlanUpdateOneRequiredWithoutMealPlanItemsNestedInput = {
    create?: XOR<MealPlanCreateWithoutMealPlanItemsInput, MealPlanUncheckedCreateWithoutMealPlanItemsInput>
    connectOrCreate?: MealPlanCreateOrConnectWithoutMealPlanItemsInput
    upsert?: MealPlanUpsertWithoutMealPlanItemsInput
    connect?: MealPlanWhereUniqueInput
    update?: XOR<XOR<MealPlanUpdateToOneWithWhereWithoutMealPlanItemsInput, MealPlanUpdateWithoutMealPlanItemsInput>, MealPlanUncheckedUpdateWithoutMealPlanItemsInput>
  }

  export type RecipeUpdateOneWithoutMealPlanItemsNestedInput = {
    create?: XOR<RecipeCreateWithoutMealPlanItemsInput, RecipeUncheckedCreateWithoutMealPlanItemsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutMealPlanItemsInput
    upsert?: RecipeUpsertWithoutMealPlanItemsInput
    disconnect?: RecipeWhereInput | boolean
    delete?: RecipeWhereInput | boolean
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutMealPlanItemsInput, RecipeUpdateWithoutMealPlanItemsInput>, RecipeUncheckedUpdateWithoutMealPlanItemsInput>
  }

  export type UserCreateNestedOneWithoutProgressInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProgressNestedInput = {
    create?: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutProgressInput
    upsert?: UserUpsertWithoutProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProgressInput, UserUpdateWithoutProgressInput>, UserUncheckedUpdateWithoutProgressInput>
  }

  export type RecipeCreateinstructionsInput = {
    set: string[]
  }

  export type RecipeCreatetagsInput = {
    set: string[]
  }

  export type RecipeCreatenamedEntitiesInput = {
    set: string[]
  }

  export type RecipeIngredientCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    connect?: UserWhereUniqueInput
  }

  export type UserRecipeCreateNestedManyWithoutCachedRecipeInput = {
    create?: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput> | UserRecipeCreateWithoutCachedRecipeInput[] | UserRecipeUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutCachedRecipeInput | UserRecipeCreateOrConnectWithoutCachedRecipeInput[]
    createMany?: UserRecipeCreateManyCachedRecipeInputEnvelope
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
  }

  export type MealPlanItemCreateNestedManyWithoutCachedRecipeInput = {
    create?: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput> | MealPlanItemCreateWithoutCachedRecipeInput[] | MealPlanItemUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutCachedRecipeInput | MealPlanItemCreateOrConnectWithoutCachedRecipeInput[]
    createMany?: MealPlanItemCreateManyCachedRecipeInputEnvelope
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
  }

  export type RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
  }

  export type UserRecipeUncheckedCreateNestedManyWithoutCachedRecipeInput = {
    create?: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput> | UserRecipeCreateWithoutCachedRecipeInput[] | UserRecipeUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutCachedRecipeInput | UserRecipeCreateOrConnectWithoutCachedRecipeInput[]
    createMany?: UserRecipeCreateManyCachedRecipeInputEnvelope
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
  }

  export type MealPlanItemUncheckedCreateNestedManyWithoutCachedRecipeInput = {
    create?: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput> | MealPlanItemCreateWithoutCachedRecipeInput[] | MealPlanItemUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutCachedRecipeInput | MealPlanItemCreateOrConnectWithoutCachedRecipeInput[]
    createMany?: MealPlanItemCreateManyCachedRecipeInputEnvelope
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
  }

  export type EnumRecipeSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.RecipeSourceType
  }

  export type NullableEnumRecipeDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.RecipeDifficulty | null
  }

  export type RecipeUpdateinstructionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecipeUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecipeUpdatenamedEntitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RecipeIngredientUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutRecipeInput | RecipeIngredientUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type UserUpdateOneWithoutRecipesNestedInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    upsert?: UserUpsertWithoutRecipesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecipesInput, UserUpdateWithoutRecipesInput>, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type UserRecipeUpdateManyWithoutCachedRecipeNestedInput = {
    create?: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput> | UserRecipeCreateWithoutCachedRecipeInput[] | UserRecipeUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutCachedRecipeInput | UserRecipeCreateOrConnectWithoutCachedRecipeInput[]
    upsert?: UserRecipeUpsertWithWhereUniqueWithoutCachedRecipeInput | UserRecipeUpsertWithWhereUniqueWithoutCachedRecipeInput[]
    createMany?: UserRecipeCreateManyCachedRecipeInputEnvelope
    set?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    disconnect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    delete?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    update?: UserRecipeUpdateWithWhereUniqueWithoutCachedRecipeInput | UserRecipeUpdateWithWhereUniqueWithoutCachedRecipeInput[]
    updateMany?: UserRecipeUpdateManyWithWhereWithoutCachedRecipeInput | UserRecipeUpdateManyWithWhereWithoutCachedRecipeInput[]
    deleteMany?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
  }

  export type MealPlanItemUpdateManyWithoutCachedRecipeNestedInput = {
    create?: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput> | MealPlanItemCreateWithoutCachedRecipeInput[] | MealPlanItemUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutCachedRecipeInput | MealPlanItemCreateOrConnectWithoutCachedRecipeInput[]
    upsert?: MealPlanItemUpsertWithWhereUniqueWithoutCachedRecipeInput | MealPlanItemUpsertWithWhereUniqueWithoutCachedRecipeInput[]
    createMany?: MealPlanItemCreateManyCachedRecipeInputEnvelope
    set?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    disconnect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    delete?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    update?: MealPlanItemUpdateWithWhereUniqueWithoutCachedRecipeInput | MealPlanItemUpdateWithWhereUniqueWithoutCachedRecipeInput[]
    updateMany?: MealPlanItemUpdateManyWithWhereWithoutCachedRecipeInput | MealPlanItemUpdateManyWithWhereWithoutCachedRecipeInput[]
    deleteMany?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput> | RecipeIngredientCreateWithoutRecipeInput[] | RecipeIngredientUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeIngredientCreateOrConnectWithoutRecipeInput | RecipeIngredientCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeIngredientCreateManyRecipeInputEnvelope
    set?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    disconnect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    delete?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    connect?: RecipeIngredientWhereUniqueInput | RecipeIngredientWhereUniqueInput[]
    update?: RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput | RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeIngredientUpdateManyWithWhereWithoutRecipeInput | RecipeIngredientUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
  }

  export type UserRecipeUncheckedUpdateManyWithoutCachedRecipeNestedInput = {
    create?: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput> | UserRecipeCreateWithoutCachedRecipeInput[] | UserRecipeUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: UserRecipeCreateOrConnectWithoutCachedRecipeInput | UserRecipeCreateOrConnectWithoutCachedRecipeInput[]
    upsert?: UserRecipeUpsertWithWhereUniqueWithoutCachedRecipeInput | UserRecipeUpsertWithWhereUniqueWithoutCachedRecipeInput[]
    createMany?: UserRecipeCreateManyCachedRecipeInputEnvelope
    set?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    disconnect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    delete?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    connect?: UserRecipeWhereUniqueInput | UserRecipeWhereUniqueInput[]
    update?: UserRecipeUpdateWithWhereUniqueWithoutCachedRecipeInput | UserRecipeUpdateWithWhereUniqueWithoutCachedRecipeInput[]
    updateMany?: UserRecipeUpdateManyWithWhereWithoutCachedRecipeInput | UserRecipeUpdateManyWithWhereWithoutCachedRecipeInput[]
    deleteMany?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
  }

  export type MealPlanItemUncheckedUpdateManyWithoutCachedRecipeNestedInput = {
    create?: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput> | MealPlanItemCreateWithoutCachedRecipeInput[] | MealPlanItemUncheckedCreateWithoutCachedRecipeInput[]
    connectOrCreate?: MealPlanItemCreateOrConnectWithoutCachedRecipeInput | MealPlanItemCreateOrConnectWithoutCachedRecipeInput[]
    upsert?: MealPlanItemUpsertWithWhereUniqueWithoutCachedRecipeInput | MealPlanItemUpsertWithWhereUniqueWithoutCachedRecipeInput[]
    createMany?: MealPlanItemCreateManyCachedRecipeInputEnvelope
    set?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    disconnect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    delete?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    connect?: MealPlanItemWhereUniqueInput | MealPlanItemWhereUniqueInput[]
    update?: MealPlanItemUpdateWithWhereUniqueWithoutCachedRecipeInput | MealPlanItemUpdateWithWhereUniqueWithoutCachedRecipeInput[]
    updateMany?: MealPlanItemUpdateManyWithWhereWithoutCachedRecipeInput | MealPlanItemUpdateManyWithWhereWithoutCachedRecipeInput[]
    deleteMany?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
  }

  export type RecipeCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutIngredientsInput
    connect?: RecipeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RecipeUpdateOneRequiredWithoutIngredientsNestedInput = {
    create?: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutIngredientsInput
    upsert?: RecipeUpsertWithoutIngredientsInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutIngredientsInput, RecipeUpdateWithoutIngredientsInput>, RecipeUncheckedUpdateWithoutIngredientsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRecipeSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeSourceType | EnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeSourceTypeFilter<$PrismaModel> | $Enums.RecipeSourceType
  }

  export type NestedEnumRecipeDifficultyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeDifficulty | EnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel> | $Enums.RecipeDifficulty | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRecipeSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeSourceType | EnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecipeSourceType[] | ListEnumRecipeSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRecipeSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RecipeSourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecipeSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumRecipeSourceTypeFilter<$PrismaModel>
  }

  export type NestedEnumRecipeDifficultyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecipeDifficulty | EnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecipeDifficulty[] | ListEnumRecipeDifficultyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecipeDifficultyNullableWithAggregatesFilter<$PrismaModel> | $Enums.RecipeDifficulty | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel>
    _max?: NestedEnumRecipeDifficultyNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type MealPlanCreateWithoutUserInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutMealPlanInput
  }

  export type MealPlanUncheckedCreateWithoutUserInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutMealPlanInput
  }

  export type MealPlanCreateOrConnectWithoutUserInput = {
    where: MealPlanWhereUniqueInput
    create: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput>
  }

  export type MealPlanCreateManyUserInputEnvelope = {
    data: MealPlanCreateManyUserInput | MealPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProgressCreateWithoutUserInput = {
    id?: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type ProgressUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type ProgressCreateOrConnectWithoutUserInput = {
    where: ProgressWhereUniqueInput
    create: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput>
  }

  export type ProgressCreateManyUserInputEnvelope = {
    data: ProgressCreateManyUserInput | ProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserRecipeCreateWithoutUserInput = {
    id?: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    cachedRecipe?: RecipeCreateNestedOneWithoutUserRecipesInput
  }

  export type UserRecipeUncheckedCreateWithoutUserInput = {
    id?: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    cachedRecipeId?: string | null
  }

  export type UserRecipeCreateOrConnectWithoutUserInput = {
    where: UserRecipeWhereUniqueInput
    create: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput>
  }

  export type UserRecipeCreateManyUserInputEnvelope = {
    data: UserRecipeCreateManyUserInput | UserRecipeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    userRecipes?: UserRecipeCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeCreateOrConnectWithoutCreatedByInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput>
  }

  export type RecipeCreateManyCreatedByInputEnvelope = {
    data: RecipeCreateManyCreatedByInput | RecipeCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type MealPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: MealPlanWhereUniqueInput
    update: XOR<MealPlanUpdateWithoutUserInput, MealPlanUncheckedUpdateWithoutUserInput>
    create: XOR<MealPlanCreateWithoutUserInput, MealPlanUncheckedCreateWithoutUserInput>
  }

  export type MealPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: MealPlanWhereUniqueInput
    data: XOR<MealPlanUpdateWithoutUserInput, MealPlanUncheckedUpdateWithoutUserInput>
  }

  export type MealPlanUpdateManyWithWhereWithoutUserInput = {
    where: MealPlanScalarWhereInput
    data: XOR<MealPlanUpdateManyMutationInput, MealPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type MealPlanScalarWhereInput = {
    AND?: MealPlanScalarWhereInput | MealPlanScalarWhereInput[]
    OR?: MealPlanScalarWhereInput[]
    NOT?: MealPlanScalarWhereInput | MealPlanScalarWhereInput[]
    id?: StringFilter<"MealPlan"> | string
    userId?: StringFilter<"MealPlan"> | string
    startDate?: DateTimeFilter<"MealPlan"> | Date | string
    endDate?: DateTimeFilter<"MealPlan"> | Date | string
    constraints?: JsonNullableFilter<"MealPlan">
    createdAt?: DateTimeFilter<"MealPlan"> | Date | string
  }

  export type ProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: ProgressWhereUniqueInput
    update: XOR<ProgressUpdateWithoutUserInput, ProgressUncheckedUpdateWithoutUserInput>
    create: XOR<ProgressCreateWithoutUserInput, ProgressUncheckedCreateWithoutUserInput>
  }

  export type ProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: ProgressWhereUniqueInput
    data: XOR<ProgressUpdateWithoutUserInput, ProgressUncheckedUpdateWithoutUserInput>
  }

  export type ProgressUpdateManyWithWhereWithoutUserInput = {
    where: ProgressScalarWhereInput
    data: XOR<ProgressUpdateManyMutationInput, ProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type ProgressScalarWhereInput = {
    AND?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
    OR?: ProgressScalarWhereInput[]
    NOT?: ProgressScalarWhereInput | ProgressScalarWhereInput[]
    id?: StringFilter<"Progress"> | string
    userId?: StringFilter<"Progress"> | string
    date?: DateTimeFilter<"Progress"> | Date | string
    weight?: FloatNullableFilter<"Progress"> | number | null
    caloriesConsumed?: IntNullableFilter<"Progress"> | number | null
    notes?: StringNullableFilter<"Progress"> | string | null
    createdAt?: DateTimeFilter<"Progress"> | Date | string
  }

  export type UserRecipeUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRecipeWhereUniqueInput
    update: XOR<UserRecipeUpdateWithoutUserInput, UserRecipeUncheckedUpdateWithoutUserInput>
    create: XOR<UserRecipeCreateWithoutUserInput, UserRecipeUncheckedCreateWithoutUserInput>
  }

  export type UserRecipeUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRecipeWhereUniqueInput
    data: XOR<UserRecipeUpdateWithoutUserInput, UserRecipeUncheckedUpdateWithoutUserInput>
  }

  export type UserRecipeUpdateManyWithWhereWithoutUserInput = {
    where: UserRecipeScalarWhereInput
    data: XOR<UserRecipeUpdateManyMutationInput, UserRecipeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRecipeScalarWhereInput = {
    AND?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
    OR?: UserRecipeScalarWhereInput[]
    NOT?: UserRecipeScalarWhereInput | UserRecipeScalarWhereInput[]
    id?: StringFilter<"UserRecipe"> | string
    userId?: StringFilter<"UserRecipe"> | string
    sourceId?: StringNullableFilter<"UserRecipe"> | string | null
    status?: StringFilter<"UserRecipe"> | string
    dateAdded?: DateTimeFilter<"UserRecipe"> | Date | string
    cachedRecipeId?: StringNullableFilter<"UserRecipe"> | string | null
  }

  export type RecipeUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: RecipeWhereUniqueInput
    update: XOR<RecipeUpdateWithoutCreatedByInput, RecipeUncheckedUpdateWithoutCreatedByInput>
    create: XOR<RecipeCreateWithoutCreatedByInput, RecipeUncheckedCreateWithoutCreatedByInput>
  }

  export type RecipeUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: RecipeWhereUniqueInput
    data: XOR<RecipeUpdateWithoutCreatedByInput, RecipeUncheckedUpdateWithoutCreatedByInput>
  }

  export type RecipeUpdateManyWithWhereWithoutCreatedByInput = {
    where: RecipeScalarWhereInput
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type RecipeScalarWhereInput = {
    AND?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    OR?: RecipeScalarWhereInput[]
    NOT?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    description?: StringNullableFilter<"Recipe"> | string | null
    imageUrl?: StringNullableFilter<"Recipe"> | string | null
    fallbackImageUrl?: StringNullableFilter<"Recipe"> | string | null
    sourceType?: EnumRecipeSourceTypeFilter<"Recipe"> | $Enums.RecipeSourceType
    sourceId?: StringNullableFilter<"Recipe"> | string | null
    sourceUrl?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringNullableFilter<"Recipe"> | string | null
    mealType?: StringNullableFilter<"Recipe"> | string | null
    difficulty?: EnumRecipeDifficultyNullableFilter<"Recipe"> | $Enums.RecipeDifficulty | null
    prepTime?: IntNullableFilter<"Recipe"> | number | null
    cookTime?: IntNullableFilter<"Recipe"> | number | null
    totalTime?: IntNullableFilter<"Recipe"> | number | null
    servings?: IntNullableFilter<"Recipe"> | number | null
    instructions?: StringNullableListFilter<"Recipe">
    nutrition?: JsonNullableFilter<"Recipe">
    tags?: StringNullableListFilter<"Recipe">
    namedEntities?: StringNullableListFilter<"Recipe">
    userRating?: FloatNullableFilter<"Recipe"> | number | null
    savedCount?: IntFilter<"Recipe"> | number
    isPublic?: BoolFilter<"Recipe"> | boolean
    createdById?: StringNullableFilter<"Recipe"> | string | null
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
  }

  export type UserCreateWithoutUserRecipesInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUserRecipesInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUserRecipesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserRecipesInput, UserUncheckedCreateWithoutUserRecipesInput>
  }

  export type RecipeCreateWithoutUserRecipesInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    createdBy?: UserCreateNestedOneWithoutRecipesInput
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUncheckedCreateWithoutUserRecipesInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeCreateOrConnectWithoutUserRecipesInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutUserRecipesInput, RecipeUncheckedCreateWithoutUserRecipesInput>
  }

  export type UserUpsertWithoutUserRecipesInput = {
    update: XOR<UserUpdateWithoutUserRecipesInput, UserUncheckedUpdateWithoutUserRecipesInput>
    create: XOR<UserCreateWithoutUserRecipesInput, UserUncheckedCreateWithoutUserRecipesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserRecipesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserRecipesInput, UserUncheckedUpdateWithoutUserRecipesInput>
  }

  export type UserUpdateWithoutUserRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type RecipeUpsertWithoutUserRecipesInput = {
    update: XOR<RecipeUpdateWithoutUserRecipesInput, RecipeUncheckedUpdateWithoutUserRecipesInput>
    create: XOR<RecipeCreateWithoutUserRecipesInput, RecipeUncheckedCreateWithoutUserRecipesInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutUserRecipesInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutUserRecipesInput, RecipeUncheckedUpdateWithoutUserRecipesInput>
  }

  export type RecipeUpdateWithoutUserRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    createdBy?: UserUpdateOneWithoutRecipesNestedInput
    mealPlanItems?: MealPlanItemUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutUserRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutCachedRecipeNestedInput
  }

  export type UserCreateWithoutMealPlansInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    progress?: ProgressCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutMealPlansInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutMealPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
  }

  export type MealPlanItemCreateWithoutMealPlanInput = {
    id?: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipe?: RecipeCreateNestedOneWithoutMealPlanItemsInput
  }

  export type MealPlanItemUncheckedCreateWithoutMealPlanInput = {
    id?: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipeId?: string | null
  }

  export type MealPlanItemCreateOrConnectWithoutMealPlanInput = {
    where: MealPlanItemWhereUniqueInput
    create: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput>
  }

  export type MealPlanItemCreateManyMealPlanInputEnvelope = {
    data: MealPlanItemCreateManyMealPlanInput | MealPlanItemCreateManyMealPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMealPlansInput = {
    update: XOR<UserUpdateWithoutMealPlansInput, UserUncheckedUpdateWithoutMealPlansInput>
    create: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMealPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMealPlansInput, UserUncheckedUpdateWithoutMealPlansInput>
  }

  export type UserUpdateWithoutMealPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: ProgressUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutMealPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type MealPlanItemUpsertWithWhereUniqueWithoutMealPlanInput = {
    where: MealPlanItemWhereUniqueInput
    update: XOR<MealPlanItemUpdateWithoutMealPlanInput, MealPlanItemUncheckedUpdateWithoutMealPlanInput>
    create: XOR<MealPlanItemCreateWithoutMealPlanInput, MealPlanItemUncheckedCreateWithoutMealPlanInput>
  }

  export type MealPlanItemUpdateWithWhereUniqueWithoutMealPlanInput = {
    where: MealPlanItemWhereUniqueInput
    data: XOR<MealPlanItemUpdateWithoutMealPlanInput, MealPlanItemUncheckedUpdateWithoutMealPlanInput>
  }

  export type MealPlanItemUpdateManyWithWhereWithoutMealPlanInput = {
    where: MealPlanItemScalarWhereInput
    data: XOR<MealPlanItemUpdateManyMutationInput, MealPlanItemUncheckedUpdateManyWithoutMealPlanInput>
  }

  export type MealPlanItemScalarWhereInput = {
    AND?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
    OR?: MealPlanItemScalarWhereInput[]
    NOT?: MealPlanItemScalarWhereInput | MealPlanItemScalarWhereInput[]
    id?: StringFilter<"MealPlanItem"> | string
    mealPlanId?: StringFilter<"MealPlanItem"> | string
    sourceId?: StringNullableFilter<"MealPlanItem"> | string | null
    dayOfWeek?: IntFilter<"MealPlanItem"> | number
    mealType?: StringFilter<"MealPlanItem"> | string
    cachedRecipeId?: StringNullableFilter<"MealPlanItem"> | string | null
  }

  export type MealPlanCreateWithoutMealPlanItemsInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMealPlansInput
  }

  export type MealPlanUncheckedCreateWithoutMealPlanItemsInput = {
    id?: string
    userId: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MealPlanCreateOrConnectWithoutMealPlanItemsInput = {
    where: MealPlanWhereUniqueInput
    create: XOR<MealPlanCreateWithoutMealPlanItemsInput, MealPlanUncheckedCreateWithoutMealPlanItemsInput>
  }

  export type RecipeCreateWithoutMealPlanItemsInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientCreateNestedManyWithoutRecipeInput
    createdBy?: UserCreateNestedOneWithoutRecipesInput
    userRecipes?: UserRecipeCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUncheckedCreateWithoutMealPlanItemsInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ingredients?: RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeCreateOrConnectWithoutMealPlanItemsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutMealPlanItemsInput, RecipeUncheckedCreateWithoutMealPlanItemsInput>
  }

  export type MealPlanUpsertWithoutMealPlanItemsInput = {
    update: XOR<MealPlanUpdateWithoutMealPlanItemsInput, MealPlanUncheckedUpdateWithoutMealPlanItemsInput>
    create: XOR<MealPlanCreateWithoutMealPlanItemsInput, MealPlanUncheckedCreateWithoutMealPlanItemsInput>
    where?: MealPlanWhereInput
  }

  export type MealPlanUpdateToOneWithWhereWithoutMealPlanItemsInput = {
    where?: MealPlanWhereInput
    data: XOR<MealPlanUpdateWithoutMealPlanItemsInput, MealPlanUncheckedUpdateWithoutMealPlanItemsInput>
  }

  export type MealPlanUpdateWithoutMealPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMealPlansNestedInput
  }

  export type MealPlanUncheckedUpdateWithoutMealPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeUpsertWithoutMealPlanItemsInput = {
    update: XOR<RecipeUpdateWithoutMealPlanItemsInput, RecipeUncheckedUpdateWithoutMealPlanItemsInput>
    create: XOR<RecipeCreateWithoutMealPlanItemsInput, RecipeUncheckedCreateWithoutMealPlanItemsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutMealPlanItemsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutMealPlanItemsInput, RecipeUncheckedUpdateWithoutMealPlanItemsInput>
  }

  export type RecipeUpdateWithoutMealPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    createdBy?: UserUpdateOneWithoutRecipesNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutMealPlanItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutCachedRecipeNestedInput
  }

  export type UserCreateWithoutProgressInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeCreateNestedManyWithoutUserInput
    recipes?: RecipeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutProgressInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanUncheckedCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutUserInput
    recipes?: RecipeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
  }

  export type UserUpsertWithoutProgressInput = {
    update: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
    create: XOR<UserCreateWithoutProgressInput, UserUncheckedCreateWithoutProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProgressInput, UserUncheckedUpdateWithoutProgressInput>
  }

  export type UserUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutUserNestedInput
    recipes?: RecipeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUncheckedUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutUserNestedInput
    recipes?: RecipeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type RecipeIngredientCreateWithoutRecipeInput = {
    id?: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
  }

  export type RecipeIngredientUncheckedCreateWithoutRecipeInput = {
    id?: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
  }

  export type RecipeIngredientCreateOrConnectWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    create: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeIngredientCreateManyRecipeInputEnvelope = {
    data: RecipeIngredientCreateManyRecipeInput | RecipeIngredientCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutRecipesInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanCreateNestedManyWithoutUserInput
    progress?: ProgressCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecipesInput = {
    id?: string
    clerkId: string
    email: string
    name?: string | null
    age?: number | null
    weight?: number | null
    goals?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLevel?: string | null
    height?: number | null
    diet_preference?: string | null
    mealPlans?: MealPlanUncheckedCreateNestedManyWithoutUserInput
    progress?: ProgressUncheckedCreateNestedManyWithoutUserInput
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecipesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
  }

  export type UserRecipeCreateWithoutCachedRecipeInput = {
    id?: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    user: UserCreateNestedOneWithoutUserRecipesInput
  }

  export type UserRecipeUncheckedCreateWithoutCachedRecipeInput = {
    id?: string
    userId: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
  }

  export type UserRecipeCreateOrConnectWithoutCachedRecipeInput = {
    where: UserRecipeWhereUniqueInput
    create: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput>
  }

  export type UserRecipeCreateManyCachedRecipeInputEnvelope = {
    data: UserRecipeCreateManyCachedRecipeInput | UserRecipeCreateManyCachedRecipeInput[]
    skipDuplicates?: boolean
  }

  export type MealPlanItemCreateWithoutCachedRecipeInput = {
    id?: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    mealPlan: MealPlanCreateNestedOneWithoutMealPlanItemsInput
  }

  export type MealPlanItemUncheckedCreateWithoutCachedRecipeInput = {
    id?: string
    mealPlanId: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
  }

  export type MealPlanItemCreateOrConnectWithoutCachedRecipeInput = {
    where: MealPlanItemWhereUniqueInput
    create: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput>
  }

  export type MealPlanItemCreateManyCachedRecipeInputEnvelope = {
    data: MealPlanItemCreateManyCachedRecipeInput | MealPlanItemCreateManyCachedRecipeInput[]
    skipDuplicates?: boolean
  }

  export type RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    update: XOR<RecipeIngredientUpdateWithoutRecipeInput, RecipeIngredientUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeIngredientCreateWithoutRecipeInput, RecipeIngredientUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeIngredientWhereUniqueInput
    data: XOR<RecipeIngredientUpdateWithoutRecipeInput, RecipeIngredientUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeIngredientUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeIngredientScalarWhereInput
    data: XOR<RecipeIngredientUpdateManyMutationInput, RecipeIngredientUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeIngredientScalarWhereInput = {
    AND?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
    OR?: RecipeIngredientScalarWhereInput[]
    NOT?: RecipeIngredientScalarWhereInput | RecipeIngredientScalarWhereInput[]
    id?: StringFilter<"RecipeIngredient"> | string
    recipeId?: StringFilter<"RecipeIngredient"> | string
    ingredientId?: IntFilter<"RecipeIngredient"> | number
    name?: StringFilter<"RecipeIngredient"> | string
    amount?: FloatFilter<"RecipeIngredient"> | number
    unit?: StringFilter<"RecipeIngredient"> | string
    original?: StringFilter<"RecipeIngredient"> | string
    image?: StringNullableFilter<"RecipeIngredient"> | string | null
  }

  export type UserUpsertWithoutRecipesInput = {
    update: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecipesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type UserUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUpdateManyWithoutUserNestedInput
    progress?: ProgressUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableIntFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    goals?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLevel?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    diet_preference?: NullableStringFieldUpdateOperationsInput | string | null
    mealPlans?: MealPlanUncheckedUpdateManyWithoutUserNestedInput
    progress?: ProgressUncheckedUpdateManyWithoutUserNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserRecipeUpsertWithWhereUniqueWithoutCachedRecipeInput = {
    where: UserRecipeWhereUniqueInput
    update: XOR<UserRecipeUpdateWithoutCachedRecipeInput, UserRecipeUncheckedUpdateWithoutCachedRecipeInput>
    create: XOR<UserRecipeCreateWithoutCachedRecipeInput, UserRecipeUncheckedCreateWithoutCachedRecipeInput>
  }

  export type UserRecipeUpdateWithWhereUniqueWithoutCachedRecipeInput = {
    where: UserRecipeWhereUniqueInput
    data: XOR<UserRecipeUpdateWithoutCachedRecipeInput, UserRecipeUncheckedUpdateWithoutCachedRecipeInput>
  }

  export type UserRecipeUpdateManyWithWhereWithoutCachedRecipeInput = {
    where: UserRecipeScalarWhereInput
    data: XOR<UserRecipeUpdateManyMutationInput, UserRecipeUncheckedUpdateManyWithoutCachedRecipeInput>
  }

  export type MealPlanItemUpsertWithWhereUniqueWithoutCachedRecipeInput = {
    where: MealPlanItemWhereUniqueInput
    update: XOR<MealPlanItemUpdateWithoutCachedRecipeInput, MealPlanItemUncheckedUpdateWithoutCachedRecipeInput>
    create: XOR<MealPlanItemCreateWithoutCachedRecipeInput, MealPlanItemUncheckedCreateWithoutCachedRecipeInput>
  }

  export type MealPlanItemUpdateWithWhereUniqueWithoutCachedRecipeInput = {
    where: MealPlanItemWhereUniqueInput
    data: XOR<MealPlanItemUpdateWithoutCachedRecipeInput, MealPlanItemUncheckedUpdateWithoutCachedRecipeInput>
  }

  export type MealPlanItemUpdateManyWithWhereWithoutCachedRecipeInput = {
    where: MealPlanItemScalarWhereInput
    data: XOR<MealPlanItemUpdateManyMutationInput, MealPlanItemUncheckedUpdateManyWithoutCachedRecipeInput>
  }

  export type RecipeCreateWithoutIngredientsInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutRecipesInput
    userRecipes?: UserRecipeCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeUncheckedCreateWithoutIngredientsInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userRecipes?: UserRecipeUncheckedCreateNestedManyWithoutCachedRecipeInput
    mealPlanItems?: MealPlanItemUncheckedCreateNestedManyWithoutCachedRecipeInput
  }

  export type RecipeCreateOrConnectWithoutIngredientsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
  }

  export type RecipeUpsertWithoutIngredientsInput = {
    update: XOR<RecipeUpdateWithoutIngredientsInput, RecipeUncheckedUpdateWithoutIngredientsInput>
    create: XOR<RecipeCreateWithoutIngredientsInput, RecipeUncheckedCreateWithoutIngredientsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutIngredientsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutIngredientsInput, RecipeUncheckedUpdateWithoutIngredientsInput>
  }

  export type RecipeUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutRecipesNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutCachedRecipeNestedInput
  }

  export type MealPlanCreateManyUserInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgressCreateManyUserInput = {
    id?: string
    date: Date | string
    weight?: number | null
    caloriesConsumed?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type UserRecipeCreateManyUserInput = {
    id?: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
    cachedRecipeId?: string | null
  }

  export type RecipeCreateManyCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    imageUrl?: string | null
    fallbackImageUrl?: string | null
    sourceType: $Enums.RecipeSourceType
    sourceId?: string | null
    sourceUrl?: string | null
    cuisine?: string | null
    mealType?: string | null
    difficulty?: $Enums.RecipeDifficulty | null
    prepTime?: number | null
    cookTime?: number | null
    totalTime?: number | null
    servings?: number | null
    instructions?: RecipeCreateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeCreatetagsInput | string[]
    namedEntities?: RecipeCreatenamedEntitiesInput | string[]
    userRating?: number | null
    savedCount?: number
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MealPlanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanItems?: MealPlanItemUpdateManyWithoutMealPlanNestedInput
  }

  export type MealPlanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutMealPlanNestedInput
  }

  export type MealPlanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    constraints?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    caloriesConsumed?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRecipeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedRecipe?: RecipeUpdateOneWithoutUserRecipesNestedInput
  }

  export type UserRecipeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecipeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUpdateManyWithoutRecipeNestedInput
    userRecipes?: UserRecipeUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ingredients?: RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput
    userRecipes?: UserRecipeUncheckedUpdateManyWithoutCachedRecipeNestedInput
    mealPlanItems?: MealPlanItemUncheckedUpdateManyWithoutCachedRecipeNestedInput
  }

  export type RecipeUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    fallbackImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumRecipeSourceTypeFieldUpdateOperationsInput | $Enums.RecipeSourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: NullableStringFieldUpdateOperationsInput | string | null
    mealType?: NullableStringFieldUpdateOperationsInput | string | null
    difficulty?: NullableEnumRecipeDifficultyFieldUpdateOperationsInput | $Enums.RecipeDifficulty | null
    prepTime?: NullableIntFieldUpdateOperationsInput | number | null
    cookTime?: NullableIntFieldUpdateOperationsInput | number | null
    totalTime?: NullableIntFieldUpdateOperationsInput | number | null
    servings?: NullableIntFieldUpdateOperationsInput | number | null
    instructions?: RecipeUpdateinstructionsInput | string[]
    nutrition?: NullableJsonNullValueInput | InputJsonValue
    tags?: RecipeUpdatetagsInput | string[]
    namedEntities?: RecipeUpdatenamedEntitiesInput | string[]
    userRating?: NullableFloatFieldUpdateOperationsInput | number | null
    savedCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealPlanItemCreateManyMealPlanInput = {
    id?: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
    cachedRecipeId?: string | null
  }

  export type MealPlanItemUpdateWithoutMealPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    cachedRecipe?: RecipeUpdateOneWithoutMealPlanItemsNestedInput
  }

  export type MealPlanItemUncheckedUpdateWithoutMealPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MealPlanItemUncheckedUpdateManyWithoutMealPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    cachedRecipeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeIngredientCreateManyRecipeInput = {
    id?: string
    ingredientId: number
    name: string
    amount: number
    unit: string
    original: string
    image?: string | null
  }

  export type UserRecipeCreateManyCachedRecipeInput = {
    id?: string
    userId: string
    sourceId?: string | null
    status: string
    dateAdded?: Date | string
  }

  export type MealPlanItemCreateManyCachedRecipeInput = {
    id?: string
    mealPlanId: string
    sourceId?: string | null
    dayOfWeek: number
    mealType: string
  }

  export type RecipeIngredientUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeIngredientUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeIngredientUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredientId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    original?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserRecipeUpdateWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserRecipesNestedInput
  }

  export type UserRecipeUncheckedUpdateWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRecipeUncheckedUpdateManyWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    dateAdded?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealPlanItemUpdateWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
    mealPlan?: MealPlanUpdateOneRequiredWithoutMealPlanItemsNestedInput
  }

  export type MealPlanItemUncheckedUpdateWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlanId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
  }

  export type MealPlanItemUncheckedUpdateManyWithoutCachedRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    mealPlanId?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    mealType?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}