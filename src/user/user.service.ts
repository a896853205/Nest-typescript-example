import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../db/models/user.model';
import { UserList } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(page: number, pageSize: number): Promise<UserList> {
    // 此处写业务逻辑
    const { rows, count } = await this.userModel.findAndCountAll({
      attributes: ['uuid', 'firstName', 'lastName', 'email', 'phone'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return { rows, count };
  }

  create(name: string, email: string, age: number): Promise<User> {
    return this.userModel.create({
      firstName: name,
      email,
      age,
    });
  }
}
