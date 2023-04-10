import { Injectable } from '@nestjs/common';
import { IAuthAdapter } from '../../domain/adapter/iauth.adapter';

@Injectable()
export class AuthAdapter implements IAuthAdapter {
    constructor( ) { }

    async verify (request: any): Promise<boolean> {
        return request.isAuthenticated();
    }
    
    async create (request: any): Promise<boolean> {
        await new Promise<void>((resolve, reject) =>
          request.logIn(request.user, (err) => (err ? reject(err) : resolve()))
        );
        return true;
    };
}