
import { Schedule } from "../schedule";

export interface IScheduleRepository {
    create: (schedule: Schedule) => Promise<void>;
    update: (id: string, title?: string, description?: string, addUser?: string, deleteUser?: string) => Promise<void>;
    delete: (id: string) => Promise<void>;
    isAssigned: (id: string, userId: string) => Promise<boolean>;
    isAssignable: (id: string, userId: string) => Promise<boolean>;
    findOne: (id: string) => Promise<Schedule | null>;
    findAll: () => Promise<Schedule[]>;
    findCreatedBy: (userId: string) => Promise<Schedule[]>;
    findUserAssigned: (userId: string) => Promise<Schedule[]>;
}