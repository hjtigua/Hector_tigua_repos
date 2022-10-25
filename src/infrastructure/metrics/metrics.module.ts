import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsModel } from './model/metrics.model';

@Module({
  imports: [TypeOrmModule.forFeature([MetricsModel])],
})
export class MetricsModule {}
