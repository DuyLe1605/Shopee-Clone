import range from 'lodash/range'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ errorMessage, onChange, value }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  }) // Dữ liệu khởi tạo này sẽ chỉ chạy 1 lần duy nhất

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Khi ta thay đổi value của thg select, xác định name là gì và thay đổi giá trị của name đó
    const { value: selectValue, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: selectValue
    }
    setDate(newDate)

    // Nếu có onchange thì gửi dữ liệu lên
    if (onChange) {
      onChange(new Date(newDate.year, newDate.month, newDate.date)) // Gửi dữ liệu với value là Date
    }
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-600'
            value={value?.getDate() || date.date}
            name='date'
            onChange={handleChange}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-600'
            value={value?.getMonth() || date.month}
            name='month'
            onChange={handleChange}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item}>{item + 1}</option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-600'
            value={value?.getFullYear() || date.year}
            name='year'
            onChange={handleChange}
          >
            <option disabled>Năm</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 text-sm min-h-[1.25rem]'>{errorMessage}</div>
      </div>
    </div>
  )
}
