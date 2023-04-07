import { IsString, IsOptional, MaxLength } from "class-validator";

export class UpdateScheduleDto {
    @IsString()
    @MaxLength(100)
    @IsOptional()
    readonly title: string;

    @IsString()
    @MaxLength(400)
    @IsOptional()
    readonly description: string;
}