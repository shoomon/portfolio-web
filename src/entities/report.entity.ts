import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail({}, { message: '유효하지 않은 이메일 형식입니다.' })
    email: string;

    @Column()
    reason: string;

    @Column({ default: false })
    isReviewed: boolean = false;
}
