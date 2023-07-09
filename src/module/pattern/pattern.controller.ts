import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { CommandGetListPattern } from './command/getListPattern.command';
import { camelCaseToSnakeCase, snakeCaseToCamelCase } from 'src/global/globalFunction';

@Controller('patterns')
export class PatternController {
  constructor(
    private readonly patternService: PatternService,
  ) {}

  @Post()
  async getAll(@Body() command: CommandGetListPattern): Promise<ResponseData> {
    command = snakeCaseToCamelCase(command);
    try {
      return camelCaseToSnakeCase(
        new ResponseData(
          await this.patternService.getList(command),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return camelCaseToSnakeCase(
        new ResponseData(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessage.ERROR,
        ),
      );
    }
  }

  @Get("/intents")
  async getAllIntents(): Promise<ResponseData> {
    try {
      return camelCaseToSnakeCase(
        new ResponseData(
          await this.patternService.getIntents(),
          HttpStatus.OK,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return camelCaseToSnakeCase(
        new ResponseData(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessage.ERROR,
        ),
      );
    }
  }
}
