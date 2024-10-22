export interface IModuleMetadata {
  controllers?: Constructable[];
  providers?: Provider[];
  imports?: IModuleMetadata[];
  exports?: Provider[];
}