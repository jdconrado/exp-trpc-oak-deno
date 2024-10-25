import { RouteType, TRPCProcedureType } from "@enums/index.ts";
import { RouteMetadata } from "./route-metadata.model.ts";
import type { ITRPCProcedureMetadata } from "@primitives/index.ts";
import type { ZodType, ZodTypeDef } from "zod";

export class TRPCProcedureMetadata extends RouteMetadata implements ITRPCProcedureMetadata {

  override type: RouteType.TRPC = RouteType.TRPC;
  override subType: TRPCProcedureType;
  outputValidator?: ZodType<unknown, ZodTypeDef, unknown> | undefined;

  constructor(input: {path: string | null, subType: TRPCProcedureType, resolverFn: Function, outputValidator?: ZodType<unknown, ZodTypeDef, unknown>}) {
    super({
      ...input,
      type: RouteType.TRPC,
    });
    this.outputValidator = input.outputValidator;
    this.subType = input.subType;
  }
}