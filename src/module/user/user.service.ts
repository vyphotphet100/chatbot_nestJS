import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/dto/LoginDTO';
import { UserEntity } from 'src/entity/user.entity';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { JwtPayload } from 'src/jwt/JwtPayload';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async login(loginDto: LoginDTO): Promise<UserEntity> {
    if (!loginDto.username || !loginDto.password) {
      throw new Error('missing_param');
    }

    let user = await this.userRepo
      .createQueryBuilder('user')
      .select()
      .andWhere('user.username = :username AND user.password = :password', {
        username: loginDto.username,
        password: loginDto.password,
      })
      .getOne();

    if (!user) {
      throw new Error('login_fail');
    }

    const jwtPayload: JwtPayload = {
        username: user.username,
        fullName: user.fullName
    }

    const token = this.authService.sign(jwtPayload); 
    user.token = token;

    return user;
  }

  async findUserByUsername(username: string): Promise<UserEntity> {
    if (!username) {
      return null;
    }

    return await this.userRepo
      .createQueryBuilder('user')
      .select()
      .andWhere('user.username = :username', {
        username: username,
      })
      .getOne();
  }
}
