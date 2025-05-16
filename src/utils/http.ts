import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { Bounce, toast } from 'react-toastify'
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
  saveRefreshTokenToLS
} from './auth'
import { AuthResponse, RefreshTokenResponse } from '../types/auth.type'
import config from '~/constants/config'
import { authApiConfig } from '~/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseApi } from '~/types/utils.type'

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
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null

    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 5, //10s
        'expire-refresh-token': 60 * 60 // 1 hour
      }
    })

    // Hàm xử lí trước khi request được gửi đi
    this.instance.interceptors.request.use((config) => {
      // Để đối với những request cần authorization, nó sẽ gửi kèm access token
      if (this.accessToken) {
        config.headers.authorization = this.accessToken
        return config
      }
      return config
    })

    // Hàm xử lí trước khi response được trả về
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        // Kiểm tra xem url trả về là cái gì
        if (url === authApiConfig.URL_LOGIN) {
          const data = response.data as AuthResponse
          // Lấy access và refresh token từ trong data
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token

          saveAccessTokenToLS(this.accessToken)
          saveRefreshTokenToLS(this.refreshToken)
          saveProfileToLS(data.data.user)
        } else if (url === authApiConfig.URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }

        return response
      },
      (error: AxiosError) => {
        // nếu không phải lỗi 422 và 401 thì xử lí và toast message lên
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data

          // Kiểm tra xem data có message không
          const message = data?.message || error.message

          notify(message)
        }

        // Khi access token hết hạn, nó sẽ trả về status code 401, và nó có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền Token
        // - Token hết hạn
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // Trường hợp token hết hạn và request không phải request của refreshToken thì
          // Chúng ta sẽ tiến hành gọi refresh Token
          if (isAxiosExpiredTokenError(error) && url !== authApiConfig.URL_REFRESH_TOKEN) {
            // nếu không có hàm refreshTokenRequest thì sẽ chạy hàm handleRefreshToken ( nó là 1 promise)
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })

            // then có nghĩa là nếu gọi refresh token thành công thì sẽ trả về access token
            return this.refreshTokenRequest.then((access_token) => {
              // Dòng này sẽ giúp chúng ta gọi lại request cũ bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })

            // Không cần throw lỗi vì hàm handleRefreshToken đã tự throw lỗi
          }

          // Còn những trường hợp :Token không đúng, Không truyền Token, Token hết hạn
          // Ta sẽ clear Local Storage
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
          notify(error.response?.data.data?.message || (error.response?.data.message as string))
        }

        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(authApiConfig.URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        saveAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((err) => {
        this.accessToken = ''
        this.refreshToken = ''
        clearLocalStorage()

        throw new Error(err)
      })
  }
}

const http = new Http().instance
export default http
