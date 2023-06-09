import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {} //Repository<User> this repository will handle users deals with instances of users
  //@InjectRepository(User) - this is going to tell the DI system that we need user repository

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    // return this.repo.findOneBy({id});
    return this.repo.findOne({ where: { id: id } });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
