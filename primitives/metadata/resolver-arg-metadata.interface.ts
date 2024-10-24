import { ZodSchema } from 'zod';

export interface IResolverArgMetadata<T = string> {
  typeCd: T;
  index: number;
  name?: string;
  validator?: ZodSchema<unknown>;
}