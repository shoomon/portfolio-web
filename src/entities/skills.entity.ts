import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Portfolio } from "./portfolio.entiy";
import { Part } from "./part.enum";

@Entity()
export class Skills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageUrl: string = "";

    @Column()
    imageWidth: number = 0;

    @Column()
    imageHeight: number = 0;

    @Column({ type: 'enum', enum: Part, default: Part.Tools })
    part: Part;

    @Column()
    index: number;

    @ManyToOne(() => Portfolio, portfolio => portfolio.skills)
    portfolio: Portfolio;
}