import { ApiProperty } from "@nestjs/swagger";

export class ReportDto {
    @ApiProperty({ description: '신고할 게시글' })
    id: number;

    @ApiProperty({ description: '신고자 메일 주소' })
    email: string;

    @ApiProperty({ description: '신고사유' })
    reason: string;
}