import { HttpMethod } from "@enums/index.ts";
import { RouteMetadata } from "@models/index.ts";

export const ROUTE_METADATA_KEY = Symbol('ROUTE_METADATA_KEY');

function Route(path: string, method: HttpMethod) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ROUTE_METADATA_KEY, new RouteMetadata({
      path,
      method,
      resolverFn: descriptor.value,
    }), target, propertyKey);
  };
}

export const Get = (path: string) => Route(path, HttpMethod.GET);
export const Post = (path: string) => Route(path, HttpMethod.POST);
export const Put = (path: string) => Route(path, HttpMethod.PUT);
export const Delete = (path: string) => Route(path, HttpMethod.DELETE);
export const Patch = (path: string) => Route(path, HttpMethod.PATCH);