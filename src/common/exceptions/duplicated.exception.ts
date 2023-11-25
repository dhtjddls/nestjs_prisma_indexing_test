import { InvalidException } from './invalid.exceptions';

export class DuplicatedException extends InvalidException {
  constructor(message = '중복된 데이터입니다.') {
    super(message, 409);
  }
}
