import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { Bounce, toast } from 'react-toastify'

const notify = (message: string) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce
  })
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error)
        // nếu không phải lỗi 422 thì xử lí
        if (error.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data

          // Kiểm tra xem data có message không
          const message = data.message || error.message

          notify(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
