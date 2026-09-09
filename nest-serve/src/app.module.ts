import { Module } from '@nestjs/common';
import { UserinfoController } from './userinfo/userinfo.controller.js';
import { UserinfoService } from './userinfo/userinfo.service.js';
import { UserinfoModule } from './userinfo/userinfo.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { FilemanagementModule } from './filemanagement/filemanagement.module.js';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ChatModule } from './chat/chat.module.js';
import { McpModule } from './mcp/mcp.module.js';

@Module({
  imports: [
    UserinfoModule,
    FilemanagementModule,
    ChatModule,
    McpModule,
    //加载环境变量
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //连接mongodb数据库
    MongooseModule.forRootAsync({
      inject: [ConfigService],//注入依赖
      useFactory: (config: ConfigService) => ({
        //根据自己的mongodb账号密码 设置MONGODB_URI
        uri: config.get<string>('MONGODB_URI'),
        serverSelectionTimeoutMS: 1000,//超时时间
        connectTimeoutMS: 1000,//超时时间
        socketTimeoutMS: 2000, //socket响应时间
      })
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],//注入依赖
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      })
    }),
    //连接redis数据库
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],//注入依赖
      useFactory: (config: ConfigService) => ({
        type: 'single',
        options: {
          host:config.get('REDIS_HOST'),
          port:config.get('REDIS_PORT')
        }
      }),
    }),
  ],
  
  // controllers: [UserinfoController],
  // providers: [UserinfoService],
})
export class AppModule {}
