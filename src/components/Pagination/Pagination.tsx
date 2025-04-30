import classNames from 'classnames'
import { Link } from 'react-router-dom'
interface Props {
  page: number
  pageSize: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const RANGE = 2
export default function Pagination({ page, pageSize, setPage }: Props) {
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
            to={`?page=${pageNumber}`}
            className={classNames(
              'px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all border',
              { 'border-gray-500': page === pageNumber, 'border-transparent': page !== pageNumber }
            )}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-8 flex items-center justify-center gap-2'>
      <button className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'>
        Prev
      </button>
      {renderPagination()}
      <button className='px-3 py-2 rounded-sm bg-white cursor-pointer shadow shadow-neutral-200 hover:shadow-neutral-400 duration-200 transition-all'>
        Next
      </button>
    </div>
  )
}
