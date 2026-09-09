
import { LoggerService, Injectable } from '@nestjs/common';
import { mkdirSync, existsSync, appendFile } from 'fs';
import { resolve, join } from 'path';

@Injectable()
export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  //日志文件夹
  private logDir = resolve(process.cwd(), 'dist', 'logs');
  constructor() {
    //如果日志目录不存在则新建
    if(!existsSync(this.logDir)) {
        mkdirSync(this.logDir, {recursive: true})
    }
  }
  private writeLog(level: string, message: any) {
    const logFile = join(this.logDir, `${level}.log`);
    const logMsg = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    appendFile(logFile, logMsg, (err) => {
        if(err) {
            console.error('写日志失败：', err)
        }
    })
  }
  //一般日志
  log(message: any, ...optionalParams: any[]) {
    console.log('[LOG]', message)
    this.writeLog('log', message)
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {}

  /**
   * Write an 'error' level log.
   */
  error(message: any, trace?: string) {
    console.log('[ERROR]', message, trace ? `\n${trace}` : '');
    this.writeLog('error', `${message}${trace ? `\n${trace}` : ''}`)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log('[WARN]', message)
    this.writeLog('warn', message)
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.log('[DEBUG]', message)
    this.writeLog('debug', message)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log('[VERBOSE]', message)
    this.writeLog('verbose', message)
  }
}
