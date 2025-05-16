import { User } from '../types/user.type'

// Tạo một đối tượng EventTarget mới để làm trung gian phát và nghe sự kiện liên quan đến localStorage
export const LocalStorageEventTarget = new EventTarget()

// Access Token
export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

// Refresh Token
export const saveRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

// Profile
export const saveProfileToLS = (profile: User) => {
  const profileString = JSON.stringify(profile)
  localStorage.setItem('profile', profileString)
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : result
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  // Tạo một sự kiện mới với tên 'clearLS'
  // Sự kiện này có thể được lắng nghe ở nơi khác trong ứng dụng
  const clearLSEvent = new Event('clearLS')
  // Phát (dispatch) sự kiện 'clearLS' từ LocalStorageEventTarget
  // Tất cả các listener đang lắng nghe 'clearLS' trên đối tượng này sẽ được gọi
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
