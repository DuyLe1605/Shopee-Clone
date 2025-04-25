import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  className,
  placeholder,
  errorMessage,
  name,
  rules,
  register,
  classNameError = 'mt-1 text-red-600 text-sm min-h-[1.25rem]',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}

  return (
    <div className={className}>
      <input autoComplete='on' type={type} className={classNameInput} placeholder={placeholder} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
