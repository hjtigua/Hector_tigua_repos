import { Injectable } from '@nestjs/common';
import { RepositoryMetricsEntity } from './repository-metrics.entity';
import { RepositoryVerificationEntity } from './repository-verification';

@Injectable()
export abstract class RepoRepository {
  abstract getMetricsByTribe(tribeID: string): Promise<RepositoryMetricsEntity>;
  abstract getRepositoryVerification(): Promise<RepositoryVerificationEntity[]>;
}
