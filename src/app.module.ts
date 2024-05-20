import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaries } from './entities/diaries.entity';
import { PortfolioModule } from './portfolio/portfolio.module';
import { SkillsModule } from './skills/skills.module';
import { DiariesModule } from './diaries/diaries.module';
import { Guest_BooksModule } from './guest_books/guest_books.module';
import { ReportsModule } from './reports/reports.module';
import { Guest_Book } from './entities/guest_books.entity';
import { Portfolio } from './entities/portfolio.entiy';
import { Skills } from './entities/skills.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'portfolioweb',
    synchronize: true,
    entities: [Diaries, Guest_Book, Portfolio, Skills, Report],
  }), PortfolioModule, SkillsModule, DiariesModule, Guest_BooksModule, ReportsModule,],
})
export class AppModule {
  constructor() {
    process.env.TZ = 'Asia/Seoul';
  }
}
