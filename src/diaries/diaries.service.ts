import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto, UpdateDiaryDto } from 'src/dtos/diary.dto';
import { Diaries } from 'src/entities/diaries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiariesService {
    constructor(
        @InjectRepository(Diaries)
        private readonly diariesRepository: Repository<Diaries>,
    ) { }

    async get(page: number, size: number) {
        const [data, total] = await this.diariesRepository.findAndCount({
            skip: (page - 1) * size,
            take: size,
            order: { createdAt: 'DESC' }
        })

        const hasNextPage = (page * size) < total;

        return { data, pageInfo: { page, hasNextPage, total } };
    }

    async create(createDiaryRequest: CreateDiaryDto): Promise<Diaries> {
        const newDiary = this.diariesRepository.create({ ...createDiaryRequest });
        return await this.diariesRepository.save(newDiary);
    }

    async update(id: number, updateDiaryRequest: UpdateDiaryDto) {
        const toUpdate = await this.diariesRepository.findOne({ where: { id: id } });
        if (!toUpdate) {
            throw new NotFoundException(`Diary with id ${id} is not found.`);
        }

        const updatedDiary = { ...toUpdate, ...updateDiaryRequest }

        await this.diariesRepository.save(updatedDiary);
        return this.diariesRepository.findOne({ where: { id: id } });
    }

    async delete(id: number): Promise<void> {
        const toDelete = await this.diariesRepository.findOne({ where: { id: id } });

        if (!toDelete) {
            throw new NotFoundException(`Diary with id ${id} is not found.`);
        }

        await this.diariesRepository.delete(toDelete.id);
        return;
    }
}
