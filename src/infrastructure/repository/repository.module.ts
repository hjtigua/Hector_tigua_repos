import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryUseCase } from 'src/application/repositoryUseCase';
import { RepoRepository } from 'src/domain/repository/repo-repository';
import { TribeModule } from '../tribe/tribe.module';
import { RepositoryModel } from './model/repository.model';
import { RepoPgRepository } from './repo/repo.pg.repository';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryModel]), TribeModule],
  controllers: [RepositoryController],
  providers: [
    RepositoryUseCase,
    {
      provide: RepoRepository,
      useClass: RepoPgRepository,
    },
  ],
})
export class RepositoryModule {}
