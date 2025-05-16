import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
import { ParsedQuery } from 'query-string'

export default (queryParams: ParsedQuery<string>): boolean => {
  if (isEmpty(queryParams)) return true

  const hasInvalid = keys(queryParams).some((param) => {
    return !['limit', 'page'].includes(param)
  })

  return !hasInvalid
}
