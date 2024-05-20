import { ApiProperty } from "@nestjs/swagger";

export class UpdatePortfolioDto {
    @ApiProperty({ description: '제목' })
    title?: string;

    @ApiProperty({ description: '내용' })
    contents?: string;

    @ApiProperty({ description: '이름' })
    name?: string;

    @ApiProperty({ description: '사는 지역' })
    locate?: string;

    @ApiProperty({ description: '학력' })
    graduated?: string;

    @ApiProperty({ description: '메일주소' })
    eMail?: string;

    @ApiProperty({ description: '깃허브 주소' })
    gitUrl?: string;
}