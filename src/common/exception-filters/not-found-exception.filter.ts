import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/response-entity';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private logger = new Logger(NotFoundExceptionFilter.name);

  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as {
      error: string;
      message: string;
      statusCode: number;
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
