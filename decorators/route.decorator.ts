import { HttpMethod, RouteType, TRPCProcedureType } from "@enums/index.ts";
import { RouteMetadata } from "@models/index.ts";

export const ROUTE_METADATA_KEY = Symbol('ROUTE_METADATA_KEY');

export function Route(path: string, type: RouteType, subType: HttpMethod | TRPCProcedureType) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ROUTE_METADATA_KEY, new RouteMetadata({
      path,
      type,
      subType,
      resolverFn: descriptor.value,
    }), target, propertyKey);
  };
}