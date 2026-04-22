import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import type { Request } from 'express';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

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

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies.refreshToken

    const tokens = await this.authService.refreshTokens(refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies.refreshToken
    const message = await this.authService.logout(refreshToken)

    res.clearCookie('refreshToken')

    return {
      message: message
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Res({ passthrough: true }) res: Response) {
    const user = await this.authService.me()
    return user
  }
}
