import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaries } from 'src/entities/diaries.entity';
import { DiariesController } from './diaries.controller';
import { DiariesService } from './diaries.service';

@Module({
    imports: [TypeOrmModule.forFeature([Diaries])],
    controllers: [DiariesController],
    providers: [DiariesService]
})
export class DiariesModule { }
