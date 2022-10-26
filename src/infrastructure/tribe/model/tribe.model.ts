import { OrganizationModel } from 'src/infrastructure/organization/model/organization.model';
import { RepositoryModel } from 'src/infrastructure/repository/model/repository.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('tribe')
export class TribeModel {
  @PrimaryColumn('uuid')
  id_tribe: string;

  @Column('varchar', { length: 2, nullable: false })
  name: string;

  @Column('int4', { nullable: false })
  status: number;

  /*Relations*/
  @OneToMany(() => RepositoryModel, (repository) => repository.tribe)
  repositories: RepositoryModel[];

  @ManyToOne(() => OrganizationModel, (organization) => organization.tribes)
  @JoinColumn({ name: 'id_organization' })
  organization: OrganizationModel;
}
