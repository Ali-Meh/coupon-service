import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,Index } from "typeorm";
import { DatedEntity } from "./base";
import {Product,Category} from '.'


@Entity()
export class Coupon extends DatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Index()
    @Column({ unique: true, nullable: false })
    code: string;

    @Column("decimal")
    percent:number

    @ManyToMany(() => Product, product => product.coupons ,{cascade:true,onUpdate:"CASCADE"})
    @JoinTable()
    products: Product[];

    @ManyToMany(() => Category,category => category.coupons ,{cascade:true,onUpdate:"CASCADE"})
    @JoinTable()
    categories: Category[];
}
