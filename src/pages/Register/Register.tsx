import { Link, useNavigate } from 'react-router-dom'
import '../Auth.scss'
import { useForm } from 'react-hook-form'
import { Schema, schema } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponseApi } from '../../types/utils.type'
import Button from '../../components/Button'

type FormData = Schema
export default function Register() {
  const navigator = useNavigate()
  // React Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    // Phải return về promise
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  // HandleSubmit sẽ có 2 tham số là hàm callback, cái đầu tiên thực hiện khi Form Valid, cái còn lại thực hiện khi Form Invalid
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: (_) => {
        navigator('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error?.response?.data.data

          // Ví dụ FormData có nhiều thuộc tính, thì ta sẽ lặp qua tất cả xem cái nào lỗi thì setError

          // Form error có thể là undefined nên phải check
          if (formError) {
            Object.keys(formError).forEach((key) => {
              // vì key là string, nên phải ép về kiểu của FormData(email hoặc password)
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Sever'
              })
            })
          }
        }
      }
    })
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
                <Button
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 cursor-pointer inline-flex  justify-center items-center '
                  disabled={registerAccountMutation.isPending}
                  isPending={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
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
