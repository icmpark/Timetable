import { IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(60)
    readonly userName: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}