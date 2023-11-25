import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/response-entity';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): any {
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
