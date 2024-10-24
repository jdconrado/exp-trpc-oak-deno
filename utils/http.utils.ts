import { Router, type BodyType, type RouterContext } from '@oak/oak';
import { Body } from '@oak/oak/body';
import { ControllerMetadata } from '@models/index.ts';
import { ARG_METADATA_KEY, CONTROLLER_METADATA_KEY, ROUTE_METADATA_KEY } from '@decorators/index.ts';
import { IRouteMetadata, type IResolverArgMetadata } from '@primitives/index.ts';
import { HttpMethod, HTTPResolverArgTypeCd } from "@enums/index.ts";
import { object } from "zod";

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
      console.log(`Parsing route: ${route.subType} ${route.path}`);
      if (!route.resolverFn) {
        throw new Error(`Resolver function not found for route: ${route.path}`);
      }
      const wrappedResolverFn = this.wrapResolverFn(route, controller);
      switch (route.subType) {
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
          throw new Error(`Unsupported HTTP method: ${route.subType}`);
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
          prototype,
          propertyName
        );
        if (hasOwnMetadata) {
          const metadata = Reflect.getOwnMetadata(
            ROUTE_METADATA_KEY,
            prototype,
            propertyName
          );
          if (metadata) {
            routes.push(metadata);
          }
        }
      }
    }
  
    return routes;
  }

  private static wrapResolverFn(route: IRouteMetadata, controller: object) {
    const routeArgsMetadata: IResolverArgMetadata[] = Reflect.getOwnMetadata(ARG_METADATA_KEY, Object.getPrototypeOf(controller), route.resolverFn!.name) || [];
    return async (ctx: RouterContext<string, any, Record<string, any>>) => {
      try{
        if (!routeArgsMetadata.length) {
          // No ctx parameter found, set the return value to ctx.response.body
          ctx.response.body = await route.resolverFn!.apply(controller);
          return;
        }

        const args = await this.resolveParameters(ctx, routeArgsMetadata);
        const result = await route.resolverFn!.apply(controller, args);

        // If ctx.response.body is not set, use the result from resolverFn
        if (ctx.response.body === undefined && result !== undefined) {
          ctx.response.body = result;
        }
      }catch(err: any) {
        //console.error(err);
        ctx.response.status = 500;
        ctx.response.body = {error: err};
      }
      
    };
  }

  private static async resolveParameters(
    ctx: RouterContext<string, any, Record<string, any>>,
    argsMetadata: IResolverArgMetadata[]
  ): Promise<any[]> {
    const args = [];
  
    for (const argMeta of argsMetadata) {
      const { typeCd, index, name, validator } = argMeta;
      let value: any;
  
      try {
        switch (typeCd) {
          case HTTPResolverArgTypeCd.BODY: {
            if (!ctx.request.hasBody) {
              throw new Error('Request body is missing');
            }
            
            const body = ctx.request.body;
            const type = ctx.request.body.type();
            value = await this.parseBody(body, type);
            value = validator ? validator.parse(value) : value;
            break;
          }

          case HTTPResolverArgTypeCd.PARAM:
            value = name ? ctx.params[name] : ctx.params;
            value = validator ? validator.parse(value) : value;
            break;
  
          case HTTPResolverArgTypeCd.QUERY:
            if(name) {
              value = ctx.request.url.searchParams.get(name);
            }else{
              value = {};
              for (const [key, val] of ctx.request.url.searchParams.entries()) {
                if (key.endsWith('[]')) {
                  const baseKey = key.slice(0, -2);
                  // Check if the existing value is an array or not
                  if (Array.isArray(value[baseKey])) {
                    value[baseKey].push(val); 
                  } else {
                    value[baseKey] = [val]; // Create an array if it's not
                  }
                } else {
                  value[key] = val;
                }
              }
            }
            value = validator ? validator.parse(value) : value;
            break;
  
          case HTTPResolverArgTypeCd.HEADER:
            value = name ? ctx.request.headers.get(name)  : Object.fromEntries(ctx.request.headers.entries());
            value = validator ? validator.parse(value) : value;
            break;
  
          case HTTPResolverArgTypeCd.REQ:
            value = ctx.request;
            break;
  
          case HTTPResolverArgTypeCd.RES:
            value = ctx.response;
            break;
  
          case HTTPResolverArgTypeCd.CTX:
            value = ctx;
            break;
  
          default:
            throw new Error(`Unsupported parameter type: ${typeCd}`);
        }
      } catch (e: any) {
        // Handle validation errors
        ctx.response.status = 400;
        ctx.response.body = { error: e.errors || e.message || 'Validation error' };
        throw e;
      }
  
      args[index] = value;
    }
  
    return args;
  }

  private static async parseBody(body: Body, type: BodyType) {
    switch (type) {
      case 'json':
        return await body.json();
      case 'text':
        return await body.text();
      case 'form-data':
        return await body.formData();
      case 'form':
        return await body.formData();
      case 'binary':
        return await body.arrayBuffer();
      default: {
        const textBody = await body.text();
        return textBody ? JSON.parse(textBody) : undefined;
      }
    }
  }
}