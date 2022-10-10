import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTaskStatusFilterDto } from '../dtos/get-task-filter.dto';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../Models/task-status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }

  async getTasks(
    filterDto: GetTaskStatusFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status: `${status}` });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
