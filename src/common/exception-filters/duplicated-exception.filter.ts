import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { DuplicatedException } from '../exceptions/duplicated.exception';
import { ResponseEntity } from '../response/response-entity';

@Catch(DuplicatedException)
export class DuplicatedExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DuplicatedException.name);

  catch(exception: DuplicatedException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = {
      error: exception.name,
      message: exception.message,
      statusCode: exception.status,
    };

    this.logger.warn(exception);

    response
      .status(exceptionResponse.statusCode)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH(
            exceptionResponse.message,
            exceptionResponse.error,
          ),
        ),
      );
  }
}
