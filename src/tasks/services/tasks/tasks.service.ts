import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { GetTaskStatusFilterDto } from 'src/tasks/dtos/get-task-filter.dto';
import { TaskRepository } from 'src/tasks/repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskStatus } from 'src/tasks/Models/task-status.enum';
import { User } from 'src/auth/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTaskStatusFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!found) {
      throw new NotFoundException('Task not found');
    }

    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const deleted = await this.taskRepository.delete({ id, user });

    if (deleted.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async updateTask(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (status) {
      task.status = status;
    }
    return this.taskRepository.save(task);
  }
}
// private tasks: Task[] = [];
// getAllTask() {
//   return this.tasks;
// }
// getAllTasks(): Task[] {
//   return this.tasks;
// }
// getTaskWithFilters(filterDto: GetTaskStatusFilterDto): Task[] {
//   const { status, search } = filterDto;
//   let tasks = this.getAllTasks();
//   if (status) {
//     tasks = tasks.filter((task) => task.status === status);
//   }
//   if (search) {
//     tasks = tasks.filter((task) => {
//       if (task.title.includes(search) || task.description.includes(search)) {
//         return true;
//       }
//       return false;
//     });
//   }
//   return tasks;
// }
// createTask(createTaskDto: CreateTaskDto): Task {
//   const { title, description } = createTaskDto;
//   const task: Task = {
//     id: uuid(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }
// getTaskById(id: string): Task {
//   const found = this.tasks.find((task) => task.id === id);
//   if (!found) {
//     throw new NotFoundException('Task not found');
//   }
//   return found;
//   // return this.tasks.find((task) => task.id === id);
// }
// deleteTask(id: string): void {
//   const found = this.getTaskById(id);
//   this.tasks = this.tasks.filter((task) => task.id !== found.id);
//   // this.tasks = this.tasks.filter((task) => task.id !== id);
// }
// updateTask(id: string, status: TaskStatus) {
//   const task = this.getTaskById(id);
//   task.status = status;
//   return task;
// }
// createTask(title: string, description: string): Task {
//   const task: Task = {
//     id: uuid(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }
