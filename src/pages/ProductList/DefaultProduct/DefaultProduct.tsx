import { Link } from 'react-router-dom'
import { Product } from '../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../utils/utils'

interface Props {
  product: Product
}

export default function DefaultProduct({ product }: Props) {
  return (
    <Link to='/'>
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
        <div className='p-2 overflow-hidden flex flex-col flex-1 justify-between h-29'>
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
          </div>
          {/* Price */}
          <div className='flex items-center justify-between mb-2'>
            <div className='text-orange-600 '>
              <span>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
            <span className='text-xs'>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
