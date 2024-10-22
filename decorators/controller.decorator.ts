import { ControllerMetadata } from "@models/index.ts";
import { injectable } from "tsyringe";

export const CONTROLLER_METADATA_KEY = Symbol('CONTROLLER_METADATA_KEY');

export function Controller(path: string) {
  return (target: Function) => {
    Reflect.defineMetadata(
      CONTROLLER_METADATA_KEY,
      new ControllerMetadata({ path }),
      target
    );
    injectable()(target as any);
  };
}
