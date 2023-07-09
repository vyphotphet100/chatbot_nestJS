import {
    Inject,
    Injectable,
    UnauthorizedException,
    forwardRef,
  } from '@nestjs/common';
  import { PassportStrategy } from '@nestjs/passport';
  import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/module/user/user.service';
import { JwtPayload } from './JwtPayload';
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @Inject(forwardRef(() => UserService))
      private readonly userService: UserService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'yourSecretKey', // Replace with your secret key for signing JWT
      });
    }
  
    async validate(payload: JwtPayload) {
      const user = await this.userService.findUserByUsername(payload.username);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return user;
    }
  }
  