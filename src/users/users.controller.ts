import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { log } from 'console';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    let user: User;
    user = await this.usersService.findOne(createUserDto.email);
    log(createUserDto, user);
    if (user) {
      return { status: 'Success', message: 'User is logged', user: user };
    } else {
      await this.usersService.create(createUserDto);
      user = await this.usersService.findOne(createUserDto.email);
      return {
        status: 'Success',
        message: 'User is created and logged',
        user: user,
      };
    }
  }
}
