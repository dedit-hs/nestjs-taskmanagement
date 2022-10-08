import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../Models/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
