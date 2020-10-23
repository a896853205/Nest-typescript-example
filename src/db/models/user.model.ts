import {
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
  Default,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Unique
  @Default(DataType.UUIDV1)
  @Column({
    type: DataType.UUID,
  })
  uuid: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phone: string;
}
