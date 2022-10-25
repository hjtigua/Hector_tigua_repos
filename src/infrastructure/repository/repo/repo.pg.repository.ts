import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoRepository } from 'src/domain/repository/repo-repository';
import { RepositoryMetricsEntity } from 'src/domain/repository/repository-metrics.entity';
import { Repository } from 'typeorm';
import { RepositoryModel } from '../model/repository.model';
import { TribeModel } from '../../tribe/model/tribe.model';

@Injectable()
export class RepoPgRepository implements RepoRepository {
  constructor(
    @InjectRepository(RepositoryModel)
    private readonly repoRepository: Repository<RepositoryModel>,
    @InjectRepository(TribeModel)
    private readonly tribeRepository: Repository<TribeModel>,
  ) {}

  async getMetricsByTribe(tribeID: string): Promise<any> {
    await this.checkTribeOrFail(tribeID);
    const repositoryInfo = await this.getMetricsByTribeQuery(tribeID);
    if (repositoryInfo.length === 0)
      throw new BadRequestException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    return repositoryInfo;
  }

  private async checkTribeOrFail(tribeID: string): Promise<void> {
    const tribe = await this.tribeRepository.findOneBy({ id_tribe: tribeID });
    if (!tribe)
      throw new BadRequestException('La Tribu no se encuentra registrada');
  }

  private async getMetricsByTribeQuery(tribeID: string): Promise<any[]> {
    const builder = this.repoRepository.createQueryBuilder('repository');
    const result = await builder
      .leftJoin('repository.tribe', 'tribe')
      .leftJoin('repository.metrics', 'metrics')
      .leftJoin('tribe.organization', 'organization')
      .select([
        'repository.id_repository as id',
        'repository.name as name',
        'tribe.name as tribe',
        'organization.name as organization',
        'metrics.coverage as coverage',
        'metrics.code_smells as codesmells',
        'metrics.bugs as bugs',
        'metrics.vulnerabilities as vulnerabilities',
        'metrics.hostpot as hostpots',
        'repository.state as state',
      ])
      .where('repository.id_tribe = :tribeID', { tribeID })
      .andWhere('repository.state = :state', { state: 'E' })
      .andWhere('metrics.coverage > :coverage', { coverage: 75 })
      .andWhere("DATE_PART('YEAR', repository.create_time) = :year", {
        year: new Date().getFullYear(),
      })
      .getRawMany();
    return result;
  }
}
