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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
}
