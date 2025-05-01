import classNames from 'classnames'
import { sortBy, order as orderConstant } from '../../../constants/product'
import { ProductListConfig } from '../../../types/product.type'
import { QueryParams } from '../ProductList'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import _ from 'lodash'

interface Props {
  pageSize: number
  queryConfig: QueryParams
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const { sort_by = sortBy.createdAt, order = '' } = queryConfig
  const page = Number(queryConfig.page)
  // Xử lí sortBy
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        _.omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  //
  const handleChangeOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3 flex items-center justify-between'>
      <div className='flex items-center  gap-2'>
        <div className='capitalize text-sm'>Sắp xếp theo</div>
        <button
          className={classNames('h-8.5 px-4 inline-flex items-center cursor-pointer', {
            'bg-orange-600 hover:bg-orange-600/90 text-white': isActiveSortBy(sortBy.view),
            ' text-black bg-white hover:bg-slate-100': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ Biến
        </button>
        <button
          className={classNames('h-8.5 px-4 inline-flex items-center cursor-pointer', {
            'bg-orange-600 hover:bg-orange-600/90 text-white': isActiveSortBy(sortBy.createdAt),
            ' text-black bg-white hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới Nhất
        </button>
        <button
          className={classNames('h-8.5 px-4 inline-flex items-center cursor-pointer', {
            'bg-orange-600 hover:bg-orange-600/90 text-white': isActiveSortBy(sortBy.sold),
            ' text-black bg-white hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán Chạy
        </button>
        <select
          title='Price'
          name='price'
          className={classNames(
            'h-8.5 px-2 w-50 capitalize outline-none border text-black bg-white hover:bg-slate-100',
            {
              'border-orange-600': isActiveSortBy(sortBy.price),
              'border-transparent': !isActiveSortBy(sortBy.price)
            }
          )}
          value={order}
          onChange={(event) => handleChangeOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option value={''} disabled>
            Giá
          </option>
          <option value={orderConstant.asc}>Giá: Thấp đến Cao</option>
          <option value={orderConstant.desc}>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center gap-5'>
        <div>
          <span className='text-orange-600'>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='flex items-center'>
          {/* Ở trang đầu */}
          {page === 1 ? (
            <span className='inline-flex items-center h-8 px-3 rounded-tl-sm rounded-bl-sm bg-slate-100 text-slate-500 cursor-not-allowed'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='inline-flex items-center h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}
          {/* Ở trang cuối */}
          {page === pageSize ? (
            <span className='inline-flex items-center h-8 px-3 rounded-tl-sm rounded-bl-sm bg-slate-100 text-slate-500 cursor-not-allowed'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='inline-flex items-center h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
