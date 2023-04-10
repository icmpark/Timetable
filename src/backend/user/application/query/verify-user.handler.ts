import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../domain/repository/iuser.repository';
import { VerifyUserQuery } from './verify-user.query';
import { User } from '../../domain/user';

@QueryHandler(VerifyUserQuery)
export class VerifyUserQueryHandler implements IQueryHandler<VerifyUserQuery> {
    constructor(
        @Inject('UserRepository') private userRepository: IUserRepository,
    ) { }

    async execute(query: VerifyUserQuery): Promise<User | null> {
        const { userId, password } = query;
        return await this.userRepository.verifyUser(userId, password);
    }
}