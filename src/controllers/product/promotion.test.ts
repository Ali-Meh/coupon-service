import { Coupon,Product,Category } from "../../repo/entity"
import { getRepository, Repository, createConnection } from "typeorm"


let PromotionController: any


describe("[Promotion]", () => {
    beforeAll(async () => {
        await createConnection()
        PromotionController = require('./promotion')
    })
    it("will pass",()=>{})

//     describe("[Product]", () => {
//         let product: Product
//         let productRepository: Repository<Product>
//         beforeAll(async (done) => {
//             productRepository = getRepository(Product);
//             product = new Product()
//             product.
//             user.token = authenticator.generateSecret()
//             await user.save()
//             done()
//         })
//         it("should generate user token and update lastlogin of user", async (done) => {
//             try {
//                 let oldUserLogin = user.lastLoginAt
//                 oldtoken = await AuthHandler.UserTokenGen(user)
//                 expect(user.lastLoginAt).not.toEqual(oldUserLogin)
//                 let decodedjwt = jwt.decode(oldtoken, { json: true })
//                 expect(decodedjwt).not.toBeNull()
//                 //@ts-ignore
//                 expect(user.lastLoginAt).toEqual(new Date(decodedjwt.iat * 1000))
//             } catch (error) {
//                 expect(error).toBeNull()
//             } finally {
//                 done()
//             }
//         })

//         it("should invalidate old Token", async (done) => {
//             setTimeout(async () => {
//                 try {
//                     let token = await AuthHandler.UserTokenGen(user)
//                     try {
//                         let user1: User = await AuthHandler.UserTokenVerify(token)
//                         expect(user1.id).toEqual(user.id)
//                         expect(user1.phoneNumber).toEqual(user.phoneNumber)
//                         expect(user1.fullName).toEqual(user.fullName)
//                         expect(user1.status).toEqual(user.status)
//                     } catch (error) {
//                         expect(error).toBeNull()
//                     }
//                     try {
//                         let user2 = await AuthHandler.UserTokenVerify(oldtoken)
//                         expect(user2).toBeNull()
//                     } catch (error) {
//                         expect(error).not.toBeNull()
//                         expect(error.status).toBe(401)
//                         expect(error.code).toEqual("UnAUTH")
//                         expect(error.message).toEqual('نشست شما پایان یافته است لطفا دوباره وارد شوید')
//                     }


//                 } finally {
//                     done()
//                 }
//             }, 1500)
//         }, 5000)

//         afterAll(async (done) => {
//             await user.remove()
//             done()
//         })
//     })
})