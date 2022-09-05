export class AbstractModel<T> {
  data: T;
  constructor(data: T) {
    this.data = data;
  }

  getData(): T {
    return { ...this.data };
  }
}
