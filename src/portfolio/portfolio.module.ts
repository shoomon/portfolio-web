import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/entities/portfolio.entiy';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
    imports: [TypeOrmModule.forFeature([Portfolio])],
    controllers: [PortfolioController],
    providers: [PortfolioService]
})
export class PortfolioModule { }
