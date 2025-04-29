import { Link } from 'react-router-dom'
import path from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function AsideFilter() {
  return (
    <div>
      {/* Tất cả danh mục */}
      <div>
        <Link to={path.home} className='flex items-center gap-3 font-bold py-3  border-b-1 border-gray-300'>
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
          <li className='py-2 pl-3'>
            <Link to={path.home} className='relative text-orange-600 font-semibold block'>
              <svg viewBox='0 0 4 7' className='absolute fill-orange-600 h-2 w-2 top-1 left-[-12px]'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              Thời trang nam
            </Link>
          </li>
          <li className='py-2 pl-3'>
            <Link to={path.home} className='relative  block'>
              Thời trang nữ
            </Link>
          </li>
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
        <form className='mt-5  '>
          <div className='flex items-center gap-2.5 '>
            <Input
              className=''
              type='text'
              placeholder='₫ TỪ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none border border-gray-400 bg-white'
            />
            <div className='w-2.5 h-[1px] bg-gray-400 shrink-0 mb-5'></div>
            <Input
              className=''
              type='text'
              placeholder='₫ ĐẾN'
              classNameInput='p-1 w-full outline-none border border-gray-400 focus:border-gray-500 focus:shadow-sm rounded-sm outline-none border border-gray-300 bg-white'
            />
          </div>
          <Button className='py-2 w-full flex items-center justify-center bg-orange-600 text-white rounded-b-sm cursor-pointer hover:opacity-90 text-sm'>
            ÁP DỤNG
          </Button>
        </form>
      </fieldset>
      {/* Đánh giá */}
      <fieldset className='mt-5 pb-5 border-b-1 border-gray-300'>
        <legend>Đánh giá</legend>
        <ul className='mt-2.5'>
          {Array(5)
            .fill(0)
            .map((_, liIndex) => (
              <li className='pt-1.5 px-3 cursor-pointer' key={liIndex}>
                <Link to='' className='inline-flex items-center text-sm'>
                  {Array(5)
                    .fill(0)
                    .map((_, starIndex) => {
                      return (
                        <div className='w-4.5 h4.5 pr-1' key={liIndex + starIndex}>
                          {starIndex < 5 - liIndex && (
                            <svg viewBox='0 0 30 30'>
                              <defs>
                                <linearGradient id='star__solid' x1='50%' x2='50%' y1='0%' y2='100%'>
                                  <stop offset='0%' stopColor='#FFCA11' />
                                  <stop offset='100%' stopColor='#FFAD27' />
                                </linearGradient>
                              </defs>
                              <path
                                fill='url(#star__solid)'
                                fillRule='evenodd'
                                d='M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z'
                              />
                            </svg>
                          )}
                          {!(starIndex < 5 - liIndex) && (
                            <svg viewBox='0 0 30 30'>
                              <defs>
                                <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                                  <stop offset='0%' stopColor='#FFD211' />
                                  <stop offset='100%' stopColor='#FFAD27' />
                                </linearGradient>
                              </defs>
                              <path
                                fill='none'
                                fillRule='evenodd'
                                stroke='url(#star__hollow)'
                                strokeWidth={2}
                                d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                              />
                            </svg>
                          )}
                        </div>
                      )
                    })}

                  {liIndex !== 0 && <span className='ml-1'>trở lên</span>}
                </Link>
              </li>
            ))}
        </ul>
      </fieldset>

      <Button className='mt-5 py-2 w-full flex items-center justify-center bg-orange-600 text-white rounded-b-sm cursor-pointer hover:opacity-90 text-sm uppercase'>
        Xoá Tất Cả
      </Button>
    </div>
  )
}
