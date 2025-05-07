import axios, { AxiosError, HttpStatusCode } from 'axios'

// Trả về error có kiểu AxiosError<T>
export const isAxiosErrorFunc = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  // Nó sẽ check xem có phải là AXIOS ERROR hay không, nếu đúng thì sẽ check tiếp xem status có phải 422 hay không
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const formatCurrency = (currency: number) => new Intl.NumberFormat('de-DE').format(currency)

export const formatNumberToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')

export const calcDiscount = (price: number, priceBeforeDiscount: number) =>
  `-${Math.ceil(((priceBeforeDiscount - price) / priceBeforeDiscount) * 100)}%`
