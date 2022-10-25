import { CreateOrganizationDto } from 'src/domain/organization/create-organization.dto';
import { OrganizationEntity } from 'src/domain/organization/organization.entity';
import { OrganizationRepository } from 'src/domain/organization/organization.repository';
import { OrganizationValue } from 'src/domain/organization/organization.value';

export class OrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async createOrganization(
    organization: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    const organizationValue = new OrganizationValue(organization);
    return await this.organizationRepository.create(organizationValue);
  }

  //   async updateOrganization(organization: OrganizationEntity): Promise<OrganizationEntity> {
  //     return await this.organizationRepository.update(organization);
  //   }

  //   async deleteOrganization(id: number): Promise<OrganizationEntity> {
  //     return await this.organizationRepository.delete(id);
  //   }

  //   async getAllOrganizations(): Promise<OrganizationEntity[]> {
  //     return await this.organizationRepository.getAll();
  //   }
}
