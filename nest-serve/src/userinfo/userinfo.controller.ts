import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto, RegisterDto } from './userinfo.dto.js';
import { UserinfoService } from './userinfo.service.js';

@Controller('userinfo')
export class UserinfoController {
    // 依赖注入service
    constructor(private readonly userinfoService: UserinfoService) { }
    // 注册接口
    @Post('registeruser')
    async registerUser(@Body() body: RegisterDto) {
        console.log('收到的请求参数：', body);
        const { password, confirmPassword } = body
        // 比对密码和确认密码
        if (password !== confirmPassword) {
            throw new BadRequestException(['两次密码输入不一致'])
        }
        // 存储数据库
        return await this.userinfoService.registerUser(body.phoneNumber, body.password)
    }

    // 登陆
    @Post('loginuser')
    async loginUser(@Body() body: LoginUserDto) {
        const { phoneNumber, password } = body
        return await this.userinfoService.loginUser(
            phoneNumber,
            password
        )
    }
}
