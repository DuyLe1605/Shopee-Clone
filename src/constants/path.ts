const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  register: '/register',
  login: '/login',
  logout: '/logout',
  cart: '/cart',
  productDetail: ':nameId'
} as const

export default path
