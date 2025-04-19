import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosErrorFunc = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  // Nó sẽ check xem có phải là AXIOS ERROR hay không, nếu đúng thì sẽ check tiếp xem status có phải 422 hay không
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
