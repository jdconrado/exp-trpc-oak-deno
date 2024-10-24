import { TRPCProcedureType } from '@enums/index.ts';
import type { IResolverArgMetadata } from "@primitives/index.ts";

export interface ITRPCResolverArgMetadata extends IResolverArgMetadata<TRPCProcedureType> {}
