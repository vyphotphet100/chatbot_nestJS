import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt/JwtPayload';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async decodeToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }
}
