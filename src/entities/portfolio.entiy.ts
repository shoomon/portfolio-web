import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Skills } from "./skills.entity";

@Entity()
export class Portfolio {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    contents: string;

    @Column()
    name: string;

    @Column()
    birth: string;

    @Column()
    locate: string;

    @Column()
    graduated: string;

    @Column()
    eMail: string;

    @OneToMany(() => Skills, skills => skills.portfolio)
    skills: Skills[];

    @Column()
    gitUrl: string;
}