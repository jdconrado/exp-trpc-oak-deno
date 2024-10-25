import { RouteType, TRPCProcedureType, TRPCResolverArgTypeCd } from "@enums/index.ts";
import { type ZodSchema } from "zod";
import { SetArgMetadata } from "@decorators/helpers/resolver-arg-decorator.helper.ts";
import { TRPCProcedureMetadata } from '@models/index.ts';

export const TRPC_ARG_METADATA = Symbol('TRPC_ARG_METADATA');
export const TRPC_PROCEDURE_METADATA = Symbol('TRPC_PROCEDURE_METADATA');

export function Route(path: string | null, subType: TRPCProcedureType, outputValidator?: ZodSchema<unknown>) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(TRPC_PROCEDURE_METADATA, new TRPCProcedureMetadata({
      path,
      subType,
      resolverFn: descriptor.value,
      outputValidator
    }), target, propertyKey);
  };
}

export const TQuery = (name?: string) => Route(name ?? null, TRPCProcedureType.QUERY);
export const TMutation = (name?: string) => Route(name ?? null, TRPCProcedureType.MUTATION);

export const Input = (validator?: ZodSchema<unknown>) => SetArgMetadata(TRPC_ARG_METADATA, TRPCResolverArgTypeCd.INPUT, undefined, validator);
export const TCtx = () => SetArgMetadata(TRPC_ARG_METADATA, TRPCResolverArgTypeCd.CTX);