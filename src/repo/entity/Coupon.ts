import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { DatedEntity } from "./base";
import {Product,Category} from '.'


@Entity()
export class Coupon extends DatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true, nullable: false })
    code: string;

    @Column("float",{nullable: false})
    percent:number

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}