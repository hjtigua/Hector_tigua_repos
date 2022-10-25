import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './create-organization.dto';
import { OrganizationEntity } from './organization.entity';
import { UpdateOrganizationDto } from './update-organization.dto';

@Injectable()
export abstract class OrganizationRepository {
  abstract create(
    organization: CreateOrganizationDto,
  ): Promise<OrganizationEntity>;

  abstract update(
    id: string,
    organization: UpdateOrganizationDto,
  ): Promise<OrganizationEntity>;

  abstract delete(id: string): Promise<OrganizationEntity>;

  abstract getAll(): Promise<OrganizationEntity[]>;
}
