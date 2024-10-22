import { HttpMethod } from "@enums/index.ts";
export interface IRouteMetadata {
  path: string;
  method: HttpMethod;
  resolverFn: Function | null;
}
