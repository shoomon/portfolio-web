import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto, UpadateSkillDto } from 'src/dtos/skill.dto';
import { Skills } from 'src/entities/skills.entity';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { MoreThan, Repository } from 'typeorm';

@ApiTags('skill')
@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skills)
        private readonly skillsRepository: Repository<Skills>,
        private readonly portfolioService: PortfolioService,
    ) { }

    async get() {
        return this.skillsRepository.find();
    }

    async create(CreateSkillRequest: CreateSkillDto): Promise<Skills> {
        const portfolio = await this.portfolioService.getOne()
        const existingIdx = await this.skillsRepository.findOne({ where: { index: CreateSkillRequest.index } });
        if (existingIdx) {
            //인덱스를 뒤로 미루는 로직
            const toUpdateIdx = await this.skillsRepository.find({ where: [{ index: MoreThan(CreateSkillRequest.index) }, { index: CreateSkillRequest.index }] });
            toUpdateIdx.forEach(async (skill) => {
                skill.index += 1;
                await this.skillsRepository.save(skill);
            })
        }
        const newSkill = this.skillsRepository.create({ ...CreateSkillRequest, portfolio });
        return this.skillsRepository.save(newSkill);
    }

    async delete(id: number): Promise<void> {
        const toDelete = await this.skillsRepository.findOne({ where: { id: id } });
        if (!toDelete) {
            throw new NotFoundException(`Skill with ID ${id} is not found.`)
        }
        //삭제한 뒤쪽 데이터들의 인덱스를 당겨오는 로직
        const toUpdateIdx = await this.skillsRepository.find({ where: [{ index: MoreThan(toDelete.index) }] });
        toUpdateIdx.forEach(async (skill) => {
            skill.index -= 1;
            await this.skillsRepository.save(skill);
        })
        await this.skillsRepository.delete(toDelete.id);
        return;
    }

    async update(id: number, UpdateSkillRequest: UpadateSkillDto): Promise<Skills> {
        const toUpdate = await this.skillsRepository.findOne({ where: { id: id } });
        const existingIdx = await this.skillsRepository.findOne({ where: { index: UpdateSkillRequest.index } });
        if (!toUpdate) {
            throw new NotFoundException(`Skill with ID ${id} id not found.`);
        }
        if (existingIdx) {
            const toUpdateIdx = await this.skillsRepository.find({ where: [{ index: MoreThan(UpdateSkillRequest.index) }, { index: UpdateSkillRequest.index }] });
            toUpdateIdx.forEach(async (skill) => {
                skill.index += 1;
                await this.skillsRepository.save(skill);
            })
        }
        const updatedSkill = { ...toUpdate, ...UpdateSkillRequest };

        await this.skillsRepository.save(updatedSkill);
        return this.skillsRepository.findOne({ where: { id: id } });
    }
}
