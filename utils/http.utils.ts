import { Router, type RouterContext } from '@oak/oak';
import { ControllerMetadata } from '@models/index.ts';
import { CONTROLLER_METADATA_KEY, CTX_METADATA_KEY, ROUTE_METADATA_KEY } from '@decorators/index.ts';
import { IRouteMetadata } from '@primitives/index.ts';
import { HttpMethod } from "@enums/index.ts";

export abstract class HttpUtils {

  static parseControllers(controllers: object[]): Router[] {
    return controllers.map(controller => {
      const router = new Router();
      const controllerMetadata: ControllerMetadata = Reflect.getMetadata(CONTROLLER_METADATA_KEY, Object.getPrototypeOf(controller).constructor) || { path: '' };
      console.log(`Parsing controller: ${controllerMetadata.path}`);
      this.parseRoutes(router, controller);
      return router.prefix(controllerMetadata.path);
    });
  }

  private static parseRoutes(router: Router, controller: object): void {
    const routes = this.getControllerRoutes(controller);
    routes.forEach(route => {
      console.log(`Parsing route: ${route.method} ${route.path}`);
      if (!route.resolverFn) {
        throw new Error(`Resolver function not found for route: ${route.path}`);
      }
      const wrappedResolverFn = this.wrapResolverFn(route.resolverFn, controller);
      switch (route.method) {
        case HttpMethod.GET:
          router.get(route.path, wrappedResolverFn);
          break;
        case HttpMethod.POST:
          router.post(route.path, wrappedResolverFn);
          break;
        case HttpMethod.PUT:
          router.put(route.path, wrappedResolverFn);
          break;
        case HttpMethod.DELETE:
          router.delete(route.path, wrappedResolverFn);
          break;
        case HttpMethod.PATCH:
          router.patch(route.path, wrappedResolverFn);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${route.method}`);
      }
    });
  }

  private static getControllerRoutes(controllerClass: object): IRouteMetadata[] {
    const routes: IRouteMetadata[] = [];
    const prototype = Object.getPrototypeOf(controllerClass);
  
    const propertyNames = Object.getOwnPropertyNames(prototype);
  
    for (const propertyName of propertyNames) {
      const method = prototype[propertyName];
      if (typeof method === 'function') {
        const hasOwnMetadata = Reflect.hasOwnMetadata(
          ROUTE_METADATA_KEY,
          method
        );
        if (hasOwnMetadata) {
          const metadata = Reflect.getOwnMetadata(
            ROUTE_METADATA_KEY,
            method
          );
          if (metadata) {
            routes.push(metadata);
          }
        }
      }
    }
  
    return routes;
  }

  private static wrapResolverFn(resolverFn: Function, controller: object) {
    const prototype = Object.getPrototypeOf(controller);
    return async (ctx: RouterContext<string, any, Record<string, any>>) => {
      const ctxParameters: number[] = Reflect.getOwnMetadata(CTX_METADATA_KEY, prototype, resolverFn.name) || [];
      
      if (ctxParameters.length === 0) {
          // No ctx parameter found, set the return value to ctx.response.body
          ctx.response.body = await resolverFn.apply(controller);
          return;
      }

      const maxIndex = Math.max(...ctxParameters);
      const newArgs = new Array(maxIndex + 1).fill(null);
      ctxParameters.forEach(index => {
          newArgs[index] = ctx;
      });

      await resolverFn.apply(controller, newArgs);
  };
  }
}