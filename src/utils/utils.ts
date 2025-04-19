import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosErrorFunc = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosErrorFunc(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
