import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('organization')
export class OrganizationModel {
  @PrimaryColumn('uuid')
  id_organization: string;

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @Column('int4', { nullable: false })
  status: number;
}
