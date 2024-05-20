import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportDto } from 'src/dtos/report.dto';
import { Guest_BooksService } from 'src/guest_books/guest_books.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('report')
@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService,
        private readonly guest_bookService: Guest_BooksService
    ) { }

    @Get()
    async getAll() {
        return this.reportService.get();
    }

    @Get()
    async getNotReviewed() {
        return this.reportService.getNotReviewed();
    }

    @Post()
    async createReport(@Body() reportDto: ReportDto) {
        return await this.reportService.report(reportDto);
    }

    @Patch(':id')
    async restore(@Param() id: number) {
        return this.reportService.restorePost(id);
    }
}
