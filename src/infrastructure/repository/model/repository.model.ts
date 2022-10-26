import { MetricsModel } from 'src/infrastructure/metrics/model/metrics.model';
import { TribeModel } from 'src/infrastructure/tribe/model/tribe.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('repository')
export class RepositoryModel {
  @PrimaryColumn('uuid')
  id_repository: string;

  @Column('varchar', { length: 2, nullable: false })
  name: string;

  @Column('varchar', { length: 1, nullable: false })
  state: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: false })
  create_time: Date;

  @Column('varchar', { nullable: false })
  status: string;

  /*Relations*/
  @ManyToOne(() => TribeModel, (tribe) => tribe.repositories)
  @JoinColumn({ name: 'id_tribe' })
  tribe: TribeModel;

  @OneToOne(() => MetricsModel)
  @JoinColumn({ name: 'id_repository' })
  metrics: MetricsModel;
}
