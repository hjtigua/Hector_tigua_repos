import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPokemonDto: UpdateOrganizationDto,
  ): Promise<OrganizationEntity> {
    return this.organizationUseCase.updateOrganization(id, createPokemonDto);
  }

  @Get()
  async getAll() {
    const organizations = await this.organizationUseCase.getAllOrganizations();
    return {
      organizations: organizations,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.organizationUseCase.deleteOrganization(id);
    return {
      message: 'Organization deleted',
    };
  }
}
