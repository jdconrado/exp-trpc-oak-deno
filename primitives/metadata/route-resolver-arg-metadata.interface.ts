import type { RouteResolverArgTypeCd } from "@enums/index.ts";
import { ZodSchema } from 'zod';

export interface IRouteResolverArgMetadata {
  typeCd: RouteResolverArgTypeCd;
  index: number;
  name?: string;
  validator?: ZodSchema<unknown>;
}