import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

type handleFunc = (value: number | string) => void
interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: handleFunc
  onInputBlur?: handleFunc
  classNameWrapper?: string
}

export default function QuantityController({
  value,
  max,
  onIncrease,
  onDecrease,
  onType,
  onInputBlur,
  classNameWrapper,
  ...rest
}: Props) {
  // Nếu người dùng không nhập value và các hàm onChange, ta sẽ tự set local State tương ứng
  const [localValue, setLocalValue] = useState<string | number>(Number(value || 1))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // _value là giá trị khi người dùng nhập
    let _value = Number(event.target.value)

    // Kiểm tra nếu người dùng nhập quá max hoặc bé hơn 1,value tự động được đặt thành hợp lệ
    if (max !== undefined && _value > max) {
      _value = max - 1
    }

    if (onType) {
      // Nếu người dùng xóa hết thì value sẽ bằng 0, nếu như thế thì ta hiển thị '' rỗng
      onType(_value || '')
    }
    setLocalValue(_value || '')
  }
  const handleIncrease = () => {
    // _value là giá trị value được truyền qua props
    let _value = Number(value || localValue) + 1

    if (max !== undefined && _value > max) {
      _value = max
    }

    if (onIncrease) {
      onIncrease(_value)
    }
    setLocalValue(_value)
  }
  const handleDecrease = () => {
    // _value là giá trị value được truyền qua props
    let _value = Number(value || localValue) - 1

    if (_value < 1) {
      _value = 1
    }

    if (onDecrease) {
      onDecrease(_value)
    }
    setLocalValue(_value)
  }
  // Hàm này sẽ xử lí khi người dùng bỏ focus, nó check xem value mà là '' thì sẽ đặt thành 1
  const handleInputBlur = () => {
    const _value = Number(value || localValue)
    if (onInputBlur) {
      onInputBlur(_value || 1)
    }
    setLocalValue(1)
  }

  return (
    <div className={'flex items-center justify-center' + classNameWrapper}>
      <button
        title='minus'
        className='h-7 px-1.5 py-[1px] text-gray-600 border-1 rounded-tl-[4px] rounded-bl-[4px] cursor-pointer border-gray-300'
        onClick={handleDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        classNameInput='h-7 w-11.5 py-0.5 border-t-1 border-b-1 border-gray-300 text-center text-orange-600'
        classNameError='hidden'
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleInputBlur}
        {...rest}
      />
      <button
        title='plus'
        className=' h-7 px-1.5 py-[1px] text-gray-600 border-1 rounded-tr-[4px] rounded-br-[4px] cursor-pointer  border-gray-300'
        onClick={handleIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
