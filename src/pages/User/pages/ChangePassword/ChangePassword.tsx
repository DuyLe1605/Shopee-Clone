import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { Flip, toast } from 'react-toastify'
import userApi from '~/apis/user.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { ErrorResponseApi } from '~/types/utils.type'
import { PasswordSchema, passwordSchema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

type FormData = PasswordSchema

export default function ChangePassword() {
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    setError
  } = useForm<FormData>({
    defaultValues: { password: '', new_password: '', confirm_password: '' },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
      const body = _.omit(data, ['confirm_password'])
      const res = await updateProfileMutation.mutateAsync(body)

      reset()
      toast.success(res.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip
      })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='bg-white rounded-xs shadow-md px-7.5 pb-2.5'>
      <div className='border-b border-b-gray-200 py-5'>
        <h1 className='capitalize text-lg'>Đổi mật khẩu</h1>
        <div className='mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>{' '}
      <form
        className='my-8 mr-auto max-w-2xl flex flex-col-reverse md:flex-row md:items-start '
        onSubmit={onSubmit}
        noValidate
      >
        {/* Mật khẩu*/}
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput=' w-full rounded-sm border border-gray-300 pl-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative'
                placeholder='Tên'
                register={register}
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                renderPasswordEye={true}
                isSubmitSuccessful={isSubmitSuccessful}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput=' w-full rounded-sm border border-gray-300 pl-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative'
                placeholder='Tên'
                register={register}
                name='new_password'
                type='password'
                errorMessage={errors.new_password?.message}
                renderPasswordEye={true}
                isSubmitSuccessful={isSubmitSuccessful}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput=' w-full rounded-sm border border-gray-300 pl-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative'
                placeholder='Tên'
                register={register}
                name='confirm_password'
                type='password'
                errorMessage={errors.confirm_password?.message}
                renderPasswordEye={true}
                isSubmitSuccessful={isSubmitSuccessful}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Button className='flex px-6 py-2.5 text-center text-white bg-orange-600 hover:bg-orange-600/90 cursor-pointer'>
                Lưu thông tin
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
