import { User } from '../types/user.type'

// Access Token
export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

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
  localStorage.removeItem('profile')
}
