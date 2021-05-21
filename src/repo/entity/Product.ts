import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany,JoinTable } from "typeorm";
import { DatedEntity } from "./base";
import { Category } from "./";
import { Coupon } from "./Coupon";


@Entity()
export class Product extends DatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column("money")
    price: number

    @OneToOne(type => Category)
    @JoinColumn()
    category: Category;

    @ManyToMany(() => Coupon)
    @JoinTable()
    coupons: Coupon[];
}
