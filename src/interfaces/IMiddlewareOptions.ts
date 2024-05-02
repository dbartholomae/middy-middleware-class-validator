import { ClassType } from "class-transformer-validator";

export interface IDeprecatedMiddlewareOptions<T extends object> {
  classType: ClassType<T>;
}

export interface IBodyMiddlewareOptions<T extends object> {
  bodyClassType: ClassType<T>;
}

export interface IQueryMiddlewareOptions<T extends object> {
  queryClassType: ClassType<T>;
}

export type IMiddlewareOptions<T extends object> =
  | IDeprecatedMiddlewareOptions<T>
  | IQueryMiddlewareOptions<T>
  | IBodyMiddlewareOptions<T>;

export const isMiddlewareOptions = (
  options: any,
): options is IMiddlewareOptions<any> =>
  !!(
    options &&
    (options.classType !== options.bodyClassType ||
      (options.queryClassType && !(options.classType && options.bodyClassType)))
  );
