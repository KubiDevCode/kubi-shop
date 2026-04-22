import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async registration(dto: RegisterRequest) {
        const { name, email, password } = dto;

        const candidate = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (candidate) {
            throw new BadRequestException('Пользователь уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const tokens = await this.generateTokens(user.id, user.email);
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async login(dto: LoginRequest) {
        const { email, password } = dto;

        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const tokens = await this.generateTokens(user.id, user.email);
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async refreshTokens(refreshToken: string) {
        let payload: { sub: string; email: string };

        try {
            payload = await this.jwtService.verifyAsync<{
                sub: string;
                email: string;
            }>(refreshToken, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            });
        } catch {
            throw new UnauthorizedException('Невалидный refresh token');
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Доступ запрещен');
        }

        const isRefreshValid = await bcrypt.compare(
            refreshToken,
            user.hashedRefreshToken,
        );

        if (!isRefreshValid) {
            throw new UnauthorizedException('Доступ запрещен');
        }

        const tokens = await this.generateTokens(user.id, user.email);
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async logout(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        let payload: { sub: string };

        try {
            payload = await this.jwtService.verify(refreshToken, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            })
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Access denied');
        }

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { hashedRefreshToken: null }
        })

        return { message: 'Выход выполнен' };
    }

    async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return {
            id: user.id,
            username: user.name,
            email: user.email,
            userBasket: user.basket,
        };
    }

    private async generateTokens(userId: string, email: string) {
        const payload = { sub: userId, email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
                expiresIn:
                    this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') as StringValue,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
                expiresIn:
                    this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') as StringValue,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async saveRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.prismaService.user.update({
            where: { id: userId },
            data: {
                hashedRefreshToken,
            },
        });
    }
}