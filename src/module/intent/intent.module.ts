import { Module, forwardRef } from '@nestjs/common';
import { IntentController } from './intent.controller';
import { IntentService } from './intent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentEntity } from 'src/entity/intent.entity';
import { PatternModule } from '../pattern/pattern.module';
import { PatternService } from '../pattern/pattern.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntentEntity]),
    forwardRef(() => PatternModule),
  ],
  controllers: [IntentController],
  providers: [IntentService, PatternService],
  exports: [TypeOrmModule.forFeature([IntentEntity]), IntentService],
})
export class IntentModule {}
