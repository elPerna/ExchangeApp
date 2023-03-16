import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto) {
    return { msg: 'Logged in!'}
  }

  @Get('info')
  getUsers(@Request() req) {
    return {
      data: req.user
    }
  }

  @Post('logout')
  logout(@Request() req) {
    req.logut(() => {
      return;
    });
  }

}
