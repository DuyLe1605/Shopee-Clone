export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3 flex items-center justify-between'>
      <div className='flex items-center  gap-2'>
        <div className='capitalize text-sm'>Sắp xếp theo</div>
        <button className='h-8.5 px-4 inline-flex items-center bg-orange-600 hover:bg-orange-600/90 text-white cursor-pointer'>
          Phổ Biến
        </button>
        <button className='h-8.5 px-4 inline-flex items-center text-black bg-white hover:bg-slate-100  cursor-pointer'>
          Mới Nhất
        </button>
        <button className='h-8.5 px-4 inline-flex items-center text-black bg-white hover:bg-slate-100  cursor-pointer'>
          Bán Chạy
        </button>
        <select title='price' name='price' className='h-8.5 px-2 w-50 capitalize bg-white text-black outline-none'>
          <option value='' selected disabled hidden></option>
          <option value='price:asc'>Giá: Cao đến Thấp</option>
          <option value='price:desc'>Giá: Thấp đến Cao</option>
        </select>
      </div>
      <div className='flex items-center gap-5'>
        <div>
          <span className='text-orange-600'>1</span>
          <span>/2</span>
        </div>
        <div className=''>
          <button
            title='previous-page'
            className='h-8 px-3 rounded-tl-sm rounded-bl-sm bg-slate-100 text-slate-500 cursor-not-allowed'
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
          </button>
          <button title='next-page' className='h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white cursor-pointer'>
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
          </button>
        </div>
      </div>
    </div>
  )
}
