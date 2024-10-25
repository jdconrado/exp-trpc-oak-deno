import type { RouteType, TRPCProcedureType } from "@enums/index.ts";
import { IRouteMetadata } from './route-metadata.interface.ts';
import type { ZodSchema } from "zod";

export interface ITRPCProcedureMetadata extends IRouteMetadata {
  type: RouteType.TRPC;
  subType: TRPCProcedureType;
  outputValidator?: ZodSchema<unknown>;
}