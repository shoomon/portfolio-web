import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePortfolioDto } from 'src/dtos/portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entiy';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio)
        private readonly portfolioRepository: Repository<Portfolio>,
    ) { }

    async get() {
        return this.portfolioRepository.findOne({ where: { id: 1 }, relations: ['skills'] });
    }

    async getOne() {
        return this.portfolioRepository.findOne({ where: { id: 1 } });
    }

    async update(updateData: UpdatePortfolioDto, id: number = 1) {
        const curPortfolio = await this.portfolioRepository.findOne({ where: { id } });
        const updatedPortfolio = { ...curPortfolio, ...updateData }
        return this.portfolioRepository.save(updatedPortfolio);
    }
}
