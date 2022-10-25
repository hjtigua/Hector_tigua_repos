import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TribeModel } from './model/tribe.model';

@Module({
  imports: [TypeOrmModule.forFeature([TribeModel])],
  exports: [TribeModule, TypeOrmModule],
})
export class TribeModule {}
