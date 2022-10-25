import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from 'src/domain/organization/create-organization.dto';
import { OrganizationEntity } from 'src/domain/organization/organization.entity';
import { OrganizationRepository } from 'src/domain/organization/organization.repository';
import { UpdateOrganizationDto } from 'src/domain/organization/update-organization.dto';
import { Repository } from 'typeorm';
import { OrganizationModel } from '../model/organization.model';

@Injectable()
export class OrganizationPgRepository implements OrganizationRepository {
  constructor(
    @InjectRepository(OrganizationModel)
    private readonly organizationRepository: Repository<OrganizationModel>,
  ) {}

  async create(
    organizationDto: CreateOrganizationDto,
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

  async update(
    id: string,
    organizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationEntity> {
    const toUpdateOrganization = await this.organizationRepository.preload({
      id_organization: id,
      ...organizationDto,
    });
    if (!toUpdateOrganization)
      throw new NotFoundException(`Organization with ID "${id}" not found`);
    return await this.organizationRepository.save(toUpdateOrganization);
  }

  getAll(): Promise<OrganizationEntity[]> {
    return this.organizationRepository.find();
  }

  delete(id: number): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }
  private async findOne(id: string): Promise<OrganizationModel> {
    const organization: OrganizationModel =
      await this.organizationRepository.findOne({
        where: { id_organization: id },
      });
    return organization;
  }
}
