import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { File } from './entities/file.entity';
import { Shared } from './entities/shared.entity';
import { Bitacora } from './entities/bitacora.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Tag, File, Shared, Bitacora, Comment]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
