import { Module } from "@decorators/module.decorator.ts";
import { TaskController } from "./task.controller.ts";
import { TaskService } from './task.service.ts';

@Module({
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}