import { Controller } from "@decorators/controller.decorator.ts";
import { Get, Post } from "@decorators/route.decorator.ts";
import { inject } from "tsyringe";
import { TaskService } from './task.service.ts';
import type { ITask } from "@primitives/index.ts";
import { Ctx } from "@decorators/http-endpoint.decorator.ts";

@Controller('/tasks')
export class TaskController {

    constructor(
        @inject(TaskService) private readonly taskService: TaskService
    ) {}

    @Get('/')
    async getTasks() {
        return this.taskService.getTasks();
    }

    @Get('/test')
    async test( @Ctx() ctx: any) {
        ctx.response.body = 'Hello World';
    }

    @Get('/:id')
    async getTaskById(id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post('/')
    async createTask(taskInput: Omit<ITask, 'id' | 'status'>) {
        return this.taskService.createTask(taskInput);
    }
}
