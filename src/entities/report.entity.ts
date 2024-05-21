import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Guest_Book } from './guest_books.entity';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reason: string;

    @Column()
    guestBookId: number;

    @Column({ default: false })
    isReviewed: boolean = false;
}
