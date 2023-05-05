import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from './repo/user.repo';

@Injectable()
export class UserService {
  // constructor(
  //   @InjectRepository(User) private readonly userRepository: Repository<User>,
  // ) {}
  constructor(private readonly userRepository: UsersRepository) {}

  getUserByAge(age: number) {
    return this.userRepository.getUserByAge(age);
  }
  create(createUserDto: CreateUserDto): Promise<User> {
    // const user: User = new User();
    // user.firstName = createUserDto.firstName;
    // user.lastName = createUserDto.lastName;
    // user.age = createUserDto.age;

    // return this.userRepository.save(user);
    const user = this.userRepository.create(createUserDto);
    console.log(user);
    return this.userRepository.save(user);
    // return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    // user.firstName = updateUserDto
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
    // return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(user);
  }
}
