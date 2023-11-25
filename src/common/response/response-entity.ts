import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './response-status';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(statusCode: string, message: string, data: T) {
    this._statusCode = statusCode;
    this._message = message;
    this._data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '일시적인 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    statusCode: string = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(statusCode, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    data: T,
    statusCode: string = ResponseStatus.SERVER_ERROR,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(statusCode, message, data);
  }

  @ApiProperty()
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}
