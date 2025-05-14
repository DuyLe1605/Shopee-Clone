// import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// // Những key trong kiểu email, password, ... sẽ có kiểu RegisterOptions
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   // Email
//   email: {
//     required: { value: true, message: 'Vui lòng nhập Email' },
//     pattern: {
//       value:
//         /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
//       message: 'Email sai định dạng !'
//     },
//     maxLength: { value: 160, message: 'Độ dài email nằm trong khoảng 5-160 kí tự' },
//     minLength: { value: 5, message: 'Độ dài email nằm trong khoảng 5-160 kí tự' }
//   },
//   // Password
//   password: {
//     required: { value: true, message: 'Vui lòng nhập Password' },
//     maxLength: { value: 160, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' },
//     minLength: { value: 5, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' }
//   },
//   // Confirm Password
//   confirm_password: {
//     required: { value: true, message: 'Vui lòng nhập lại Password' },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Mật khẩu không khớp, vui lòng nhập lại !'
//         : undefined
//   }
// })

import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent // this.parent là obj chứa price_min và price_max
  // Nếu người dùng nhập cả 2 thì kiểm tra xem price max có lớn hơn hay không
  if (price_max !== '' && price_min !== '') return Number(price_max) >= Number(price_min)
  // Nếu người dùng không nhập gì thì sẽ là false
  return price_max !== '' || price_min !== ''
}

// Yup
export const schema = yup
  .object({
    email: yup
      .string()
      .required('Vui lòng nhập Email !')
      .email('Email sai định dạng !')
      .min(6, 'Độ dài email nằm trong khoảng 5-160 kí tự')
      .max(160, 'Độ dài email nằm trong khoảng 5-160 kí tự'),

    password: yup
      .string()
      .required('Vui lòng nhập Password')
      .min(6, 'Độ dài password nằm trong khoảng 5-160 kí tự')
      .max(160, 'Độ dài password nằm trong khoảng 5-160 kí tự'),

    confirm_password: yup
      .string()
      .required('Vui lòng nhập lại Password')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp, vui lòng nhập lại !'),
    price_min: yup.string().default('').test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testPriceMinMax
    }),
    price_max: yup.string().default('').test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testPriceMinMax
    }),
    name: yup.string().trim().required('')
  })
  .required()

// Ta khai báo 1 Schema tổng, nhưng có trường hợp trong form không dùng hết tất cả các trường, ta có thể dùng omit hoặc pick đẻ lấy:

export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const loginSchema = schema.pick(['email', 'password']) // Loại bỏ trường confirm password
export const priceSchema = schema.pick(['price_min', 'price_max'])
export const searchSchema = schema.pick(['name'])
/*
Lưu ý rằng những schema mà không có required hoặc default value, thì ta phải bổ sung,hoặc ép kiểu luôn :
export const priceSchema = schema.pick(['price_min', 'price_max']) as yup.ObjectSchema<{
    price_max: string;
    price_min: string;
}>
*/

// Dùng để lấy kiểu của schema, không phải tự khai báo thủ công nữa
export type Schema = yup.InferType<typeof schema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type PriceSchema = yup.InferType<typeof priceSchema>
export type SearchSchema = yup.InferType<typeof searchSchema>

// User Schema
export const userSchema = yup.object({
  name: yup.string().default('').max(160, 'Tên có độ dài tối đa là 160 kí tự'),
  phone: yup.string().default('').max(20, 'Số điện thoại có độ dài tối đa là 20 kí tự'),
  address: yup.string().default('').max(300, 'Độ dài địa chỉ đã đạt giới hạn 300 kí tự'),
  date_of_birth: yup
    .date()
    .default(new Date(1990, 0, 1))
    .max(new Date(), 'Ngày không hợp lệ! Hãy chọn 1 ngày trong quá khứ'),
  avatar: yup.string().default('').max(1000, 'Độ dài đường dẫn avatar tối đa là 1000 kí tự'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export const profileSchema = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])

export type UserSchema = yup.InferType<typeof userSchema>
export type ProfileSchema = yup.InferType<typeof profileSchema>
