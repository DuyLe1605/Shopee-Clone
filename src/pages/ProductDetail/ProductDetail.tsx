import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { calcDiscount, formatCurrency, formatNumberToSocialStyle } from '../../utils/utils'
import InputNumber from '../../components/InputNumber'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['ProductDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data

  if (!product) return null

  const discount = calcDiscount(product.price, product.price_before_discount)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='custom-container'>
        <div className='bg-white p-4 shadow-md'>
          <div className='grid grid-cols-12'>
            {/* Img */}
            <div className='col-span-5 p-4'>
              <div className='relative w-full pt-[100%]'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-t-md '
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  title='prev-img'
                  className='absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%] cursor-pointer' key={img}>
                      <img
                        src={img}
                        alt='product-img'
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-t-md '
                      />
                      {isActive && <div className='absolute inset-0 border-2  border-orange-600'></div>}
                    </div>
                  )
                })}
                <button
                  title='prev-img'
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            {/* Thong tin */}
            <div className='col-span-7 px-5 pt-8.5'>
              <div className='flex items-center gap-3'>
                <div className='bg-orange-600 text-white text-xs px-1.5 py-0.5 inline-flex'>Yêu thích+</div>
                <h1 className='text-xl font-medium'>{product.name}</h1>
              </div>
              <div className='flex items-center mt-2.5 gap-[15px]'>
                {/* Rating */}
                <div className='flex items-center gap-1.5'>
                  <p className='border-b-1 border-black'>{product.rating}</p>
                  <ProductRating rating={product.rating} />
                </div>
                <div className='h-7 w-[1px] bg-gray-300'></div>
                {/*  */}
                <div className='flex items-center gap-2.5'>
                  <p>{formatNumberToSocialStyle(product.sold)}</p>
                  <p className='text-xs text-gray-500'>Đã Bán</p>
                </div>
              </div>
              <div className='mt-2 5'>
                <div className='px-5 py-3.5 bg-gray-100/60 flex items-center'>
                  <p className='text-3xl text-orange-600'>₫{formatCurrency(product.price)}</p>
                  <p className='text-gray-500/80 line-through ml-3'>₫{formatCurrency(product.price_before_discount)}</p>
                  <div className='ml-3 px-1 text-xs font-bold text-orange-600 bg-orange-600/10'>{discount}</div>
                </div>
              </div>
              <div className='mt-8 mb-[15px] flex items-center'>
                <p className='capitalize w-25 mr-2.5 text-[14px]'>Số lượng</p>
                <div className='flex items-center justify-center'>
                  <button
                    title='minus'
                    className='h-7 px-1.5 py-[1px] text-gray-600 border-1 rounded-tl-[4px] rounded-bl-[4px] cursor-pointer border-gray-300'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    classNameInput='h-7 w-11.5 py-[1px] py-0.5 border-t-1 border-b-1 border-gray-300 text-center text-orange-600'
                    classNameError='hidden'
                    value={1}
                  />
                  <button
                    title='plus'
                    className=' h-7 px-1.5 py-[1px] text-gray-600 border-1 rounded-tr-[4px] rounded-br-[4px] cursor-pointer  border-gray-300'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <p className='ml-4 text-gray-600 text-[14px]'>{product.quantity} sản phẩm có sẵn</p>
              </div>
              <div className='pt-[15px] pb-7.5 flex items-center gap-[15px] '>
                <button className='capitalize flex items-center gap-2.5 cursor-pointer px-5 h-12 bg-orange-600/10 text-orange-600 border-1 border-orange-600 hover:bg-orange-600/5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='px-5 h-12 w-45 block capitalize text-white bg-orange-600 hover:bg-orange-600/95 cursor-pointer'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='custom-container mt-4'>
        <div className='bg-white shadow-md p-5'>
          <div className='pt-4 px-4'>
            <div className='p-3.5 bg-gray-100/60 text-lg  uppercase'>Mô tả sản phẩm</div>
            <div className='m-4 mt-5'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description ?? '') }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
