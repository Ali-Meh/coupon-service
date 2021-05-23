import express from 'express'
import dotenv from 'dotenv'
import request from 'supertest'
import { createConnection,getRepository,getConnection } from "typeorm";
import { Category, Coupon, Product } from "../repo/entity";
let baseurl = '/api/v1/products'//1/promotion/a6a711c494550e1c6ee2?productPrice=100&userId=120
let index: any
let app: any
dotenv.config()
//--------------------setup envirament


    

describe("[Products]", () => {
    beforeAll(async (done) => {
        await createConnection()

        //spinup test express server
        index = require('../router/index')
        app = express();
        app.use(express.urlencoded({ extended: false }))
        app.use(express.json())
        app.use('/', index)

        //clean up database
        await getConnection().dropDatabase()
        await getConnection().runMigrations()
        await getConnection().synchronize()
        done()
    })

    describe("[Query Strings]", () => {
        it("should fail on required query fields", async (done) => {
            request(app)
                .get(`${baseurl}/1/promotion/Not_valid_Promotion_Code`)
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual([
                        {"field": "product_price", "message": "قیمت محصول اجباری است"},
                        {"field": "user_id", "message": "ایدی کاربر اجباری است"}
                    ]);
                })
                .end((error) => (error) ? done.fail(error) : done());
        });
        it("should fail on required query field", async (done) => {
            request(app)
                .get(`${baseurl}/1/promotion/Not_valid_Promotion_Code?product_price=100`)
                .expect(400)
                .expect(function (res) {
                    expect(res.body).toEqual([
                        {"field": "user_id", "message": "ایدی کاربر اجباری است"}
                    ]);
                })
                .end((error) => (error) ? done.fail(error) : done());
        });
    })

    describe("[Promotion]",()=>{
        const tests=[{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_1_PROMOT",
                "Add_promotion_product":0,
                "Add_promotion_category":0,
                "Add_promotion_pcategory":0,
                "code":404,
                "response":{"message":"کد تخفیف پیدا نشد."}
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_2_PROMOT",
                "Add_promotion_product":10,
                "Add_promotion_category":0,
                "Add_promotion_pcategory":0,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_3_PROMOT",
                "Add_promotion_product":0,
                "Add_promotion_category":10,
                "Add_promotion_pcategory":0,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_4_PROMOT",
                "Add_promotion_product":0,
                "Add_promotion_category":0,
                "Add_promotion_pcategory":10,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_5_PROMOT",
                "Add_promotion_product":10,
                "Add_promotion_category":10,
                "Add_promotion_pcategory":0,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_6_PROMOT",
                "Add_promotion_product":0,
                "Add_promotion_category":10,
                "Add_promotion_pcategory":10,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_7_PROMOT",
                "Add_promotion_product":10,
                "Add_promotion_category":10,
                "Add_promotion_pcategory":10,
            },{
                "product_id":0,
                "product_price":200,
                "user_id":1,
                "promotion_code":"TEST_8_PROMOT",
                "Add_promotion_product":10,
                "Add_promotion_category":10,
                "Add_promotion_pcategory":10,
            }]


        beforeAll(async (done)=>{
            await Promise.all(tests.map(async test => {
                let product=new Product();
                let coupon:Coupon;
                product.category=new Category();
                product.category.name=test.promotion_code+"category"
                product.category.parent=new Category();
                product.category.parent.name=test.promotion_code+"paretn_category"
                product.name=test.promotion_code
                product.price=test.product_price

                await product.category.parent.save()
                await product.category.save()
                await product.save()
    
                coupon=new Coupon()
                coupon.code=test.promotion_code
                coupon.name=test.promotion_code
                coupon.products=[]
                coupon.categories=[]
                if(test.Add_promotion_product){
                coupon.percent=test.Add_promotion_product
                    coupon.products.push(product)
                }
                if(test.Add_promotion_category){
                    coupon.percent=test.Add_promotion_category
                    coupon.categories.push(product.category)
                }
                if(test.Add_promotion_pcategory){
                    coupon.percent=test.Add_promotion_pcategory
                    coupon.categories.push(product.category.parent)
                }
                if(coupon.percent){
                    await coupon.save()
                }
                test.product_id=product.id
            }));
            done()
        })

        tests.forEach(test => {
            it("Should meet requirements",async (done)=>{
                request(app)
                .get(`${baseurl}/${test.product_id}/promotion/${test.promotion_code}?product_price=${test.product_price}&user_id=${test.user_id}`)
                .expect(test.code?test.code:200)
                .expect(function (res) {
                    let percent=`${test.Add_promotion_product!=0?test.Add_promotion_product
                        :test.Add_promotion_category!=0?test.Add_promotion_category
                        :test.Add_promotion_pcategory}`
                    let value=test.product_price*(Number(percent)/100)
                    expect(res.body).toEqual(
                        test.response?test.response:{"data": {"percent": percent, "value": value}, "message": "کد  تخفیف معتبر است"}
                    );
                })
                .end((error) => (error) ? done.fail(error) : done());
            })
        });
    })
})
