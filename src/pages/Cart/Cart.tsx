import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { Purchase } from '~/types/purchase.type'
import { formatCurrency, generateNameId } from '~/utils/utils'
import { produce } from 'immer'

import _ from 'lodash'
import { Flip, toast } from 'react-toastify'
import classNames from 'classnames'
import { AppContext } from '~/contexts/app.context'

export default function Cart() {
  // Tạo state là Purchase in cart nhưng mở rộng thêm
  const [isUpdating, setIsUpdating] = useState(false)
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchasesInCartData, refetch: purchasesInCartDataRefetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: async () => {
      await purchasesInCartDataRefetch()
      setIsUpdating(false)
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: () => {
      purchasesInCartDataRefetch()
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProduct,
    onSuccess: () => {
      purchasesInCartDataRefetch()
      toast.success('Mua hàng thành công :D', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip
      })
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllPurchaseChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked),
    [extendedPurchases]
  ) // Nếu tất cả purchase đều dc checked thì true

  // Checked
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = useMemo(
    () => checkedPurchases.reduce((result, purchase) => (result += purchase.price * purchase.buy_count), 0),
    [checkedPurchases]
  )
  const totalCheckedPurchasesSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce(
        (result, purchase) => (result += (purchase.price_before_discount - purchase.price) * purchase.buy_count),
        0
      ),
    [checkedPurchases]
  )

  const location = useLocation()
  const chosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  useEffect(() => {
    // Hàm sẽ chạy khi mới vào và chạy lại khi purchasesInCart thay đổi, nó sẽ thêm các giá trị vào các Obj purchase
    setExtendedPurchases((prev) => {
      // Vì chúng ta cần xem trước khi fetch lại api, purchase đó đã check hay chưa.
      // Mà purchasesInCart không có thuộc tính checked, nên ta phải dùng hàm keyBy để tạo 1 object có key là _id, từ đó truy cập Object mới thông qua id của prev
      const extendedPurchasesObject = _.keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChosenPurchaseIdFromLocation = chosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disable: false,
            checked: isChosenPurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, chosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      // Xóa state trong location khi người dùng f5 lại trang
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExtendedPurchases(extendedPurchases.map((prev) => ({ ...prev, checked: !isAllPurchaseChecked })))
  }

  // Hàm này sẽ có tác dụng ngăn người dùng spam liên tục
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (!enable || isUpdating) return // nếu vi phạm quy tắc,ví dụ decrease khi bằng 1 là không hợp lí thì sẽ return luôn,không gọi api

    const purchase = extendedPurchases[purchaseIndex]

    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].disable = true
      })
    )
    setIsUpdating(true)
    updatePurchaseMutation.mutate({ buy_count: value, product_id: purchase.product._id })
  }

  const handleTypeQuantity = (purchaseIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  // Delete purchase
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }
  const handleDeletePurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }
  // Buy product
  const handleBuyProduct = () => {
    if (checkedPurchasesCount > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  // không có sản phẩm trong giỏ
  if (_.isEmpty(purchasesInCart)) {
    return (
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
    )
  }

  // Có sản phẩm trong giỏ
  return (
    <div className='bg-neutral-100 pt-5'>
      <div className='custom-container mb-3'>
        <div className='overflow-auto bg-white border-3 border-white  rounded-md'>
          <div className='px-5 h-14 flex items-center '>
            <div className='pl-5 pr-3'>
              <input
                type='checkbox'
                className=' h-4 w-4 accent-orange-600'
                checked={isAllPurchaseChecked}
                onChange={handleCheckedAll}
              />
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
          {extendedPurchases &&
            extendedPurchases.map((purchase, index) => (
              <div
                key={purchase._id}
                className='px-5 py-3 flex items-center border-1 border-gray-200/70 rounded-md mx-5 my-6 hover:shadow-md'
              >
                <input
                  type='checkbox'
                  className='pl-5 pr-3 h-4 w-4 accent-orange-600'
                  checked={purchase.checked}
                  onChange={handleChecked(index)}
                />
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
                  <QuantityController
                    max={purchase.product.quantity}
                    value={purchase.buy_count}
                    onIncrease={(value) => handleQuantity(index, value, purchase.buy_count < purchase.product.quantity)}
                    onDecrease={(value) => handleQuantity(index, value, purchase.buy_count > 1)}
                    onType={(value) => handleTypeQuantity(index, value as number)}
                    onInputBlur={
                      (value) =>
                        handleQuantity(
                          index,
                          value as number,
                          (purchasesInCart as Purchase[])[index].buy_count !== purchase.buy_count
                        ) // Dòng này sẽ giúp check xem nếu người dùng thay đổi input mới gọi api, nó check xem giá trị buy_count ở mảng gốc với buy_count sau khi change
                    }
                    disabled={purchase.disable}
                  />
                </div>
                {/* Price */}
                <div className=' w-[14.3%] flex justify-center'>
                  {formatCurrency(purchase.price * purchase.buy_count)}
                </div>
                {/* Action */}
                <div className='grow text-center'>
                  <button
                    className='cursor-pointer bg-none text-black transition-colors hover:text-orange-600'
                    onClick={handleDelete(index)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-4 w-4 accent-orange-600'
                checked={isAllPurchaseChecked}
                onChange={handleCheckedAll}
              />
            </div>
            <button className='mx-3 border-none bg-none cursor-pointer' onClick={handleCheckedAll}>
              Chọn tất cả ({extendedPurchases?.length})
            </button>
            <button className='mx-3 border-none bg-none cursor-pointer' onClick={handleDeletePurchases}>
              Xóa
            </button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán ({checkedPurchasesCount}):</div>
                <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasesPrice)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchasesSavingPrice)}</div>
              </div>
            </div>
            <Button
              className={classNames(
                'mt-5 flex h-10 w-52 items-center justify-center text-sm uppercase text-white sm:ml-4 sm:mt-0 ',
                {
                  'cursor-not-allowed  bg-red-300': !checkedPurchasesCount,
                  'cursor-pointer bg-red-500 hover:bg-red-600': checkedPurchasesCount
                }
              )}
              onClick={handleBuyProduct}
              disabled={buyProductMutation.isPending}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
