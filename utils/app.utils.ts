import { Router } from '@oak/oak';
import { DiUtils } from './di.utils.ts';
import { HttpUtils } from './http.utils.ts';
import { IModuleMetadata } from '@primitives/index.ts';
import { MODULE_METADATA_KEY } from "@decorators/index.ts";

export abstract class AppUtils {
  static loadModule(moduleClass: Constructable): Router {
    // Retrieve module metadata from the class using reflect-metadata
    const moduleMetadata: IModuleMetadata = Reflect.getMetadata(MODULE_METADATA_KEY, moduleClass);

    if (!moduleMetadata) {
      throw new Error('Module metadata not found');
    }

    // Create DI container for the module
    const container = DiUtils.createContainer(moduleMetadata);

    // Retrieve controllers from the container
    const controllers = (moduleMetadata.controllers || []).map(controller => container.resolve<Constructable>(controller));

    // Parse controllers to create routers
    const routers = HttpUtils.parseControllers(controllers);

    // Combine all routers into a main router
    const mainRouter = new Router();
    routers.forEach(router => {
      mainRouter.use(router.routes());
      mainRouter.use(router.allowedMethods());
    });

    return mainRouter;
  }
}