import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../Models/task-status.enum';

export class GetTaskStatusFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; //tanda ?  = nullable -> handle nilai null

  @IsOptional()
  @IsString()
  search?: string;
}
