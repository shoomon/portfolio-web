import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { CreateDiaryDto, UpdateDiaryDto } from 'src/dtos/diary.dto';

@Controller('diaries')
export class DiariesController {
    constructor(
        private readonly diryService: DiariesService,
    ) { }

    @Get()
    async get(@Query('page') page: number = 1, @Query('size') size: number = 10) {
        return this.diryService.get(page, size);
    }

    @Post()
    async create(@Body() createDiaryRequest: CreateDiaryDto) {
        return this.diryService.create(createDiaryRequest);
    }

    @Patch(`:id`)
    async update(@Param(`id`) id: number, @Body() updateDiaryRequest: UpdateDiaryDto) {
        return this.diryService.update(id, updateDiaryRequest);

    }

    @Delete(`:id`)
    async delete(@Param(`id`) id: number) {
        return this.diryService.delete(id);
    }
}
