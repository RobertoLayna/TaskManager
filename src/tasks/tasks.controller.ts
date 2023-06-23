import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { find } from 'lodash';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const insertResult = await this.tasksService.create(createTaskDto);
    return {
      status: 'Success',
      message: 'Task is created',
      id: insertResult.id,
    };
  }

  @Get()
  async findAll(@Query('id_user') id_user: number) {
    const tasks = await this.tasksService.findAll(id_user);
    return {
      status: 'Success',
      tasks: tasks,
      count: tasks.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);
    return {
      status: 'Success',
      task: task,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updateResult = await this.tasksService.update(+id, updateTaskDto);
    return {
      status: 'Success',
      updated: updateResult.affected,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteResult = await this.tasksService.remove(+id);
    return {
      status: 'Success',
      updated: deleteResult.affected,
    };
  }

  @Put(':id/comment')
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.id_task = id;
    const insertResult = await this.tasksService.createComment(
      createCommentDto,
    );
    return {
      status: 'Success',
      message: 'Comment is created',
      id: insertResult.id,
    };
  }

  @Put(':id/assign')
  async assign(
    @Param('id', ParseIntPipe) id: number,
    @Query('idOwner', ParseIntPipe) id_owner: number,
    @Query('idResponsible', ParseIntPipe) id_responsible: number,
  ) {
    const isOwner = await this.tasksService.findOne(id);
    if (
      isOwner.id_owner === id_owner &&
      find(isOwner.shareds, (v) => v.id_user == id_responsible)
    ) {
      const updateResult = await this.tasksService.update(id, {
        id_responsible: id_responsible,
      });
      return {
        status: 'Success',
        message: 'Responsible is assigned',
        updated: updateResult.affected,
      };
    } else {
      return {
        status: 'Fail',
        message: 'You cannot modify this task or task is not shared with user',
        updated: 0,
      };
    }
  }
}
