import type { IModuleMetadata } from "@primitives/index.ts";

export class ModuleMetadata implements IModuleMetadata {
  controllers?: Constructable[];
  providers?: Provider[];
  imports?: IModuleMetadata[];
  exports?: Provider[];

  constructor(input: IModuleMetadata) {
    this.controllers = input.controllers;
    this.providers = input.providers;
    this.imports = input.imports;
    this.exports = input.exports;
  }
}