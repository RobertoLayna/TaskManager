import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Status } from './status/entities/status.entity';
import { Tag } from './tasks/entities/tag.entity';
import { File } from './tasks/entities/file.entity';
import { Shared } from './tasks/entities/shared.entity';
import { Bitacora } from './tasks/entities/bitacora.entity';
import { Comment } from './tasks/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task_manager',
      entities: [User, Task, File, Status, Tag, Shared, Bitacora, Comment],
      synchronize: true,
    }),
    UsersModule,
    StatusModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
