import _ from 'lodash'
import { ProductListConfig } from '../types/product.type'
import useQueryParams from './useQueryParams'

export type QueryParams = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
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
  return queryConfig
}
