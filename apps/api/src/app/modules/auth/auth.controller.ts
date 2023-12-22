import { User } from '@modules/user/entities/user.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@shared/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { LoginDtoV } from './login.dtov';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @IsPublic()
  @Post('login')
  login(@Body() body: LoginDtoV): Promise<{ user: User; token: string }> {
    return this._authService.login(body);
  }

  @Get('me/:token')
  getMe(@Param('token') token: string): Promise<User> {
    return this._authService.getMeByToken(token);
  }
}
