import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from '../types/user.type'

// Context này sẽ load lại giá trị mỗi khi dc tải lại trang.
// Lần đầu tải, nó sẽ tự động lấy dữ liệu từ local storage và set State.
//  Các lần sau khi local storage thay đổi, ta sẽ phải tự set lại giá trị cho các state

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

// Tạo context với giá trị khởi tạo,giá trị này sẽ được sử dụng khi không truyền value vào Provider
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Tạo state và truyền initial value vào
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

// Mỗi khi load lại trang, nó sẽ check xem có access token hay không
