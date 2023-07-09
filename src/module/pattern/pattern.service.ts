import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatternEntity } from 'src/entity/pattern.entity';
import { QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { CommandGetListPattern } from './command/getListPattern.command';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { IntentService } from '../intent/intent.service';
import { CommandGetListIntent } from '../intent/command/getListIntent.command';

@Injectable()
export class PatternService {
  constructor(
    @InjectRepository(PatternEntity)
    private readonly patternRepo: Repository<PatternEntity>,
    @Inject(forwardRef(() => IntentService))
    private readonly intentService: IntentService
  ) {}

  async getList(command: CommandGetListPattern): Promise<PatternEntity[]> {
    let queryBuilder: SelectQueryBuilder<PatternEntity> = this.buildQueryBuilder(command).select();

    return await queryBuilder.getMany();
  }

  async getIntents(): Promise<ResponseData> {
    return new ResponseData(await this.intentService.getAll(new CommandGetListIntent()), HttpStatus.OK, HttpMessage.SUCCESS);
  }

  private buildQueryBuilder(command: CommandGetListPattern): QueryBuilder<PatternEntity> {
    let queryBuilder: QueryBuilder<PatternEntity> = this.patternRepo.createQueryBuilder('pattern'); 

    if (command?.id != null) {
        queryBuilder.select().andWhere('pattern.id = :id', {id: command.id});
    }

    if (command?.ids != null && command?.ids?.length > 0) {
        queryBuilder.select().andWhere('pattern.id IN (:ids)', {ids: command.ids})
    }

    if (command?.intentId != null) {
        queryBuilder.select().andWhere('pattern.intentId = :id', {id: command.intentId})
    }

    if (command?.intentIds != null && command?.intentIds?.length > 0) {
        queryBuilder.select().andWhere('pattern.intentId IN (:ids)', {ids: command.intentIds})
    }

    if (command?.keyword != null && command?.keyword?.length !== 0) {
        queryBuilder.select().andWhere('pattern.content LIKE :keyword', {keyword: `%${command.keyword}%` })
    }

    if (command?.returnFields != null && command?.returnFields?.length != 0) {
        let returnFields = [];
        command.returnFields.forEach((f:string) => {
            returnFields.push('pattern.' + f);
        })
        
        queryBuilder.select(returnFields);
    }

    if (command?.hasIntent != null && command?.hasIntent === true) {
        queryBuilder.select().leftJoinAndSelect("pattern.intent", "intent");
    }

    if (command?.checkPageAndSize === true && command?.page != null && command?.size != null) {
        const skip = (command.page - 1) * command.size;
        queryBuilder.select().skip(skip).take(command.size);
    }

    return queryBuilder;
  }
}
