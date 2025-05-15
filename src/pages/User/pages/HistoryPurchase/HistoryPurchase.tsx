import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import _ from 'lodash'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import useQueryParams from '~/hooks/useQueryParams'
import { PurchaseListStatus } from '~/types/purchase.type'
import { formatCurrency, generateNameId } from '~/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesInCartData, isSuccess } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange-600 text-orange-600': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>

          {/* Danh sách sp */}
          {isSuccess && (
            <div>
              {/* Không có sản phẩm */}
              {_.isEmpty(purchasesInCart) && (
                <div className='py-45 bg-neutral-100 border-b-3 border-orange-600 '>
                  <div className='custom-container '>
                    <div className='flex flex-col justify-center items-center '>
                      <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
                        alt='no-product-in-cart'
                        className='w-35 h-35'
                      />
                      <p className='mt-4 text-lg text-gray-500 font-bold'>Giỏ hàng của bạn còn trống</p>
                      <Link
                        to={{ pathname: path.home }}
                        className='uppercase mt-8 text-white bg-orange-600 px-10 py-3 hover:bg-orange-600/90 hover:shadow-md'
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Có sản phẩm */}
              {!_.isEmpty(purchasesInCart) &&
                purchasesInCart?.map((purchase) => (
                  <div
                    key={purchase._id}
                    className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                  >
                    <Link
                      to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                      className='flex'
                    >
                      <div className='flex-shrink-0'>
                        <img
                          className='h-20 w-20 object-cover'
                          src={purchase.product.image}
                          alt={purchase.product.name}
                        />
                      </div>
                      <div className='ml-3 flex-grow overflow-hidden'>
                        <div className='truncate'>{purchase.product.name}</div>
                        <div className='mt-3'>x{purchase.buy_count}</div>
                      </div>
                      <div className='ml-3 flex-shrink-0'>
                        <span className='truncate text-gray-500 line-through'>
                          ₫{formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span className='ml-2 truncate text-orange-600'>₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                    </Link>
                    <div className='flex w-[25%] ml-auto '>
                      <div>
                        <span>Tổng giá tiền</span>
                        <span className='ml-4 text-xl text-orange-600'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
