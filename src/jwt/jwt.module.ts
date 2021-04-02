import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constant';
import { JwtModuleOptions } from './jwt.interface';
import { JwtService } from './jwt.service';

@Module({})
@Global() // 전역에서 사용할수있게 설정 , appmodule 가서 설정 잊지말자
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide : CONFIG_OPTIONS,
          useValue : options,
        },
        JwtService,
      ],
    }
  }
}
