# Coupon-service
single Restfull api for Coupon check

## How To use
remove `.backup` from `env.backup` and `ormconfig.json.backup`

to run in hot reload mode
```bash
$ npm run dev
```

## Best pracktices

### Security 
* its better to use jwt or somthing validatable insteed of naked user_id
* its better to rely on message bus or somthing like that rather than service descovery and internal rest apis

### Development
* seperate dev, local and production enviruments