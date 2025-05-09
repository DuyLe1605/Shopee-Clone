import { InputHTMLAttributes } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  ref?: React.Ref<HTMLInputElement>
}

// Từ 19 trở đi, chúng ta nên truyền ref như 1 props, không nên dùng forwardRef nữa
export default function InputNumber({
  ref,
  className,
  errorMessage,
  onChange,
  classNameError = 'mt-1 text-red-600 text-sm min-h-[1.25rem]',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm',
  ...rest
}: InputNumberProps) {
  //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // Kiểm tra xem value trong ô input có phải số hoặc chuỗi rỗng hay không (Khác chữ cái), và có hàm onChange dc truyền vào
    //  /^\d+$/ là biểu thức chính quy kiểm tra có phải số không
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      // Truyền event vào trong hàm onChange
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input autoComplete='on' className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
