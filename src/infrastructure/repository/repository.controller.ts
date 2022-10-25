import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { RepositoryVerificationEntity } from 'src/domain/repository/repository-verification';
import { RepositoryUseCase } from '../../application/repositoryUseCase';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryUseCase: RepositoryUseCase) {}

  @Get('/tribe/:tribeID')
  async getMetricsByTribe(@Param('tribeID', ParseUUIDPipe) tribeID: string) {
    const repositoryInfo = await this.repositoryUseCase.getMetricsByTribe(
      tribeID,
    );
    return repositoryInfo;
  }

  @Get('/verificationRepositories')
  async getVerificationRepositories(): Promise<RepositoryVerificationEntity> {
    return await this.repositoryUseCase.getRepositoryVerification();
  }
}
