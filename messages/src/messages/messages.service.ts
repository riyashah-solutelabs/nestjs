import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  //messagesRepo: MessagesRepository;

  constructor(public messagesRepo: MessagesRepository) {
    // Service is creating its own dependencies
    // DONT DO THIS ON REAL APP - aani jgyae DI user thay real app ma
    // this.messagesRepo = new MessagesRepository();
    // this.messagesRepo = messagesRepo;
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
