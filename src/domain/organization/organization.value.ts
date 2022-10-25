import { v4 as uuid } from 'uuid';
import { OrganizationEntity } from './organization.entity';

export class OrganizationValue implements OrganizationEntity {
  name: string;
  status: number;
  uuid: string;

  constructor({ name, status }: { name: string; status: number }) {
    this.uuid = uuid();
    this.name = name;
    this.status = status;
  }
}
