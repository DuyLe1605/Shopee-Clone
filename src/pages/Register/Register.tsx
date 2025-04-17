import { Link } from 'react-router-dom'
import '../Auth.scss'
import { RegisterOptions, useForm } from 'react-hook-form'
import { getRules } from '../../utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)
  // HandleSubmit sẽ có 2 tham số là hàm callback, cái đầu tiên thực hiện khi Form Valid, cái còn lại thực hiện khi Form Invalid
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-[var(--primary-orange-color)] mt-4 shopee-bg-img'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py:12 lg:py-32 lg:pr-10'>
          <div className='col-span-2 lg:col-start-4'>
            {/* FORM */}
            <form className='p-10 rounded bg-white shadow-sm ' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  placeholder='Email'
                  {...register('email', rules.email as RegisterOptions<FormData, 'email'>)}
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors?.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password as RegisterOptions<FormData, 'password'>)}
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors?.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  placeholder='Confirm Password'
                  {...register(
                    'confirm_password',
                    rules.confirm_password as RegisterOptions<FormData, 'confirm_password'>
                  )}
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors?.confirm_password?.message}</div>
              </div>
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>

              <div className='flex justify-center mt-8 text-[18px]'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-red-400 ml-2'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
