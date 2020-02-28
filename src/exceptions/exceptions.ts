export class ErrorWithCode extends Error {
  code?: number;

  constructor(message?: string, code?: number) {
    super(message);

    this.code = code;

    Object.setPrototypeOf(this, this.constructor.prototype);
  }
}
