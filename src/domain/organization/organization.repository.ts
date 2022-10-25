import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './create-organization.dto';
import { OrganizationEntity } from './organization.entity';

@Injectable()
export abstract class OrganizationRepository {
  abstract create(
    organization: CreateOrganizationDto,
  ): Promise<OrganizationEntity>;
  abstract update(
    organization: OrganizationEntity,
  ): Promise<OrganizationEntity>;
  abstract delete(id: number): Promise<OrganizationEntity>;
  abstract getAll(): Promise<OrganizationEntity[]>;
}
