import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

// Kiểu trả về là 1 AuthResponse
const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('register', body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('login', body),
  logout: () => http.post('logout')
}

export default authApi
