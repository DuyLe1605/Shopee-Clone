import _ from 'lodash'
import { ParsedQuery } from 'query-string'

export default (queryParams: ParsedQuery<string>): boolean => {
  if (_.isEmpty(queryParams)) return true

  const hasInvalid = _.keys(queryParams).some((param) => {
    return !['limit', 'page'].includes(param)
  })

  return !hasInvalid
}
