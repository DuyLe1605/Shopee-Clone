import { keepPreviousData, useQuery } from '@tanstack/react-query'

import AsideFilter from './components/AsideFilter'
import DefaultProduct from './components/DefaultProduct'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'
import Pagination from '../../components/Pagination'

import productApi from '../../apis/product.api'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import shouldRenderDefaultProduct from '../../utils/shouldRenderDefaultProduct'
import categoryApi from '../../apis/category.api'
import useQueryConfig from '../../hooks/useQueryConfig'

export default function ProductList() {
  // Làm như vậy để lọc ra những param thuộc ProductListConfig, loại bỏ những trường undefined
  const queryConfig = useQueryConfig()
  // Get api Product
  const { data: productData } = useQuery({
    queryKey: ['ProductList', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
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
                    {shouldRenderDefaultProduct(queryConfig) && <DefaultProduct product={product} />}
                    {!shouldRenderDefaultProduct(queryConfig) && <Product product={product} />}
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
