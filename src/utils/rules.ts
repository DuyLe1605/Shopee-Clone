import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// Những key trong kiểu email, password, ... sẽ có kiểu RegisterOptions

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
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
  password: {
    required: { value: true, message: 'Vui lòng nhập Password' },
    maxLength: { value: 160, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' },
    minLength: { value: 5, message: 'Độ dài password nằm trong khoảng 5-160 kí tự' }
  },
  confirm_password: {
    required: { value: true, message: 'Vui lòng nhập lại Password' },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu không khớp, vui lòng nhập lại !'
        : undefined
  }
})
