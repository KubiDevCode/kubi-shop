import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginRequest {
    @IsString({ message: 'Имя должно быть строкой' })
    @IsNotEmpty({ message: "Имя не должно быть пустым" })
    name!: string;

    @IsEmail({}, { message: "Почта должна быть почтой" })
    @IsNotEmpty({ message: "Почта не должна быть пустой" })
    email!: string;

    @IsNotEmpty({ message: "Пароль не должен быть пустым" })
    @MinLength(3, { message: "Пароль должен быть не меншье 3 симовлов" })
    password!: string;
}