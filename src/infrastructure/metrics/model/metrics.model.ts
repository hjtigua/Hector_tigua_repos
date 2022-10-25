import { TribeModel } from 'src/infrastructure/tribe/model/tribe.model';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('metrics')
export class MetricsModel {
  @PrimaryColumn('uuid')
  id_repository: string;

  @Column('float4', { nullable: false })
  coverage: number;

  @Column('int4', { nullable: false })
  vulnerabilities: number;

  @Column('int4', { nullable: false })
  hostpot: number;

  @Column('int4', { nullable: false })
  code_smells: number;

  @Column('int4', { nullable: false })
  bugs: number;

  /*Relations*/
  //   @OneToMany(() => TribeModel, (tribe) => tribe.organization)
  //   tribes: TribeModel[];
}
