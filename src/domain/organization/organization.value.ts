import { v4 as uuid } from 'uuid';
import { OrganizationEntity } from './organization.entity';

export class OrganizationValue implements OrganizationEntity {
  name: string;
  status: number;
  id_organization: string;

  constructor({ name, status }: { name: string; status: number }) {
    this.id_organization = uuid();
    this.name = name;
    this.status = status;
  }
}
