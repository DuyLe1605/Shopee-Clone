import { Category } from '../types/category.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}

export default categoryApi
