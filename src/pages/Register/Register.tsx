import { Link } from 'react-router-dom'
import '../Auth.scss'
import { useForm } from 'react-hook-form'
import { getRules, Schema, schema } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Register() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)
  // // Dùng khi validate trong React Hook Form

  // HandleSubmit sẽ có 2 tham số là hàm callback, cái đầu tiên thực hiện khi Form Valid, cái còn lại thực hiện khi Form Invalid
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-[var(--primary-orange-color)] mt-4 shopee-bg-img'>
      <div className='custom-container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py:12 lg:py-32 lg:pr-10'>
          <div className='col-span-2 lg:col-start-4'>
            {/* FORM */}
            <form className='p-10 rounded bg-white shadow-sm ' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                className='mt-8'
                errorMessage={errors?.email?.message}
              />

              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                className='mt-3'
                errorMessage={errors?.password?.message}
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                placeholder='confirm_password'
                className='mt-3'
                errorMessage={errors?.confirm_password?.message}
              />

              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>

              <div className='flex justify-center mt-8 text-sm'>
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
