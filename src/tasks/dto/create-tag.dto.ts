import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNumber()
  @IsNotEmpty()
  id_task?: number;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
