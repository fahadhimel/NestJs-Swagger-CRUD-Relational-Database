import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('Login Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUser() {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      this.userService.createUser(createUserDto);
    } catch (err) {
      console.log(err);
    }
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
