import 'reflect-metadata';
import { TaskModule } from "./api/index.ts";
import { AppUtils } from "@utils/app.utils.ts";
import { Application } from "@oak/oak";

async function main() {
  // Load the module metadata
  const router = AppUtils.loadModule(TaskModule);

  // Create a new Oak application
  const app = new Application();

  // Use the loaded router
  app.use(router.routes());
  app.use(router.allowedMethods());

  // Start the server
  const port = 8080;
  console.log(`Server running on http://localhost:${port}`);
  await app.listen({ port });
}

main().catch(err => {
  console.error("Error starting server:", err);
});