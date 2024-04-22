/**
 * # Class Validator Middleware
 */
/** An additional comment to make sure Typedoc attributes the comment above to the file itself */
import { ClassType, transformAndValidate } from "class-transformer-validator";
import debugFactory, { IDebugger } from "debug";
import middy from "@middy/core";
import { IMiddlewareOptions } from "./interfaces/IMiddlewareOptions";

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

  private readonly classType: ClassType<T>;

  /** Creates a new JSON error handler middleware */
  constructor(options: IMiddlewareOptions<T>) {
    this.logger = debugFactory("middy-middleware-class-validator");
    this.logger("Setting up ClassValidatorMiddleware");
    this.classType = options.classType;
  }

  public before: middy.MiddlewareFn<any, any> = async (
    handler: middy.Request,
  ) => {
    try {
      const transformedBody = await transformAndValidate(
        this.classType,
        handler.event.body as object,
      );
      handler.event.body = transformedBody;
    } catch (error) {
      (error as any).statusCode = 400;
      throw error;
    }
  };
}

export default ClassValidatorMiddleware.create;

export type WithBody<T, B> = Omit<T, "body"> & { body: B };
