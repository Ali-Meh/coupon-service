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

    @Column("decimal",{nullable: false})
    percent:number

    @ManyToMany(() => Product, product => product.coupons ,{cascade:true,onUpdate:"CASCADE"})
    @JoinTable()
    products: Product[];

    @ManyToMany(() => Category,category => category.coupons ,{cascade:true,onUpdate:"CASCADE"})
    @JoinTable()
    categories: Category[];
}
