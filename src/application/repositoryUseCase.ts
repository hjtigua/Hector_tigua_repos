import { Injectable } from '@nestjs/common';
import { RepositoryMetricsEntity } from 'src/domain/repository/repository-metrics.entity';
import { RepositoryVerificationEntity } from 'src/domain/repository/repository-verification';
import { RepoRepository } from '../domain/repository/repo-repository';

@Injectable()
export class RepositoryUseCase {
  constructor(private readonly repoRepository: RepoRepository) {}

  async getMetricsByTribe(tribeID: string): Promise<RepositoryMetricsEntity> {
    return await this.repoRepository.getMetricsByTribe(tribeID);
  }

  async getRepositoryVerification(): Promise<RepositoryVerificationEntity[]> {
    return await this.repoRepository.getRepositoryVerification();
  }

  getCSVFile(tribeID: string): Promise<string> {
    return this.repoRepository.getCSVFile(tribeID);
  }
}
