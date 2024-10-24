import { HttpMethod, RouteType, TRPCProcedureType } from "@enums/index.ts";
export interface IRouteMetadata {
  path: string;
  type: RouteType;
  subType: HttpMethod | TRPCProcedureType;
  resolverFn: Function | null;
}
