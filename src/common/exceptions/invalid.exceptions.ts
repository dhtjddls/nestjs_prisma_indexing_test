export class InvalidException extends Error {
  readonly status: number;

  constructor();
  constructor(status: number);
  constructor(message: string);
  constructor(message: string, status: number);
  constructor(
    messageOrStatus: number | string = '유효하지 않은 접근입니다.',
    status = 400,
  ) {
    if (typeof messageOrStatus === 'number') {
      super('유효하지 않은 접근입니다.');
      this.status = messageOrStatus;
    } else {
      super(messageOrStatus);
      this.status = status;
    }
  }
}
