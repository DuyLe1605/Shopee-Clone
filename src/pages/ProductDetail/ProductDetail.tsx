import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import productApi from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { calcDiscount, formatCurrency, formatNumberToSocialStyle, getIdFromNameId } from '../../utils/utils'

import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from '~/components/QuantityController'

export default function ProductDetail() {
  // Tạo state quản lí buy Count
  const [buyCount, setBuyCount] = useState<string | number>(1)

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)

  const { data: productDetailData } = useQuery({
    queryKey: ['ProductDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  // Tạo state của currentIndexImages, là 1 mảng chứa index đầu và cuối + 1, để khi dùng slice, giá trị thứ 2 sẽ bị trừ đi 1
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const product = productDetailData?.data.data

  // Mảng chứa các ảnh trong slider
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  ) // Dùng useMemo để tránh tính toán lại khi rerender
  const discount = product ? calcDiscount(product.price, product.price_before_discount) : 0

  // Danh sách sản phẩm gợi ý
  const queryConfig = { page: '1', limit: '10', category: product?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['ProductList', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000 // Để stale time là 3 phút, để nếu người dùng chọn danh mục rồi vào sản phẩm, api sẽ không bị gọi nhiều lần
    // lưu ý là phải set stale time ở cả 2 nơi bằng nhau (ProductDetails và ProductList)
  })

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  // Khi mới vào trang, active sẽ mặc định ở vị trí đầu tiên
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  const nextSlider = () => {
    //0 và 1 là 2 giá trị đầu và cuối trong cái state chứa index
    if (currentIndexImages[1] < (product as ProductType).images.length)
      setCurrentIndexImages([currentIndexImages[0] + 1, currentIndexImages[1] + 1])
  }
  const prevSlider = () => {
    //0 và 1 là 2 giá trị đầu và cuối trong cái state chứa index
    if (currentIndexImages[0] > 0) setCurrentIndexImages([currentIndexImages[0] - 1, currentIndexImages[1] - 1])
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value || '')
  }
  // Hàm này sẽ xử lí khi người dùng bỏ focus, nó check xem value mà là '' thì sẽ đặt thành 1
  const handleBlurBuyCount = () => {
    if (!buyCount) {
      setBuyCount(1)
    }
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='custom-container'>
        <div className='bg-white p-4 shadow-md'>
          <div className='grid grid-cols-12'>
            {/* Img */}
            <div className='col-span-5 p-4'>
              <div
                className='relative w-full pt-[100%] cursor-zoom-in overflow-hidden'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                {activeImage && (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className='pointer-events-none absolute top-0 left-0 bg-white w-full h-full object-cover rounded-t-md '
                    ref={imageRef}
                  />
                )}
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  title='prev-slider'
                  className='absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white cursor-pointer'
                  onClick={prevSlider}
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
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%] cursor-pointer'
                      key={img}
                      onMouseEnter={() => setActiveImage(img)}
                    >
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
                  title='next-slider'
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white cursor-pointer'
                  onClick={nextSlider}
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
                <QuantityController
                  value={buyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  max={product.quantity}
                  onBlur={handleBlurBuyCount}
                />
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
        <div className='bg-white shadow-md p-5 w-[80%]'>
          <div className='pt-4 px-4'>
            <div className='p-3.5 bg-gray-100/60 text-lg  uppercase'>Mô tả sản phẩm</div>
            <div className='m-4 mt-5'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description ?? '') }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Sản phẩm tương tự */}
      <div className='custom-container mt-8'>
        <div className=' text-gray-600 text-md uppercase'>Có thể bạn cũng thích</div>
        <div className=' mt-4 w-[80%]'>
          <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {productData &&
              productData.data.data.products
                .filter((prd) => prd._id !== product._id)
                .map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
