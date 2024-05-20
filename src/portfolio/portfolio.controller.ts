import { Body, Controller, Get, Patch } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto } from 'src/dtos/portfolio.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Portfolio } from 'src/entities/portfolio.entiy';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
    constructor(
        private readonly portfolioService: PortfolioService
    ) { }
    @Get()
    @ApiOkResponse({ type: Portfolio })
    async get() {
        return this.portfolioService.get();
    }

    @Patch()
    @ApiBody(({ type: UpdatePortfolioDto }))
    async update(@Body() updateData: UpdatePortfolioDto) {
        return this.portfolioService.update(updateData);
    }
}
