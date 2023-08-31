import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    try {
      return this.userRepository.find();
    } catch (err) {
      console.log(err);
    }
  }

  async findOneUser(id: number) {
    try {
      console.log(id);
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new Error('User Not Found');
      return user;
    } catch (err) {
      console.log(err.message);
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  createUser(userDetails: CreateUserParams) {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
        createAT: new Date(),
      });
      return this.userRepository.save(newUser);
    } catch (err) {
      console.log(err);
    }
  }

  updateUser(id: number, updateUserDatails: UpdateUserParams) {
    try {
      return this.userRepository.update({ id }, { ...updateUserDatails });
    } catch (err) {
      console.log(err);
    }
  }

  deleteUser(id: number) {
    try {
      return this.userRepository.delete({ id });
    } catch (err) {
      console.log(err);
    }
  }
}
