import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import _ from 'lodash'
import path from '~/constants/path'
import { useForm } from 'react-hook-form'
import { searchSchema, SearchSchema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<SearchSchema>({
    defaultValues: { name: '' },
    resolver: yupResolver(searchSchema)
  })
  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? _.omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name }

    navigate({
      pathname: path.home,
      search: createSearchParams(_.omit(config, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  })
  return { register, onSubmit }
}
