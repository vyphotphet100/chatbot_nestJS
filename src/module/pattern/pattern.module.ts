import { Module, forwardRef } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { PatternController } from './pattern.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternEntity } from 'src/entity/pattern.entity';
import { IntentModule } from '../intent/intent.module';
import { IntentEntity } from 'src/entity/intent.entity';
import { IntentService } from '../intent/intent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatternEntity]),
    forwardRef(() => IntentModule),
  ],
  controllers: [PatternController],
  providers: [IntentService, PatternService],
  exports: [TypeOrmModule.forFeature([PatternEntity]), PatternService]
})
export class PatternModule {}
