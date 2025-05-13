type Role = 'Admin' | 'User'

export interface User {
  roles: Role[]
  _id: string
  email: string
  name?: string
  date_of_birth?: string
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
