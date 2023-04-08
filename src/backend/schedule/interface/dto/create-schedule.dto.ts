import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, Matches, MaxLength, MinDate } from "class-validator";
import { StartEndDate } from "./start-end-time";


export class CreateScheduleDto {
    @IsString()
    @MaxLength(100)
    readonly title: string;

    @IsString()
    @MaxLength(400)
    readonly description: string;

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    readonly startDate: Date;

    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    @StartEndDate('startDate',  {message: 'endDate must be bigger than startDate'})
    readonly endDate: Date;
}