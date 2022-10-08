import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { GetTaskStatusFilterDto } from 'src/tasks/dtos/get-task-filter.dto';
import { UpdateTaskDto } from 'src/tasks/dtos/update-task.dto';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskStatusFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    return this.taskService.updateTask(id, title, description, status);
  }

  // @Get()
  // getAllTasks(@Query() filterDto: GetTaskStatusFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }
  // // getAllTasks(): Task[] {
  // //   return this.taskService.getAllTask();
  // // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.taskService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatus: UpdateTaskStatus,
  // ): Task {
  //   const { status } = updateTaskStatus;
  //   return this.taskService.updateTask(id, status);
  // }
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Task {
  //   return this.taskService.updateTask(id, status);
  // }
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   console.log('title', title);
  //   console.log('description', description);
  //   return this.taskService.createTask(title, description);
  // }
}
