import { Expose } from "class-transformer";

export class TokenDto {
    @Expose()
    token: string
}