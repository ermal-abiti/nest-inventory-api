import { IsString, IsEmail } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}