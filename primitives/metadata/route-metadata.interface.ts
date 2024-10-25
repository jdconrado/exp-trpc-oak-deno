import { HttpMethod, RouteType, TRPCProcedureType } from "@enums/index.ts";
export interface IRouteMetadata {
  path: string | null;
  type: RouteType;
  subType: HttpMethod | TRPCProcedureType;
  resolverFn: Function | null;
}
