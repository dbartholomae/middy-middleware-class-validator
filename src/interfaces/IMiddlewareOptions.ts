type ClassType<T> = new (...args: any[]) => T

export interface IMiddlewareOptions<T extends object> {
  classType: ClassType<T>
}

export function isMiddlewareOptions (options: any): options is IMiddlewareOptions<any> {
  return !!(options && options.classType)
}
