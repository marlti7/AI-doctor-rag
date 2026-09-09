import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MyLogger } from './no-timestape-logger.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new MyLogger()
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const res = exception instanceof HttpException ? exception.getResponse() : null
    let message = '服务器错误'
    if(exception instanceof HttpException) {
        message = typeof res === 'string' ? res : (res as any)?.message
    } else if(exception instanceof Error) {
        message = exception.message || message
    }
    this.logger.error(message);
    response.status(status).json({
      statusCode: status,
      message: message,
      data: null,
      api: request.url,
    //   timestamp: new Date().toISOString(),
    });
  }
}