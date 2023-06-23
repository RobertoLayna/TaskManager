import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSharedDto } from './create-shared.dto';
import { Type } from 'class-transformer';
import { CreateTagDto } from './create-tag.dto';

export class CreateTaskDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  deadline_date: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_private: boolean;

  @IsNumber()
  @IsNotEmpty()
  id_owner: number;

  @IsNumber()
  @IsOptional()
  id_responsible?: number;

  @IsNumber()
  @IsOptional()
  id_file: number;

  @IsNumber()
  @IsOptional()
  id_status: number;

  @IsArray()
  @IsOptional()
  @Type(() => CreateSharedDto)
  shareds: CreateSharedDto[];

  @IsArray()
  @IsOptional()
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];
}
