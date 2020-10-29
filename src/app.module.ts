import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './db/models/user.model';
import { UserModule } from './user/user.module';
import { DATABASE_DEV, DATABASE_PRO } from './keys';

const DATABASE =
  process.env.NODE_ENV === 'development' ? DATABASE_DEV : DATABASE_PRO;

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: DATABASE.NAME,
      password: DATABASE.KEY,
      database: 'me',
      models: [User],
    }),
  ],
})
export class AppModule {}
