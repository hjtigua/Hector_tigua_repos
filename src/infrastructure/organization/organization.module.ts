import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModel } from './model/organization.model';
import { OrganizationUseCase } from 'src/application/organizationUseCase';
import { OrganizationRepository } from 'src/domain/organization/organization.repository';
import { OrganizationPgRepository } from './repository/organization.pg.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationModel])],
  controllers: [OrganizationController],
  providers: [
    OrganizationUseCase,
    {
      provide: OrganizationRepository,
      useClass: OrganizationPgRepository,
    },
  ],
})
export class OrganizationModule {}
