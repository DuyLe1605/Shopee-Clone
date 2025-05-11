import { useQuery } from '@tanstack/react-query'

import { Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { formatCurrency, generateNameId } from '~/utils/utils'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-neutral-100 pt-5'>
      <div className='custom-container mb-3'>
        <div className='overflow-auto bg-white border-3 border-white  rounded-md'>
          <div className='px-5 h-14 flex items-center '>
            <div className='pl-5 pr-3'>
              <input type='checkbox' className=' h-4 w-4 accent-orange-600' />
            </div>

            <p className='capitalize ml-4 text-[14px] w-[46.27%] '>Sản phẩm</p>
            <p className='w-[15.89%]  text-gray-500 text-center '>Đơn giá</p>
            <p className='w-[15.89%]  text-gray-500 text-center'>Số lượng</p>
            <p className='w-[15.89%] text-gray-500 text-center'>Số tiền</p>
            <p className='w-[15.89%] text-gray-500 text-center'>Thao Tác</p>
          </div>
        </div>
      </div>
      <div className='custom-container'>
        <div className='overflow-auto bg-white border-3 border-white  rounded-md'>
          {purchasesInCart &&
            purchasesInCart.map((purchase) => (
              <div
                key={purchase._id}
                className='px-5 py-3 flex items-center border-1 border-gray-200/70 rounded-md mx-5 my-6 hover:shadow-md'
              >
                <input type='checkbox' className='pl-5 pr-3 h-4 w-4 accent-orange-600' />
                {/* Info */}
                <div className='flex items-start gap-2.5 w-[43.5%] pr-2'>
                  <Link
                    to={{
                      pathname: `${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`
                    }}
                    className='h-20 w-20 ml-4 shrink-0'
                  >
                    {' '}
                    <img src={purchase.product.image} alt={purchase.product.name} />
                  </Link>
                  <Link
                    to={{
                      pathname: `${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`
                    }}
                    className='line-clamp-2'
                  >
                    {purchase.product.name}
                  </Link>
                </div>
                {/* Product Price */}
                <div className='w-[14.3%] flex items-center justify-center gap-2'>
                  <p className='text-gray-500 line-through text-sm '>
                    {formatCurrency(purchase.price_before_discount)}
                  </p>
                  <p className='text-sm '>{formatCurrency(purchase.price)}</p>
                </div>
                {/* Quantity */}
                <div className=' w-[14.3%] flex justify-center'>
                  <QuantityController max={purchase.product.quantity} value={purchase.buy_count} />
                </div>
                {/* Price */}
                <div className=' w-[14.3%] flex justify-center'>
                  {formatCurrency(purchase.price * purchase.buy_count)}
                </div>
                {/* Action */}
                <div className='grow text-center'>
                  <button className='cursor-pointer bg-none text-black transition-colors hover:text-orange-600'>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-4 w-4 accent-orange-600' />
            </div>
            <button className='mx-3 border-none bg-none cursor-pointer'>Chọn tất cả ({purchasesInCart?.length})</button>
            <button className='mx-3 border-none bg-none cursor-pointer'>Xóa</button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán (0 sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫138000</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫138000</div>
              </div>
            </div>
            <Button className='mt-5  flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0 cursor-pointer'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
