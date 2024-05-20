import { ApiProperty } from "@nestjs/swagger";
import { Part } from "src/entities/part.enum";

export class CreateSkillDto {
    @ApiProperty({ description: '스킬명' })
    name: string;

    @ApiProperty({ description: '스킬 이미지' })
    imageUrl?: string;

    @ApiProperty({ description: '스킬 분류' })
    part: Part;

    @ApiProperty({ description: '스킬 노출 순서' })
    index: number;
}

export class UpadateSkillDto {
    @ApiProperty({ description: '스킬명' })
    name?: string;

    @ApiProperty({ description: '스킬 이미지' })
    imageUrl?: string;

    @ApiProperty({ description: '스킬 분류' })
    part?: Part;

    @ApiProperty({ description: '스킬 노출 순서' })
    index?: number;
}