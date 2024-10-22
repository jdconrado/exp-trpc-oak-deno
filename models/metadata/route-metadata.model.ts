import { IRouteMetadata } from '@primitives/index.ts';
import type { HttpMethod } from "../../enums/http-methods.enum.ts";

export class RouteMetadata implements IRouteMetadata {
  path: string;
  method: HttpMethod;
  resolverFn: Function | null;
  
  constructor(input: {path: string, method: HttpMethod, resolverFn: Function}) {
    this.path = input.path;
    this.method = input.method;
    this.resolverFn = input.resolverFn;
  }
}
