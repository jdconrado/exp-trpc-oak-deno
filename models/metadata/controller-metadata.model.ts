import { IControllerMetadata } from '@primitives/index.ts';
export class ControllerMetadata implements IControllerMetadata {
  path: string;
  
  constructor(input: {path: string}) {
    this.path = input.path;
  }
}
