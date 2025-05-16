import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

export const authApiConfig = {
  URL_LOGIN: 'login',
  URL_REGISTER: 'register',
  URL_LOGOUT: 'logout',
  URL_REFRESH_TOKEN: 'refresh-access-token'
}

// Kiểu trả về là 1 AuthResponse
const authApi = {
  registerAccount: (body: { email: string; password: string }) =>
    http.post<AuthResponse>(authApiConfig.URL_REGISTER, body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>(authApiConfig.URL_LOGIN, body),
  logout: () => http.post(authApiConfig.URL_LOGOUT)
}

export default authApi
