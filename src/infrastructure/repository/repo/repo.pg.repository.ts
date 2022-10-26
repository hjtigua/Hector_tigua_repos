import { Parser } from 'json2csv';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepoRepository } from 'src/domain/repository/repo-repository';
import { RepositoryMetricsEntity } from 'src/domain/repository/repository-metrics.entity';
import { Repository } from 'typeorm';
import { RepositoryModel } from '../model/repository.model';
import { TribeModel } from '../../tribe/model/tribe.model';
import { RepositoryVerificationEntity } from 'src/domain/repository/repository-verification';
import * as fs from 'fs';

const repositoryStatus = {
  604: 'Verificado',
  605: 'En espera',
  606: 'Aprobado',
};

const repositoryState = {
  E: 'Habilitado',
  D: 'Desabilitado',
  A: 'Archivado',
};

@Injectable()
export class RepoPgRepository implements RepoRepository {
  constructor(
    @InjectRepository(RepositoryModel)
    private readonly repoRepository: Repository<RepositoryModel>,
    @InjectRepository(TribeModel)
    private readonly tribeRepository: Repository<TribeModel>,
  ) {}

  getRepositoryVerification(): Promise<RepositoryVerificationEntity[]> {
    return new Promise((resolve) => {
      const file = fs.readFileSync(
        'src/infrastructure/repository/repo/repositories.mock.json',
        'utf8',
      );
      const repositories: RepositoryVerificationEntity[] = JSON.parse(file);
      resolve(repositories);
    });
  }

  async getMetricsByTribe(tribeID: string): Promise<any> {
    await this.checkTribeOrFail(tribeID);
    const repositoryInfo = await this.getMetricsByTribeQuery(tribeID);
    if (repositoryInfo.length === 0)
      throw new BadRequestException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );

    const repositoriesValidation = await this.getRepositoryVerification();
    const results = this.MapRepositories(
      repositoriesValidation,
      repositoryInfo,
    );
    return results;
  }

  async getCSVFile(tribeID: string): Promise<string> {
    const repositories = await this.getMetricsByTribe(tribeID);
    const parser = new Parser({ fields: Object.keys(repositories[0]) });
    const csv = parser.parse(repositories);
    return csv;
  }

  private async checkTribeOrFail(tribeID: string): Promise<void> {
    const tribe = await this.tribeRepository.findOneBy({ id_tribe: tribeID });
    if (!tribe)
      throw new BadRequestException('La Tribu no se encuentra registrada');
  }

  private async getMetricsByTribeQuery(
    tribeID: string,
  ): Promise<RepositoryMetricsEntity[]> {
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
      .getRawMany<RepositoryMetricsEntity>();
    return result;
  }

  private RepositoriesVerificationToMap(
    repositoriesValidation: RepositoryVerificationEntity[],
  ): Map<string, RepositoryVerificationEntity> {
    const map = new Map<string, RepositoryVerificationEntity>();
    repositoriesValidation.forEach((repository) => {
      map.set(repository.id, repository);
    });
    return map;
  }

  private MapRepositories(
    repositoriesValidation: RepositoryVerificationEntity[],
    repositoryMetrics: RepositoryMetricsEntity[],
  ) {
    const repositoriesMap = this.RepositoriesVerificationToMap(
      repositoriesValidation,
    );
    const results = repositoryMetrics.map((repository) => {
      const repositoryValidation = repositoriesMap.get(repository.id);
      repository.verificationState =
        repositoryStatus[repositoryValidation.state];
      repository.state = repositoryState[repository.state];
      repository.coverage = `${repository.coverage}%`;
      return repository;
    });
    return results;
  }
}
