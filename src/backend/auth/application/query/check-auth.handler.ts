import { Inject, Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CheckAuthQuery } from './check-auth.query';
import { FindUserQuery } from '../../../user/application/query/user-find.query'
import { IAuthAdapter } from '../../domain/adapter/iauth.adapter';
import * as bcrypt from 'bcrypt';

@Injectable()
@QueryHandler(CheckAuthQuery)
export class CheckAuthQueryHandler implements IQueryHandler<CheckAuthQuery> {
    constructor(
        @Inject('AuthAdapter') private authAdapter: IAuthAdapter,
    ) { }

    async execute(query: CheckAuthQuery): Promise<boolean> {
        const { request } = query;
        return await this.authAdapter.verify(request);
    }
}