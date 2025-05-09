import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import Button from '../../../../components/Button'

import { Category } from '../../../../types/category.type'
import classNames from 'classnames'
import _ from 'lodash'
import InputNumber from '../../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PriceSchema, priceSchema } from '../../../../utils/rules'
import RatingStars from '../RatingStars'
import { QueryParams } from '../../../../hooks/useQueryConfig'

interface Props {
  queryConfig: QueryParams
  categories: Category[]
}

type FormData = PriceSchema
export default function AsideFilter({ queryConfig, categories }: Props) {
  const navigate = useNavigate()
  const { category } = queryConfig
  // Quản lí ô input price
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    navigate({
      pathname: path.home,
      search: createSearchParams(
        _.omitBy(
          {
            ...queryConfig,
            price_max: data.price_max,
            price_min: data.price_min
          },
          (value) => value === '' // Để nếu người dùng không nhập cái nào, thì sẽ không hiển thị cái đó lên params
        )
      ).toString()
    })
  })

  const handleRemoveAsideFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        _.omit({ ...queryConfig }, ['price_min', 'price_max', 'rating_filter', 'category'])
      ).toString()
    })
  }

  return (
    <div>
      {/* Tất cả danh mục */}
      <div>
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams(
              _.omit(
                {
                  ...queryConfig,
                  page: '1'
                },
                ['category']
              )
            ).toString()
          }}
          className={classNames('flex items-center gap-3 font-bold py-3  border-b-1 border-gray-300', {
            'text-orange-600': !category
          })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
          Tất Cả Danh Mục
        </Link>
        <ul>
          {categories.map((categoryItem) => {
            const isActive = categoryItem._id === category
            return (
              <li className='py-2 pl-3' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({ ...queryConfig, category: categoryItem._id, page: '1' }).toString()
                  }}
                  className={classNames('block', {
                    'text-orange-600 font-semibold relative': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute fill-orange-600 h-2 w-2 top-1 left-[-12px]'>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}

                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {/* Bộ lọc tìm kiếm */}
      <div className='mt-8'>
        <Link to={path.home} className='flex  items-center gap-2.5 font-bold'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x='0'
            y='0'
            className='w-4 h-4 fill-current stroke-current '
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='10'
              ></polyline>
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
      </div>
      {/* Khoảng giá */}
      <fieldset className='mt-5 pb-5 border-b-1 border-gray-300'>
        <legend>Khoảng giá</legend>
        <form className='mt-5' onSubmit={onSubmit}>
          <div className='flex items-center gap-2.5 '>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  className=''
                  type='text'
                  placeholder='₫ TỪ'
                  classNameInput='p-1 w-full border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none border bg-white'
                  classNameError='hidden'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                  value={field.value}
                  ref={field.ref} // Từ 19 trở đi, chúng ta nên truyền ref như 1 props, không nên dùng forwardRef nữa
                />
              )}
            />
            <div className='w-2.5 h-[1px] bg-gray-400 shrink-0 mb-5'></div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  className=''
                  type='text'
                  placeholder='₫ ĐẾN'
                  classNameInput='p-1 w-full focus:border-gray-500 focus:shadow-sm rounded-sm outline-none border border-gray-300 bg-white'
                  classNameError='hidden'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                  value={field.value}
                  ref={field.ref} // Từ 19 trở đi, chúng ta nên truyền ref như 1 props, không nên dùng forwardRef nữa
                />
              )}
            />
          </div>
          <div className='mt-1 text-red-600 text-sm min-h-[1.25rem] text-center mb-1'>{errors.price_min?.message}</div>
          <Button className='py-2 w-full flex items-center justify-center bg-orange-600 text-white rounded-b-sm cursor-pointer hover:opacity-90 text-sm'>
            ÁP DỤNG
          </Button>
        </form>
      </fieldset>
      {/* Đánh giá */}
      <fieldset className='mt-5 pb-5 border-b-1 border-gray-300'>
        <legend className='font-bold'>Đánh giá</legend>
        <RatingStars queryConfig={queryConfig} />
      </fieldset>

      <Button
        className='mt-5 py-2 w-full flex items-center justify-center bg-orange-600 text-white rounded-b-sm cursor-pointer hover:opacity-90 text-sm uppercase'
        onClick={handleRemoveAsideFilter}
      >
        Xoá Tất Cả
      </Button>
    </div>
  )
}
