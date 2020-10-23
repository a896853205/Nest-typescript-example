import { User } from "src/db/models/user.model";

export interface UserList {
  rows: User[];
  count: number;
}
