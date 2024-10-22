import { IModuleMetadata } from "@primitives/index.ts";
import { ModuleMetadata } from "@models/index.ts";

export const MODULE_METADATA_KEY = Symbol('MODULE_METADATA_KEY');

export function Module(input: IModuleMetadata) {
  return (target: Function) => {
    Reflect.defineMetadata(
      MODULE_METADATA_KEY,
      new ModuleMetadata(input),
      target
    );
  };
}
