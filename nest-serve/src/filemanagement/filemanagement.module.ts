import { Module } from '@nestjs/common';
import { FilemanagementController } from './filemanagement.controller.js';
import { FilemanagementService } from './filemanagement.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Filemanagement, FilemanagementSchema } from './filemanegement.schema.js';

@Module({
    //注册mongodb的数据模型
    imports: [
        MongooseModule.forFeature([
            { name: Filemanagement.name, schema: FilemanagementSchema }
        ])
    ],
    controllers: [FilemanagementController],
    providers: [FilemanagementService],
    exports: [MongooseModule, FilemanagementService]
})
export class FilemanagementModule {

}
