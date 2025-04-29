import queryString from 'query-string'

export default function useQueryParams() {
  const parsed = queryString.parse(location.search, {})
  return parsed
}
