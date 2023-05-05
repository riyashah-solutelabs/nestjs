import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repo/user.repo';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  // constructor(private readonly userRepository: UsersRepository) {}
  constructor(private readonly userRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }
  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async remove(id: number) {
    // const user = await this.userRepository.findOne({ where: { id: id } });
    // return this.userRepository.remove(user);
    return this.userRepository.delete(id);
  }
}
