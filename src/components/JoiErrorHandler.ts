import _ from 'lodash'

export default function messages(errors: any) {

    if (!errors) {
        return
    }
    if (!_.isArray(errors)) {
        return
    }
    if (errors.length < 1) {
        return
    }


    for (let error of errors) {

        switch (error.code) {
            case 'any.required':
                error.message = `${error.flags.label} اجباری است`
                error.code = `${error.flags.label}_Required`
                break;
            case 'number.base':
                error.message = `${error.flags.label} باید عدد باشد`
                error.code = `${error.flags.label}_IS_Number`
                break;
            case 'string.email':
                error.message = `${error.flags.label} نا معتبر است`
                error.code = `${error.flags.label}_IS_Email`
                break;
            case 'string.alphanum':
                error.message = `${error.flags.label} باید حروف اینگلیسی باشد`
                error.code = `${error.flags.label}_IS_Alphanum`
                break;
            case 'any.empty':
                error.message = `${error.flags.label} نمی تواند خالی باشد`
                error.code = `${error.flags.label}_IS_Required`
                break;
            case 'any.allowOnly':
                error.message = `${error.flags.label} باید یکی از مقادیر ${_.join(error.flags.valids, ', ')} باشد`
                error.code = `${error.flags.label}_IS_Restircted`
                break;
            case 'date.base':
                error.message = `${error.flags.label} نا معتبر است`
                error.code = `${error.flags.label}_IS_Invalid`
                break;
            case 'number.min':
                error.message = `${error.flags.label} نمی تواند کمتر از ${error.flags.limit} باشد`
                error.code = `${error.flags.label}_Should_Be_More_Than_${error.flags.limit}`
                break;
            case 'number.max':
                error.message = `${error.flags.label} نمی تواند بیشتر از ${error.flags.limit} باشد`
                error.code = `${error.flags.label}_Should_Be_Less_Than_${error.flags.limit}`
                break;
            case 'any.only':
                error.message = `${error.flags.label} فقط میتواند از مجوعه ${error.flags.valid} باشد`
                error.code = `${error.flags.label}_ONLY_Supports_${error.flags.valid}`
                break;
            case 'override':
                error.message = `${error.flags}`
                error.code = `${error.flags}_Unkown`
                break;
            case 'date.min':
                error.message = `تاریخ پایان باید بزرگتر مساوی ${error.flags.limit} باشد`
                error.code = `${error.flags.label}_Should_Be_More_Than_${error.flags.limit}`
                break;
            case 'date.max':
                error.message = `تاریخ پایان باید حداکثر برار با ${error.flags.limit} باشد`
                error.code = `${error.flags.label}_Should_Be_Less_Than_${error.flags.limit}`
                break;
            case 'string.regex.base':
                error.message = ` ${error.flags.label} وارد شده نا معتبر است `
                error.code = `${error.flags.label}_IS_Invalid`
                break;
            default:
                error.message = ` ${error.flags.label} وارد شده نا معتبر است `
                error.code = `${error.flags.label}_IS_Invalid`

        }
    }

    return errors
}