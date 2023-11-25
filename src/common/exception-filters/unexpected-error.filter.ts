import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '../response/response-entity';

@Catch()
export class UnexpectedErrorFilter implements ExceptionFilter {
  private logger = new Logger(UnexpectedErrorFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.name, exception.message, exception.stack);

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA(
            exception.message,
            exception.initMessage(),
            `${exception.getStatus()}`,
          ),
        ),
      );
  }
}
