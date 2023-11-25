import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/response-entity';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private logger = new Logger(UnauthorizedExceptionFilter.name);
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
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
