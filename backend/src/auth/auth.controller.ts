import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  async registration(
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.registration(dto)
  }

  @Post('login')
  async login(
    @Body() dto: LoginRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.login(dto)

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return {
      accessToken: tokens.accessToken,
    };
  }
}
