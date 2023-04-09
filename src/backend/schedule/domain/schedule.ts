export class Schedule {
    constructor (
        readonly id: string,
        readonly createdBy: string,
        readonly title: string,
        readonly description: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly assignedUser: string[]
    ) { }
}