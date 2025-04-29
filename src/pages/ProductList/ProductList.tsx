import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import DefaultProduct from './DefaultProduct'
import SortProductList from './SortProductList'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'

import { Product as ProductType } from '../../types/product.type'
import shouldRenderDefaultProduct from '../../utils/shouldRenderDefaultProduct'
import Product from './Product/Product'

export default function ProductList() {
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['ProductList', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
  })

  return (
    <div className='bg-gray-200 py-7'>
      <div className='custom-container'>
        <div className='grid grid-cols-12 gap-6'>
          {/* Aside Filter */}
          <div className='col-span-2 '>
            <AsideFilter />
          </div>
          {/*  */}
          <div className='col-span-10'>
            <SortProductList />
            <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    {shouldRenderDefaultProduct(queryParams) && <DefaultProduct product={product} />}
                    {!shouldRenderDefaultProduct(queryParams) && <Product product={product} />}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
