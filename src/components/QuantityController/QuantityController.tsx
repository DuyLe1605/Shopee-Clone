import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  value,
  max,
  onIncrease,
  onDecrease,
  onType,
  onBlur,
  classNameWrapper
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // _value là giá trị khi người dùng nhập

    let _value = Number(event.target.value)
    // Kiểm tra nếu người dùng nhập quá max hoặc bé hơn 1,value tự động được đặt thành hợp lệ
    if (max !== undefined && _value > max) {
      _value = max - 1
    }
    if (onType) {
      onType(_value)
    }
  }
  const handleIncrease = () => {
    // _value là giá trị value được truyền qua props
    let _value = Number(value)

    _value++
    if (max !== undefined && _value > max) {
      _value = max
    }

    if (onIncrease) {
      onIncrease(_value)
    }
  }
  const handleDecrease = () => {
    // _value là giá trị value được truyền qua props
    let _value = Number(value)

    _value--
    if (_value < 1) {
      _value = 1
    }

    if (onDecrease) {
      onDecrease(_value)
    }
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
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
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
