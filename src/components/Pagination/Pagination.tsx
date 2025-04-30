import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { QueryParams } from '../../pages/ProductList/ProductList'
import path from '../../constants/path'
interface Props {
  pageSize: number
  queryConfig: QueryParams
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button
            key={index}
            className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'
          >
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={index}
            className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'
          >
            ...
          </button>
        )
      }
      return null
    }
    // Lặp qua số lượng page
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // Logic là sẽ render ra só button ở 2 đầu và xung quanh current page tương ứng với RANGE(2)
        // Có 3 trường hợp là curPage<= RANGE * 2 + 1, page >= pageSize - RANGE * 2 và ở giữa
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          // TH1
          return renderDotAfter(pageNumber)
        } else if (page >= pageSize - RANGE * 2 && pageNumber < page - RANGE && pageNumber > RANGE) {
          // TH2
          return renderDotBefore(pageNumber)
        } else {
          // TH3
          if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(pageNumber)
          else if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(pageNumber)
        }
        // Nếu hợp lệ thì return về button với index :D
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              'px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all border',
              { 'border-gray-500': page === pageNumber, 'border-transparent': page !== pageNumber }
            )}
            key={pageNumber}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-8 flex items-center justify-center gap-2'>
      {/* ở trang đầu thì không bấm dc prev */}
      {page === 1 ? (
        <span className='px-3 py-2 rounded-sm bg-white cursor-not-allowed shadow shadow-neutral-200 opacity-60 '>
          Prev
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
          className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {/* ở trang cuối thì không bấm dc next */}
      {page === pageSize ? (
        <span className='px-3 py-2 rounded-sm bg-white cursor-not-allowed shadow shadow-neutral-200 opacity-60'>
          {' '}
          Next
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
          className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'
        >
          Next
        </Link>
      )}
    </div>
  )
}
