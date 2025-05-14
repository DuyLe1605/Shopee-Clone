import { useRef } from 'react'
import { toast, Zoom } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import config from '~/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    } else {
      if (onChange) {
        onChange(fileFromLocal)
      }
    }

    //Reset File input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <Fragment>
      <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
      <button
        className='flex h-10 items-center justify-end rounded-sm border-1 border-gray-300 bg-white px-6 text-sm text-gray-600 hover:shadow-sm hover:bg-gray-100 cursor-pointer'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
