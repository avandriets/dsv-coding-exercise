import { UserModel } from "../models";

export enum usersEnum {
  Add = 'add',
  Remove = 'remove',
  Restore = 'restore',
  Filer = 'filer',
}

export interface UsersAction {
  type: usersEnum;
  payload?: { users?: UserModel[]; filter?: string; userId?: string; };
}

export interface UsersState {
  users: UserModel[];
  deleted: UserModel[];
  filter: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}
