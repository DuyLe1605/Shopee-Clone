import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// Những key trong kiểu email, password, ... sẽ có kiểu RegisterOptions
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  // Email
  email: {
    required: { value: true, message: 'Vui lòng nhập Email' },
    pattern: {
      value:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: 'Email sai định dạng !'
    },
    maxLength: { value: 160, message: 'Độ dài email nằm trong khoảng 5-160 kí tự' },
    minLength: { value: 5, message: 'Độ dài email nằm trong khoảng 5-160 kí tự' }
  },
  // Password
  password: {
    required: { value: true, message: 'Vui lòng nhập Password' },
    maxLength: { value: 160, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' },
    minLength: { value: 5, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' }
  },
  // Confirm Password
  confirm_password: {
    required: { value: true, message: 'Vui lòng nhập lại Password' },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu không khớp, vui lòng nhập lại !'
        : undefined
  }
})

// Yup
export const schema = yup
  .object({
    email: yup
      .string()
      .required('Vui lòng nhập Email'!)
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
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp, vui lòng nhập lại !')
  })
  .required()

// Ta khai báo 1 Schema tổng, nhưng có trường hợp trong form không dùng hết tất cả các trường, ta có thể dùng omit hoặc pick đẻ lấy:

export const loginSchema = schema.omit(['confirm_password']) // Loại bỏ trường confirm password

// Dùng để lấy kiểu của schema, không phải tự khai báo thủ công nữa
export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
