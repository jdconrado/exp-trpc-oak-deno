import type { IModuleMetadata } from "@primitives/index.ts";
import { type DependencyContainer, container } from "tsyringe";

export abstract class DiUtils {
  static createContainer(moduleMetadata: IModuleMetadata): DependencyContainer {
    const moduleContainer = container.createChildContainer();
    this.registerProviders(moduleContainer, moduleMetadata.providers);
    this.registerControllers(moduleContainer, moduleMetadata.controllers);
    return moduleContainer;
  }

  private static registerProviders(container: DependencyContainer, providers?: Provider[]): void {
    if (providers) {
      providers.forEach(provider => {
        this.handleProvider(container, provider);
      });
    }
  }

  private static registerControllers(container: DependencyContainer, controllers?: Constructable[]): void {
    if (controllers) {
      controllers.forEach(controller => {
        container.register(controller, { useClass: controller });
      });
    }
  }

  private static handleProvider(container: DependencyContainer, provider: Provider): void {
    if ('provide' in provider) {
      container.register(provider.provide, provider as { useClass: Constructable });
    } else {
      container.register(provider, { useClass: provider as Constructable });
    }
  }
}