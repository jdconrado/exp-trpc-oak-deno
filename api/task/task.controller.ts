import { Controller } from "@decorators/controller.decorator.ts";
import { Get, Post } from "@decorators/route.decorator.ts";
import { inject } from "tsyringe";
import { TaskService } from './task.service.ts';
import { Ctx, Query } from "@decorators/http-endpoint.decorator.ts";
import { Body, Header } from "@decorators/index.ts";
import { CreateTaskSchema } from "./schemas/index.ts";
import type { CreateTaskDto } from "./schemas/index.ts";

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
    async test( @Ctx() ctx: any, @Query() query?: object) {
        ctx.response.body = { message: 'Hello, World!', query };
    }

    @Get('/:id')
    async getTaskById(id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post('/')
    async createTask(@Body(CreateTaskSchema) taskInput: CreateTaskDto, @Header('user-agent') headers: string) {
        const result = await this.taskService.createTask(taskInput);
        return { task: result, headers };
    }
}
