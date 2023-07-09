import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { camelCaseToSnakeCase } from 'src/global/globalFunction';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { LoginDTO } from 'src/dto/LoginDTO';
import { JwtAuthGuard } from 'src/jwt/JwtAuthGuard';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from 'src/jwt/JwtPayload';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<ResponseData> {
    try {
      return camelCaseToSnakeCase(
        new ResponseData(
          await this.userService.login(loginDto),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return camelCaseToSnakeCase(
        new ResponseData(null, HttpStatus.INTERNAL_SERVER_ERROR, error.message),
      );
    }
  }

  @Get('/details')
  @UseGuards(JwtAuthGuard)
  async getDetail(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken: JwtPayload = await this.authService.decodeToken(token);
    console.log(decodedToken);
    return this.userService.findUserByUsername(decodedToken.username);
    
  }
}
