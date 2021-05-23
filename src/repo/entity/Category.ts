import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Tree, TreeChildren,TreeParent,ManyToMany } from "typeorm";
import { DatedEntity } from "./base";
import {Product} from '.'
import { Coupon } from "./Coupon";


@Entity()
@Tree("closure-table")
export class Category extends DatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

    @OneToOne(type => Product,product=>product.category,{ nullable: true,cascade:true,onUpdate:"CASCADE" })
    product: Product;

    @ManyToMany(() => Coupon,coupon=>coupon.categories)
    coupons: Coupon[];


}
