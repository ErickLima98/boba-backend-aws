import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v1 as uuid } from 'uuid';

@Injectable()
/**
 * Middleware that logs the requests and responses for each request
 */
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const requestUuid = uuid();
    const url: string = request.originalUrl;
    const method = request.method;
    let body = request.body;

    if (url === '/login' || url === '/users') {
      const { password, ...parsedRequest } = body; // eslint-disable-line @typescript-eslint/no-unused-vars
      body = { ...parsedRequest, password: '********' };
    }

    this.logger.log(`[REQUEST  ${requestUuid}]: 
        URL: ${JSON.stringify(url)}
        BODY: ${JSON.stringify(body)},
        METHOD: ${JSON.stringify(method)}
    `);

    response.on('close', () => {
      this.logger.log(`[RESPONSE ${requestUuid}]: 
        URL: ${JSON.stringify(url)}
        BODY: ${JSON.stringify(body)}
        METHOD: ${JSON.stringify(method)}
        STATUS: ${JSON.stringify(response.statusCode)},
        STATUS RESPONSE: ${JSON.stringify(response.statusMessage)}
      `);
    });
    next();
  }
}
