import { IHTTPResolverArgMetadata } from '@primitives/metadata/index.ts';
import type { HTTPResolverArgTypeCd } from "@enums/index.ts";
import { ResolverArgMetadata } from "@models/index.ts";

export class HTTPResolverArgMetadata extends ResolverArgMetadata<HTTPResolverArgTypeCd> implements IHTTPResolverArgMetadata {}
