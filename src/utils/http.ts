import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { Bounce, toast } from 'react-toastify'
import { clearLocalStorage, getAccessTokenFromLS, saveAccessTokenToLS, saveProfileToLS } from './auth'
import { AuthResponse } from '../types/auth.type'

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
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenFromLS()

    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Hàm xử lí trước khi request được gửi đi
    this.instance.interceptors.request.use((config) => {
      // Để đối với những request cần authorization, nó sẽ gửi kèm access token
      if (this.access_token) {
        config.headers.authorization = this.access_token
        return config
      }
      return config
    })

    // Hàm xử lí trước khi response được trả về
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        // Kiểm tra xem url trả về là cái gì
        if (url === 'login') {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          saveAccessTokenToLS(this.access_token)
          saveProfileToLS(data.data.user)
        } else if (url === 'logout') {
          this.access_token = ''
          clearLocalStorage()
        }

        return response
      },
      function (error: AxiosError) {
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
