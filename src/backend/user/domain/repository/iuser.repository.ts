
import { User } from "../user";

export interface IUserRepository {
    create: (user: User) => Promise<void>;
    update: (userId: string, userName?: string,  password?: string) => Promise<void>;
    delete: (userId: string) => Promise<void>;
    findByUserId: (userId: string) => Promise<User | null>
}