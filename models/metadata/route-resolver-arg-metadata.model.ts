import { IRouteResolverArgMetadata } from "@primitives/metadata/index.ts";
import type { RouteResolverArgTypeCd } from "@enums/index.ts";
import type { ZodSchema } from "zod";

export class RouteResolverArgMetadata implements IRouteResolverArgMetadata {
  typeCd: RouteResolverArgTypeCd;
  index: number;
  name?: string | undefined;
  validator?: ZodSchema<unknown>;
  
  constructor(input: {typeCd: RouteResolverArgTypeCd, index: number, name?: string, validator?: ZodSchema<unknown>}) {
    this.typeCd = input.typeCd;
    this.index = input.index;
    this.name = input.name;
    this.validator = input.validator;
  }
}