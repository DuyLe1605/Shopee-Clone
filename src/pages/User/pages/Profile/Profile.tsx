import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from '~/apis/user.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import { profileSchema, ProfileSchema } from '~/utils/rules'
import DateSelect from '../../components/DateSelect'
import { Flip, toast, Zoom } from 'react-toastify'
import { saveProfileToLS } from '~/utils/auth'
import { AppContext } from '~/contexts/app.context'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ErrorResponseApi } from '~/types/utils.type'
import config from '~/constants/config'

type FormData = ProfileSchema

// Vì error trả về 1 data mà trong đó kiểu date_of_birth là kiểu string nên ta phải làm vậy
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function Profile() {
  // Tạo state chứa file

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]) // Biến này để hiển thị ảnh tạm thời cho người dùng xem

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    register,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: { name: '', address: '', avatar: '', date_of_birth: new Date(1990, 0, 1), phone: '' },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch: profileDataRefetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })
  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

  const profile = profileData?.data.data
  // Avatar watch trong form
  const avatar = watch('avatar')

  useEffect(() => {
    // Hàm này sẽ có tác dụng là khi profile có data, nó sẽ hiển thị lên form
    if (profile) {
      setValue('name', profile.name as string)
      setValue('address', profile.address as string)
      setValue('avatar', profile.avatar as string)
      setValue('phone', profile.phone as string)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    let avatarName = avatar
    try {
      // Kiểm tra xem có file không
      if (file) {
        const form = new FormData() // Đây là 1 api của js, không phải interface đã khai báo ở trên
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)

        avatarName = uploadRes.data.data // Sever sẽ trả về data là 1 img link
      }

      // Nếu có avatarName thì set là cái đã upload lên, còn không thì vẫn lấy avatar cũ
      const body = { ...data, date_of_birth: data.date_of_birth.toISOString(), avatar: avatarName }
      const res = await updateProfileMutation.mutateAsync(body)
      const profile = res.data.data

      saveProfileToLS(profile) // Lưu user vào local storage, để lần sau truy cập vào trang thì profile trong context sẽ tự lấy ở LS
      setProfile(profile) // lưu profile vào state context
      profileDataRefetch()

      toast.success('Cập nhật thông tin thành công :D', {
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
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  // Handle click file input
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    // Validate file lớn hơn 1mb hoặc không phải img thì return
    if (fileFromLocal && (fileFromLocal.size >= config.maxAvatarUploadSize || !fileFromLocal.type.includes('image'))) {
      toast.error(
        `Dụng lượng file tối đa 1 MB
Định dạng:.JPEG, .PNG`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Zoom
        }
      )
      return
    }

    setFile(fileFromLocal)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='bg-white rounded-xs shadow-md px-7.5 pb-2.5'>
      <div className='border-b border-b-gray-200 py-5'>
        <h1 className='capitalize text-lg'>Hồ sơ của tôi</h1>
        <div className='mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start mb-8' onSubmit={onSubmit} noValidate>
        {/* Thông tin  */}
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Tên'
                register={register}
                name='name'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    {...field}
                    onChange={field.onChange}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect value={field.value} onChange={field.onChange} errorMessage={errors.date_of_birth?.message} />
            )}
          />

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Button className='flex px-6 py-2.5 text-center text-white bg-orange-600 hover:bg-orange-600/90 cursor-pointer'>
                Lưu thông tin
              </Button>
            </div>
          </div>
        </div>
        {/* Upload ImgImg */}
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarUrl(avatar)}
                alt=''
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <input
              className='hidden'
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={fileInputRef}
              onChange={onFileChange}
              onClick={(event) => {
                // Để khi người dùng chọn 2 tấm ảnh giống nhau, nó vẫn hiển thị được lỗi
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(event.target as any).value = null
              }}
            />
            <button
              className='flex h-10 items-center justify-end rounded-sm border-1 border-gray-300 bg-white px-6 text-sm text-gray-600 hover:shadow-sm hover:bg-gray-100 cursor-pointer'
              type='button'
              onClick={handleUpload}
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
