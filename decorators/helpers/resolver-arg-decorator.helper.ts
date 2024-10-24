import type { ZodSchema } from "zod";
import type { IResolverArgMetadata } from "@primitives/index.ts";
import { ResolverArgMetadata } from "@models/metadata/index.ts";

export function SetArgMetadata<T = string>(
  metadataKey: symbol,
  typeCd: T,
  name?: string,
  validator?: ZodSchema<unknown>
): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error('SetArgMetadata decorator can only be used on method parameters');
    }
    const argsMetadata: IResolverArgMetadata<T>[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
    argsMetadata.push(new ResolverArgMetadata({ typeCd, index: parameterIndex, name, validator }));
    Reflect.defineMetadata(metadataKey, argsMetadata, target, propertyKey);
  };
}