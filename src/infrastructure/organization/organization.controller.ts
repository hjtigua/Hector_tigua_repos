import { Body, Controller, Post } from '@nestjs/common';
import { OrganizationUseCase } from 'src/application/organizationUseCase';
import { CreateOrganizationDto } from 'src/domain/organization/create-organization.dto';
import { OrganizationEntity } from '../../domain/organization/organization.entity';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationUseCase: OrganizationUseCase) {}

  @Post()
  create(
    @Body() createPokemonDto: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return this.organizationUseCase.createOrganization(createPokemonDto);
  }
}
