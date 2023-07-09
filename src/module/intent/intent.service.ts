import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntentEntity } from 'src/entity/intent.entity';
import { PatternEntity } from 'src/entity/pattern.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommandGetListIntent } from './command/getListIntent.command';
import { PatternService } from '../pattern/pattern.service';

@Injectable()
export class IntentService {
  constructor(
    @InjectRepository(IntentEntity)
    private intentRepository: Repository<IntentEntity>,
    @Inject(forwardRef(() => PatternService))
    private patternService: PatternService
  ) {}

  async getAll(command: CommandGetListIntent): Promise<IntentEntity[]> {
    let selectQueryBuilder: SelectQueryBuilder<IntentEntity> = this.intentRepository.createQueryBuilder('intent'); 

    if (command?.ids?.length != 0) {
        selectQueryBuilder.where('intent.id IN (:ids)', {ids: command.ids})
    }

    return await selectQueryBuilder.getMany();
  }
}
