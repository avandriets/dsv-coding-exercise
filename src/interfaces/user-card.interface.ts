import { UserModel } from "../models";

export interface UserCardInterface {
  onRemove: (value: string) => void;
  onRestore: (value: string) => void;
  user: UserModel;
  deleted: boolean;
}
