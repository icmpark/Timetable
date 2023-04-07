export class Schedule {
    constructor (
        readonly id: string,
        readonly createdBy: string,
        readonly title: string,
        readonly description: string,
        readonly startTime: Date,
        readonly endTime: Date,
        readonly subscription: string[]
    ) { }
}