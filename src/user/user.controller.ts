import { Controller, Get, Query, UsePipes, Post, Body } from '@nestjs/common';

import * as Joi from 'joi';

import { CreateUserDTO } from './dto/create-user.dto';
import { FindAllUserDTO } from './dto/find-all-user-list.dto';
import { UserService } from './user.service';
import { JoiValidationPipe } from '../util/pipes/joi-validation.pipe';
import { UserList } from './interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查询用户列表
   * @param {FindAllUserDTO} query 查询用户参数
   */
  @Get('list')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        page: Joi.number()
          .integer()
          .min(0)
          .required(),
        pageSize: Joi.number()
          .integer()
          .min(0)
          .max(100)
          .required(),
      }),
    ),
  )
  async findAll(@Query() query: FindAllUserDTO): Promise<UserList> {
    const { page, pageSize } = query;

    return await this.userService.findAll(page, pageSize);
  }

  @Post()
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        name: Joi.string()
          .min(1)
          .max(30)
          .required(),
        email: Joi.string()
          .min(1)
          .max(50)
          .required(),
        age: Joi.number()
          .min(0)
          .max(100)
          .required(),
      }),
    ),
  )
  async create(@Body() user: CreateUserDTO): Promise<void> {
    const { name, email, age } = user;

    await this.userService.create(name, email, age);

    return;
  }
}
