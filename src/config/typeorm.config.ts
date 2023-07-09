// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IntentEntity } from 'src/entity/intent.entity';
import { PatternEntity } from 'src/entity/pattern.entity';
import { UserEntity } from 'src/entity/user.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'chatbot_expressJS',
  entities: [IntentEntity, PatternEntity, UserEntity],
  synchronize: true,
};

export default typeOrmConfig;
