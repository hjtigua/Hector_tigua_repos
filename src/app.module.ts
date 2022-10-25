import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
 TypeOrmModule.forRoot({
      type: 'cockroachdb',
      url: 'postgresql://hector:8umsjQTEjp1LzistQb3HoA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/deunaDB?sslmode=verify-full',
      ssl: true,
      extra: {
        options: '--cluster=cyan-ninja-6119',
      },
      logging: false,
    }),
*/
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'deunaDB',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
