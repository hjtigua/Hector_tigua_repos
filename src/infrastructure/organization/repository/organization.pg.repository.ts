import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from 'src/domain/organization/create-organization.dto';
import { OrganizationEntity } from 'src/domain/organization/organization.entity';
import { OrganizationRepository } from 'src/domain/organization/organization.repository';
import { Repository } from 'typeorm';
import { OrganizationModel } from '../model/organization.model';

@Injectable()
export class OrganizationPgRepository implements OrganizationRepository {
  constructor(
    @InjectRepository(OrganizationModel)
    private readonly organizationRepository: Repository<OrganizationModel>,
  ) {}

  async create(
    organizationDto: OrganizationEntity,
  ): Promise<OrganizationEntity> {
    const newOrganization = this.organizationRepository.create(organizationDto);
    const createdOrganization = await this.organizationRepository.save(
      newOrganization,
    );
    const organizationEntity: OrganizationEntity = {
      id_organization: createdOrganization.id_organization,
      name: createdOrganization.name,
      status: createdOrganization.status,
    };
    return organizationEntity;
  }
  update(organization: OrganizationEntity): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<OrganizationEntity[]> {
    throw new Error('Method not implemented.');
  }
}
