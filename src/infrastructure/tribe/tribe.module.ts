import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from '../organization/organization.module';
import { TribeModel } from './model/tribe.model';

@Module({
  imports: [TypeOrmModule.forFeature([TribeModel]), OrganizationModule],
  exports: [TribeModule, TypeOrmModule],
  controllers: [],
})
export class TribeModule {}
