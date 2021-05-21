import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Tree, TreeChildren,TreeParent,ManyToMany,JoinTable } from "typeorm";
import { DatedEntity } from "./base";
import {Product} from '.'
import { Coupon } from "./Coupon";


@Entity()
@Tree("nested-set")
export class Category extends DatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @OneToOne(type => Product,{ nullable: true })
    @JoinColumn()
    product: Product;

    @ManyToMany(() => Coupon)
    @JoinTable()
    coupons: Coupon[];

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;
}
