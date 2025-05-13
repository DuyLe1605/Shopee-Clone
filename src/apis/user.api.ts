import { User } from '~/types/user.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

interface BodyUpdateProfile {
  name?: string
  phone?: string
  address?: string
  date_of_birth?: string
  avatar?: string
  password: string
  new_password: string
}

const userApi = {
  getProfile: () => http.get<SuccessResponseApi<User>>('me'),
  updateProfile: (body: BodyUpdateProfile) => http.put<SuccessResponseApi<User>>('user', body),
  uploadAvatar: (body: FormData) =>
    http.post<SuccessResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default userApi
