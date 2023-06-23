import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSharedDto {
  @IsNumber()
  @IsNotEmpty()
  id_user?: number;

  @IsNumber()
  @IsNotEmpty()
  id_task?: number;
}
