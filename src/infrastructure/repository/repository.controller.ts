import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { RepositoryUseCase } from '../../application/repositoryUseCase';
import type { Response } from 'express';
import { Readable } from 'stream';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryUseCase: RepositoryUseCase) {}

  @Get('/tribe/:tribeID')
  async getMetricsByTribe(@Param('tribeID', ParseUUIDPipe) tribeID: string) {
    const repositoryInfo = await this.repositoryUseCase.getMetricsByTribe(
      tribeID,
    );
    return {
      repositories: repositoryInfo,
    };
  }

  @Get('/verificationRepositories')
  async getVerificationRepositories() {
    const repositories =
      await this.repositoryUseCase.getRepositoryVerification();
    return {
      repositories: repositories,
    };
  }

  @Get('/getCSV/:tribeID')
  async getCSVFile(
    @Res({ passthrough: true }) res: Response,
    @Param('tribeID', ParseUUIDPipe) tribeID: string,
  ) {
    const csv = await this.repositoryUseCase.getCSVFile(tribeID);
    const dd = new Readable();
    dd.push(csv);
    dd.push(null);
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="metricas_repository.csv"',
    });
    return new StreamableFile(dd);
  }
}
