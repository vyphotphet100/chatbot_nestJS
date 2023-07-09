import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntentModule } from './module//intent/intent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { PatternModule } from './module/pattern/pattern.module';
import { UserModule } from './module/user/user.module';
import { JwtStrategy } from './jwt/JwtStrategy';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PatternModule,
    IntentModule,
    UserModule,
    AuthModule,
  ],
  providers: [AppService, JwtStrategy],
  controllers: [AppController],
})
export class AppModule {}
