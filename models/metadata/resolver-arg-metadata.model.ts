import { IResolverArgMetadata } from '@primitives/index.ts';

export class ResolverArgMetadata<T = string> implements IResolverArgMetadata<T> {
  typeCd: T;
  index: number;
  name?: string | undefined;
  validator?: ZodSchema<unknown>;
  
  constructor(input: {typeCd: T, index: number, name?: string, validator?: ZodSchema<unknown>}) {
    this.typeCd = input.typeCd;
    this.index = input.index;
    this.name = input.name;
    this.validator = input.validator;
  }
}