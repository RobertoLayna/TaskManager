import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Exclude } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Exclude()
  id_owner?: number;
}
