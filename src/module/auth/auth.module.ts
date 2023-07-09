import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

const jwtConfigModule = JwtModule.register({
  secret: 'yourSecretKey', // Replace with your secret key for signing JWT
  signOptions: { expiresIn: '1h' }, // Set the token expiration time
});

@Module({
  imports: [forwardRef(() => jwtConfigModule)],
  providers: [AuthService, JwtService],
  exports: [AuthService, jwtConfigModule],
})
export class AuthModule {}
