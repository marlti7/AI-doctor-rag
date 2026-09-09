import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';
import { FilemanagementModule } from '../filemanagement/filemanagement.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatData, ChatDataSchema } from './chat.schema.js';

@Module({
    //注册mongodb的数据模型
    imports: [
        FilemanagementModule,
        MongooseModule.forFeature([
            { name: ChatData.name, schema: ChatDataSchema }
        ])
    ],
    controllers: [ChatController],
    providers: [ChatService]
})
export class ChatModule { }
