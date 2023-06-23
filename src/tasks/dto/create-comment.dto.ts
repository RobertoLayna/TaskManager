import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsOptional()
  id_task: number;

  @IsNumber()
  @IsNotEmpty()
  id_user: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
