import { IsString } from "class-validator";

export class CreateTest {
    @IsString()
    title: string;
}