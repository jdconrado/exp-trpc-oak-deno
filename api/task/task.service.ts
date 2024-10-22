import { ITask } from '@primitives/index.ts';
import { injectable } from 'tsyringe';

@injectable()
export class TaskService {
  tasks: ITask[];
  constructor() {
    this.tasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: 'OPEN',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: 'IN_PROGRESS',
      },
      {
        id: '3',
        title: 'Task 3',
        description: 'Description 3',
        status: 'DONE',
      },
    ];
  }

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(taskInput: Omit<ITask, 'id' | 'status'>) {
    const task: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'OPEN',
      ...taskInput,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(task: ITask) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index] = task;
    return
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return
  }
}