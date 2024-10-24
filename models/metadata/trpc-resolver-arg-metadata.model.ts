import { ITRPCResolverArgMetadata } from '@primitives/index.ts';
import { ResolverArgMetadata } from "@models/metadata/resolver-arg-metadata.model.ts";
import type { TRPCProcedureType } from "@enums/index.ts";

export class TRPCResolverArgMetadata extends ResolverArgMetadata<TRPCProcedureType> implements ITRPCResolverArgMetadata {}