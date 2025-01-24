import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { Response } from 'express';

/**
 * Class that catches an exception, formats it, and returns a
 * parsed response to ensure the API's error responses
 * always have the same format
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const res = exception.getResponse();
    let message: any;
    if (isObject(res)) {
      message = res;
      if (message['statusCode']) {
        message['status_code'] = message['statusCode'];
        delete message['statusCode'];
      }
      if (!message['validation_errors']) {
        message['validation_errors'] = [];
      }
    } else {
      message = {
        status_code: exception.getStatus(),
        message: res,
        validation_errors: [],
        error: exception.name,
      };
    }

    response.status(status).json(message);
  }
}
