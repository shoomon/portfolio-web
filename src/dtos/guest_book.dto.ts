import { ApiProperty } from "@nestjs/swagger";

export class CreateGuestBookDto {
    @ApiProperty({ description: '게스트 이름' })
    name: string;

    @ApiProperty({ description: '게시글 비밀번호' })
    password: string;

    @ApiProperty({ description: '내용' })
    contents: string;
}

export class UpdateGuestBookDto {
    @ApiProperty({ description: '변경할 이름' })
    name?: string;

    @ApiProperty({ description: '비밀번호' })
    password: string;

    @ApiProperty({ description: '변경할 내용' })
    contents?: string;
}