/**
 * # Class Validator Middleware
 */
/** An additional comment to make sure Typedoc attributes the comment above to the file itself */
import { ClassType, transformAndValidate } from "class-transformer-validator";
import debugFactory, { IDebugger } from "debug";
import middy from "@middy/core";
import {
  IBodyMiddlewareOptions,
  IDeprecatedMiddlewareOptions,
  IMiddlewareOptions,
  IQueryMiddlewareOptions,
} from "./interfaces/IMiddlewareOptions";

/** The actual middleware */
export class ClassValidatorMiddleware<T extends object>
  implements middy.MiddlewareObj<any, any, any>
{
  public static create<S extends object>(
    options: IMiddlewareOptions<S>,
  ): ClassValidatorMiddleware<S> {
    return new ClassValidatorMiddleware(options);
  }

  /** The logger used in the module */
  private readonly logger: IDebugger;

  private readonly bodyClassType: ClassType<T> | undefined;
  private readonly queryClassType: ClassType<T> | undefined;

  /** Creates a new JSON error handler middleware */
  constructor(options: IMiddlewareOptions<T>) {
    this.logger = debugFactory("middy-middleware-class-validator");
    this.logger("Setting up ClassValidatorMiddleware");
    this.bodyClassType =
      (options as IBodyMiddlewareOptions<T>).bodyClassType ||
      (options as IDeprecatedMiddlewareOptions<T>).classType;
    this.queryClassType = (
      options as IQueryMiddlewareOptions<T>
    ).queryClassType;
  }

  public before: middy.MiddlewareFn<any, any> = async (
    handler: middy.Request,
  ) => {
    try {
      if (this.queryClassType) {
        const transformedQuery = await transformAndValidate(
          this.queryClassType,
          (handler.event.queryStringParameters || {}) as object,
        );
        handler.event.queryStringParameters = transformedQuery;
      }

      if (this.bodyClassType) {
        const transformedBody = await transformAndValidate(
          this.bodyClassType,
          handler.event.body as object,
        );
        handler.event.body = transformedBody;
      }
    } catch (error) {
      console.log("---------------------------");

      (error as any).statusCode = 400;
      throw error;
    }
  };
}

export default ClassValidatorMiddleware.create;

export type WithBody<T, B> = Omit<T, "body"> & { body: B };

export type WithQuery<T, B> = T &
  Omit<T, "queryStringParameters"> & { queryStringParameters: B };
