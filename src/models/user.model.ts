import { AbstractModel } from "./abstract.model";
import { User } from "../interfaces";
import { getRandomIntInclusive } from "../utils/utils";

const idTemplate = 'ABCDEF123456';

export class UserModel extends AbstractModel<User> {
  id: string;

  constructor(data: User) {
    super(data);

    this.id = this.generateId();
  }

  generateId(): string {
    return Array.from(Array(6))
      .map(() => idTemplate[getRandomIntInclusive(0, idTemplate.length - 1)]).join('');
  }

  reGenerateId(): string {
    this.id = this.generateId();
    return this.id;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return `${this.data.name}`;
  }

  getAddress(): string {
    return `${this.data.address.city} ${this.data.address.street} ${this.data.address.suite}`;
  }

  getAge(): number {
    return this.data.age;
  }

  getCompany(): string {
    return this.data.company.name;
  }
}
