import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../Models/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
