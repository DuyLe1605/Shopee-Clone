import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  className?: string
  placeholder?: string
  errorMessage?: string
  name: string
  rules?: RegisterOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
}
export default function Input({ type, className, placeholder, errorMessage, name, rules, register }: Props) {
  return (
    <div className={className}>
      <input
        autoComplete={type === 'password' ? 'on' : undefined}
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>{errorMessage}</div>
    </div>
  )
}
