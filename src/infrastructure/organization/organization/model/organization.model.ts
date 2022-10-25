import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrganizationModel {
  @PrimaryGeneratedColumn('uuid')
  id_organization: string;

  @Column('varchar', { length: 50, nullable: false })
  name: string;

  @Column('int4', { nullable: false })
  status: number;
}
