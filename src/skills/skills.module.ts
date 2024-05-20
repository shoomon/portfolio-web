import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from 'src/entities/skills.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Portfolio } from 'src/entities/portfolio.entiy';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Module({
    imports: [TypeOrmModule.forFeature([Skills, Portfolio])],
    controllers: [SkillsController],
    providers: [SkillsService, PortfolioService]
})
export class SkillsModule { }
