import { ZodSchema } from 'zod';
import { HTTPResolverArgTypeCd } from "@enums/index.ts";
import { SetArgMetadata } from "@decorators/helpers/resolver-arg-decorator.helper.ts";
import { HttpMethod, RouteType } from "@enums/index.ts";
import { Route } from "@decorators/route.decorator.ts";

export const ARG_METADATA_KEY = Symbol('ARG_METADATA_KEY');

export const Get = (path: string) => Route(path, RouteType.HTTP, HttpMethod.GET);
export const Post = (path: string) => Route(path, RouteType.HTTP, HttpMethod.POST);
export const Put = (path: string) => Route(path, RouteType.HTTP, HttpMethod.PUT);
export const Delete = (path: string) => Route(path, RouteType.HTTP, HttpMethod.DELETE);
export const Patch = (path: string) => Route(path, RouteType.HTTP, HttpMethod.PATCH);

export const Body = (validator?: ZodSchema<unknown>) => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.BODY, undefined, validator);
export const Query = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.QUERY, name, validator);
export const Param = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.PARAM, name, validator);
export const Header = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.HEADER, name, validator);
export const Req = () => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.REQ);
export const Res = () => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.RES);
export const Ctx = () => SetArgMetadata(ARG_METADATA_KEY, HTTPResolverArgTypeCd.CTX);
