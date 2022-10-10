import { IsOptional, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    creator: string;
}