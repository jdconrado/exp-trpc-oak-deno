export const CTX_METADATA_KEY = Symbol('CTX_METADATA_KEY');

export function Ctx(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error('CTX decorator can only be used on method parameters');
    }
    const existingCtxParameters: number[] =
      Reflect.getOwnMetadata(CTX_METADATA_KEY, target, propertyKey) || [];
    existingCtxParameters.push(parameterIndex);
    Reflect.defineMetadata(
      CTX_METADATA_KEY,
      existingCtxParameters,
      target,
      propertyKey
    );
  };
}
