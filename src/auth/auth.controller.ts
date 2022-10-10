import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { TokenDto } from './dtos/token.dto';
import { UserDto } from './dtos/user.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Serialize(TokenDto)
    @Post('/login')
    loginUser(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Serialize(TokenDto)
    @Post('/register')
    registerUser(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @Serialize(UserDto)
    @Post('/me')
    @UseGuards(AuthGuard)
    getAuthenticatedUser() {
        return this.authService.getAuthUser();
    }


}
