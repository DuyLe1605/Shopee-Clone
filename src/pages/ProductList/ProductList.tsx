import { keepPreviousData, useQuery } from '@tanstack/react-query'
import _ from 'lodash'

import AsideFilter from './AsideFilter'
import DefaultProduct from './DefaultProduct'
import SortProductList from './SortProductList'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import shouldRenderDefaultProduct from '../../utils/shouldRenderDefaultProduct'
import Product from './Product/Product'
import Pagination from '../../components/Pagination'
import categoryApi from '../../apis/category.api'

export type QueryParams = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryParams = useQueryParams()
  // Làm như vậy để lọc ra những param thuộc ProductListConfig, loại bỏ những trường undefined
  const queryConfig: QueryParams = _.omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    _.isUndefined
  )
  // Get api Product
  const { data: productData } = useQuery({
    queryKey: ['ProductList', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  // Get api Categories, trả về 1 mảng danh sách các Category
  const { data: categoriesData } = useQuery({
    queryKey: ['Categories'],
    queryFn: () => categoryApi.getCategories()
  })
  return (
    <div className='bg-gray-200 py-7'>
      <div className='custom-container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            {/* Aside Filter */}
            <div className='col-span-2 '>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            {/*  */}
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
              <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productData.data.data.products.map((product: ProductType) => (
                  <div className='col-span-1' key={product._id}>
                    {shouldRenderDefaultProduct(queryParams) && <DefaultProduct product={product} />}
                    {!shouldRenderDefaultProduct(queryParams) && <Product product={product} />}
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
