import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constant';
import { JwtModuleOptions } from './jwt.interface';
import { JwtModule } from './jwt.module';

@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    ) {}

    sign(user_id: string) : string { // 로그인되면 토큰발행 
        return jwt.sign({user_id : user_id}, this.options.privateKey)
    }
}
