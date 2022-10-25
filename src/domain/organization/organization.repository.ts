import { OrganizationEntity } from './organization.entity';

export interface OrganizationRepository {
  create(organization: OrganizationEntity): Promise<OrganizationEntity>;
  update(organization: OrganizationEntity): Promise<OrganizationEntity>;
  delete(id: number): Promise<OrganizationEntity>;
  getAll(): Promise<OrganizationEntity[]>;
}
