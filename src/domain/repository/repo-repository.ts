import { Injectable } from '@nestjs/common';
import { RepositoryMetricsEntity } from './repository-metrics.entity';

@Injectable()
export abstract class RepoRepository {
  abstract getMetricsByTribe(tribeID: string): Promise<RepositoryMetricsEntity>;
}
