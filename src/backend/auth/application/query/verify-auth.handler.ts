import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { VerifyAuthQuery } from './verify-auth.query';
import { FindUserQuery } from '../../../user/application/query/user-find.query'
import { User } from '../../../user/domain/user';
import * as bcrypt from 'bcrypt';

@Injectable()
@QueryHandler(VerifyAuthQuery)
export class VerifyAuthQueryHandler implements IQueryHandler<VerifyAuthQuery> {
    constructor(
        private queryBus: QueryBus
    ) { }

    async execute(query: VerifyAuthQuery): Promise<User | null> {
        const { userId, password } = query;
        const user: User = await this.queryBus.execute(new FindUserQuery(userId));

        if (!user || !await bcrypt.compare(password, user.password))
            return null;
        return user;
    }
}