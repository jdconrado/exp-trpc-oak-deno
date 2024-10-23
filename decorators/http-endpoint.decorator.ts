import { ZodSchema } from 'zod';
import { RouteResolverArgTypeCd } from "@enums/index.ts";
import { RouteResolverArgMetadata } from "@models/index.ts";
import { IRouteResolverArgMetadata } from "@primitives/index.ts";

export const ARG_METADATA_KEY = Symbol('ARG_METADATA_KEY');

export function SetArgMetadata(
  typeCd: RouteResolverArgTypeCd,
  name?: string,
  validator?: ZodSchema<unknown>
): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error('SetArgMetadata decorator can only be used on method parameters');
    }
    const argsMetadata: IRouteResolverArgMetadata[] = Reflect.getOwnMetadata(ARG_METADATA_KEY, target, propertyKey) || [];
    argsMetadata.push(new RouteResolverArgMetadata({ typeCd, index: parameterIndex, name, validator }));
    Reflect.defineMetadata(ARG_METADATA_KEY, argsMetadata, target, propertyKey);
  };
}

export const Body = (validator?: ZodSchema<unknown>) => SetArgMetadata(RouteResolverArgTypeCd.BODY, undefined, validator);
export const Query = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(RouteResolverArgTypeCd.QUERY, name, validator);
export const Param = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(RouteResolverArgTypeCd.PARAM, name, validator);
export const Header = (name?: string, validator?: ZodSchema<unknown>) => SetArgMetadata(RouteResolverArgTypeCd.HEADER, name, validator);
export const Req = () => SetArgMetadata(RouteResolverArgTypeCd.REQ);
export const Res = () => SetArgMetadata(RouteResolverArgTypeCd.RES);
export const Ctx = () => SetArgMetadata(RouteResolverArgTypeCd.CTX);
