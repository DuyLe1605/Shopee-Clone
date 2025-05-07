import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../../types/product.type'
import { calcDiscount, formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import path from '../../../../constants/path'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  const discount = calcDiscount(product.price, product.price_before_discount)

  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white rounded-md shadow hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform cursor-pointer '>
        {/* IMG */}
        <div className='w-full pt-[100%] relative '>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-t-md '
          />
          {/* Voucher */}
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134258-7ra0g-m8z4e5zabyo456'
            alt='product-img'
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        </div>
        {/* Text */}
        <div className='p-2 overflow-hidden flex flex-col flex-1 justify-between '>
          {/* Name */}
          <div className='space-y-1 flex flex-col justify-between mb-2'>
            <div className='min-h-[1.75rem] text-sm line-clamp-2'>
              <img
                src='https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lyb3m8mjjmape6'
                alt='flag-label'
                className='mr-0.5 inline-block h-3.5'
              ></img>
              {product.name}
            </div>
            {/* Price */}
            <div className='flex items-center '>
              <div className='text-orange-600 mr-1'>
                <span>₫</span>
                <span>{formatCurrency(product.price)}</span>
              </div>
              {/* Discount */}
              {discount && (
                <div className='px-1 py-0.5 text-orange-600 text-[0.7rem] rounded-[2px] bg-orange-600/10'>
                  <span>{discount}</span>
                </div>
              )}
            </div>
          </div>
          {/* Rating */}
          <div className='flex items-center mb-2 mt-6'>
            <div className='text-sm inline-flex items-center gap-1'>
              <svg viewBox='0 0 30 30' className='w-2.5 h-2.5'>
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

              {product.rating}
            </div>
            <div className='mx-1 h-3 w-[1px] bg-gray-300'></div>
            <span className='text-xs'>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
          </div>
          {/* Location */}
          <div className='flex items-center gap-[3px] text-[0.6rem]'>
            <img
              src='https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.53/pc/5dd7b4560d0e2d3190e8.svg'
              alt='location-icon'
            />
            Hà Nội
          </div>
        </div>
      </div>
    </Link>
  )
}
