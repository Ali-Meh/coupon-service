# Coupon-service
single Restfull api for Coupon check

## How To use
remove `.backup` from `env.backup` and `ormconfig.json.backup`

to run in hot reload mode
```bash
$ npm run dev
```

## Best practises 

### Security 
* its better to use jwt or somthing validatable instead of just user_id
* its better to rely on message bus and etc. rather than overheaded service descovery and internal rest apis

### Development
* seperate dev, local and production enviruments
* 

### API

> the api end point will be aviliable at the addres below

```bash
/api/v1/products/:product_id/promotion/:promotion_code?productPrice=100&userId=120
```
