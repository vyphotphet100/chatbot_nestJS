import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IntentEntity } from './intent.entity';

@Entity('pattern')
export class PatternEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => IntentEntity, (intent) => intent.patterns)
  intent: IntentEntity;
}
