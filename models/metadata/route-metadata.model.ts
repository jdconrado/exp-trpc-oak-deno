import { IRouteMetadata } from '@primitives/index.ts';
import type { HttpMethod } from "../../enums/http-methods.enum.ts";
import type { RouteType } from "../../enums/route-type.enum.ts";
import type { TRPCProcedureType } from "@enums/index.ts";

export class RouteMetadata implements IRouteMetadata {
  path: string;
  type: RouteType;
  subType: HttpMethod | TRPCProcedureType;

  resolverFn: Function | null;
  
  constructor(input: {path: string, type: RouteType, subType: HttpMethod | TRPCProcedureType, resolverFn: Function}) {
    this.path = input.path;
    this.subType = input.subType;
    this.resolverFn = input.resolverFn;
    this.type = input.type;
  }

}
