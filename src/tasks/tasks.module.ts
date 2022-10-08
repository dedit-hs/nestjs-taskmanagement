import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TasksService } from './services/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
