import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

// Kiểu trả về là 1 AuthResponse
export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('register', body)
export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('login', body)
export const logoutAccount = () => http.post('logout')
