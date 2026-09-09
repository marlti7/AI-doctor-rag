import { Module } from '@nestjs/common';
import { UserinfoController } from './userinfo.controller.js';
import { UserinfoService } from './userinfo.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfo, UserInfoSchema } from './userinfo.schema.js';

@Module({
    //注册mongodb的数据模型
    imports: [
        MongooseModule.forFeature([
            //UserInfo.name获取class名称：UserInfo
            { name: UserInfo.name, schema: UserInfoSchema }
        ])
    ],
    controllers: [UserinfoController],
    providers: [UserinfoService]
})
export class UserinfoModule {}
