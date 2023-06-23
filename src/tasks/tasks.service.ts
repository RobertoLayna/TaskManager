import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shared } from './entities/shared.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Shared)
    private sharedRepository: Repository<Shared>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  findAll(idUser: number) {
    return this.taskRepository.find({
      select: {
        id: true,
        title: true,
        deadline_date: true,
      },
      where: [
        { id_owner: idUser },
        { id_responsible: idUser },
        { is_private: false },
      ],
      relations: {
        status: true,
        responsible: true,
        owner: true,
        shareds: true,
      },
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id: id },
      relations: {
        owner: true,
        responsible: true,
        status: true,
        comments: true,
        shareds: true,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update({ id: id }, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete({ id: id });
  }

  createComment(comment: CreateCommentDto) {
    return this.commentRepository.save(comment);
  }
}
