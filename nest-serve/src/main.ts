import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/http-exception.filter.js';
import { LoggingInterceptor } from './utils/logging.interceptor.js';
import { MyLogger } from './utils/no-timestape-logger.js';
import { MCP_CLIENT_TOKEN } from './mcp/mcp.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,//自动去掉没有定义的字段
      forbidNonWhitelisted: true,//如果有多余字段抛出错误
    })
  )
  //注册全局异常过滤器
  app.useGlobalFilters(
    new AllExceptionsFilter()
  )
  //全局响应拦截器
  app.useGlobalInterceptors(
    new LoggingInterceptor()
  )
  //允许跨域
  app.enableCors({
    origin: '*'
  })

  // 从依赖注入容器中获取mcpClient实例（与其他地方的实例一致）
  const mcpClient = app.get(MCP_CLIENT_TOKEN);
  //监听3000
  await app.listen(process.env.PORT ?? 3000, async () => {
    console.log('nest-server服务启动成功， 端口号是3000')
    try {
      await mcpClient.connectToServer()
    } catch (error) {
      console.error('mcp服务器连接失败', error)
    }
  });
}
await bootstrap();
