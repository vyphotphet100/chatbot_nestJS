import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { IntentService } from './intent.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { CommandGetListIntent } from './command/getListIntent.command';

@Controller('/intents')
export class IntentController {
  constructor(private readonly intentService: IntentService) {}

  @Get()
  async getAll(@Body() command: CommandGetListIntent): Promise<ResponseData> {
    try {
      return new ResponseData(
        await this.intentService.getAll(command),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async add() {
    
  }
}
