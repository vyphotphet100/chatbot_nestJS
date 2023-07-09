import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatternEntity } from './pattern.entity';

@Entity('intent')
export class IntentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => PatternEntity, (pattern) => pattern.intent)
  patterns: PatternEntity[];
}
