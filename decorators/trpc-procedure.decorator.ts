import { Route } from "@decorators/route.decorator.ts";
import { RouteType, TRPCProcedureType, TRPCResolverArgTypeCd } from "@enums/index.ts";
import { symbol, type ZodSchema } from "zod";
import { SetArgMetadata } from "@decorators/helpers/resolver-arg-decorator.helper.ts";

export const TRPC_ARG_METADATA = Symbol('TRPC_ARG_METADATA');

export const TQuery = (name: string) => Route(name, RouteType.TRPC, TRPCProcedureType.QUERY);
export const TMutation = (name: string) => Route(name, RouteType.TRPC, TRPCProcedureType.MUTATION);

export const Input = (validator?: ZodSchema<unknown>) => SetArgMetadata(TRPC_ARG_METADATA, TRPCResolverArgTypeCd.INPUT, undefined, validator);
export const TCtx = () => SetArgMetadata(TRPC_ARG_METADATA, TRPCResolverArgTypeCd.CTX);