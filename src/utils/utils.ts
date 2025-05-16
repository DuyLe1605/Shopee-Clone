import axios, { AxiosError, HttpStatusCode } from 'axios'

import userImage from '~/assets/images/user.svg'
import { ErrorResponseApi } from '~/types/utils.type'

// Trả về error có kiểu AxiosError<T>
export const isAxiosErrorFunc = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

// Check Axios Error
export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  // Nó sẽ check xem có phải là AXIOS ERROR hay không, nếu đúng thì sẽ check tiếp xem status có phải 422 hay không
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  // Nó sẽ check xem có phải là AXIOS ERROR hay không, nếu đúng thì sẽ check tiếp xem status có phải 422 hay không
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export const isAxiosExpiredTokenError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  // Nó sẽ check xem có phải là AXIOS ERROR hay không, nếu đúng thì sẽ check tiếp xem status có phải 422 hay không
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

//  Format
export const formatCurrency = (currency: number) => new Intl.NumberFormat('de-DE').format(currency)

export const formatNumberToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')

export const calcDiscountPerCent = (price: number, priceBeforeDiscount: number) =>
  `-${Math.ceil(((priceBeforeDiscount - price) / priceBeforeDiscount) * 100)}%`

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? avatarName : userImage)
