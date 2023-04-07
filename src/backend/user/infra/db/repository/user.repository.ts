import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/user';
import { UserFactory } from '../../../domain/user.factory';
import { IUserRepository } from '../../../domain/repository/iuser.repository';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import authConfig from '../../../../config/authConfig';
import { ConfigType } from '@nestjs/config';
import { UserEntity } from '../entity/user.entity';


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
        private userFactory: UserFactory,
        private dataSource: DataSource
    ) { }

    private async generateHash(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(this.config.round);
        return await bcrypt.hash(password, salt);
    }

    async create(user: User): Promise<void> {
        const { userId, userName, password } = user;
        const hashedPassword = await this.generateHash(password);

        await this.dataSource.transaction<void>(async manager => {
            const user = new UserEntity();
            user.userId = userId;
            user.userName = userName;
            user.password = hashedPassword;
            await manager.save(user);
        });
    }

    async update(userId: string, userName?: string, password?: string): Promise<void> {
        await this.dataSource.transaction<void>(async manager => {
            const user = await manager.findOneBy(UserEntity, {userId: userId});

            if (password != undefined)
                user.password = await this.generateHash(password);
                
            if (userName != undefined)
                user.userName = userName

            await manager.save(user);
        });
    }
    async delete(userId: string): Promise<void> {
        await this.userRepository.delete({userId: userId});
    }
    
    async findByUserId(userId: string): Promise<User | null> {
        const userEntity: UserEntity | null = await this.userRepository.findOneBy({userId: userId});

        if (userEntity == null)
            return null;

        return this.userFactory.reconstitute(userEntity.userId, userEntity.userName, userEntity.password)
    }
}