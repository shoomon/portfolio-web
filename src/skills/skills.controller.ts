import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto, UpadateSkillDto } from 'src/dtos/skill.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('skill')
@Controller('skills')
export class SkillsController {
    constructor(
        private readonly skillsService: SkillsService,
    ) { }

    @Get()
    async get() {
        return this.skillsService.get();
    }

    @Post()
    async create(@Body() CreateSkillRequest: CreateSkillDto) {
        return this.skillsService.create(CreateSkillRequest);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() UpdateSkillRequest: UpadateSkillDto) {
        return this.skillsService.update(id, UpdateSkillRequest);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.skillsService.delete(id);
    }
}
