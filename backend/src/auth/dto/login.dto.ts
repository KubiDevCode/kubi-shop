import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginRequest {
    @IsEmail({}, { message: "Почта должна быть почтой" })
    @IsNotEmpty({ message: "Почта не должна быть пустой" })
    email!: string;

    @IsNotEmpty({ message: "Пароль не должен быть пустым" })
    @MinLength(3, { message: "Пароль должен быть не меншье 3 симовлов" })
    password!: string;
}