import { Link, useNavigate } from 'react-router-dom'
import '../Auth.scss'
import { loginSchema, LoginSchema } from '../../utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Input from '../../components/Input'
import { loginAccount } from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponseApi } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'
import path from '../../constants/path'

type FormData = LoginSchema
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigator = useNavigate()
  // React Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // Tanstack Query
  const loginMutation = useMutation({
    // Phải return về promise
    mutationFn: (body: FormData) => loginAccount(body)
  })

  // Handle Submit
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigator('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error?.response?.data.data

          // Ví dụ FormData có nhiều thuộc tính, thì ta sẽ lặp qua tất cả xem cái nào lỗi thì setError
          // Form error có thể là undefined nên phải check
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Sever'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange-600 mt-4 shopee-bg-img'>
      <div className='custom-container '>
        <div className='grid grid-cols-1 lg:grid-cols-5 py:12 lg:py-32 lg:pr-10'>
          <div className='col-span-2 lg:col-start-4'>
            {/* FORM */}
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl '>Đăng Nhập</div>
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
              <div className='mt-3'>
                <Button
                  className='w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 cursor-pointer inline-flex  justify-center items-center '
                  disabled={loginMutation.isPending}
                  isPending={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>

              <div className='flex justify-center mt-8 text-sm'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link to={path.register} className='text-red-400 ml-2 '>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
