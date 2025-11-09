import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { ApplicationsModule } from './modules/applications/applications.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ApplicationsModule],
})
export class AppModule {}
