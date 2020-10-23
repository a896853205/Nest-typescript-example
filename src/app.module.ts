import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './db/models/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'a896',
      database: 'me',
      models: [User],
    }),
  ],
})
export class AppModule {}
