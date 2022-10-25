import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { OrganizationUseCase } from 'src/application/organizationUseCase';
import { CreateOrganizationDto } from 'src/domain/organization/create-organization.dto';
import { OrganizationEntity } from '../../domain/organization/organization.entity';
import { UpdateOrganizationDto } from 'src/domain/organization/update-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationUseCase: OrganizationUseCase) {}

  @Post()
  create(
    @Body() createPokemonDto: CreateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return this.organizationUseCase.createOrganization(createPokemonDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createPokemonDto: UpdateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return this.organizationUseCase.updateOrganization(id, createPokemonDto);
  }
}
