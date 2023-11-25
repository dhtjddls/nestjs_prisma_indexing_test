import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

import { InvalidException } from '../exceptions/invalid.exceptions';
import { ResponseEntity } from '../response/response-entity';

@Catch(InvalidException)
export class InvalidExceptionFilter implements ExceptionFilter {
  private logger = new Logger(InvalidExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.stack);

    response
      .status(exception.status)
      .json(instanceToPlain(ResponseEntity.ERROR_WITH(exception.message)));
  }
}
