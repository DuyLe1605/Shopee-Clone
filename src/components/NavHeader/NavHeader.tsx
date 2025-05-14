import { Link } from 'react-router-dom'
import Popover from '../Popover'
import path from '~/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import authApi from '~/apis/auth.api'
import { purchasesStatus } from '~/constants/purchase'
import { getAvatarUrl } from '~/utils/utils'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex justify-end'>
      {/* Language */}
      <Popover
        children={
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </>
        }
        renderPopover={
          <div className='bg-white relative shadow-md '>
            <div className='flex flex-col  border border-gray-200  min-w-[12.5rem] cursor-pointer'>
              <button className='p-2.5 hover:text-orange-600 cursor-pointer text-left'>Tiếng Việt</button>
              <button className='p-2.5 hover:text-orange-600 cursor-pointer text-left'>English</button>
            </div>
          </div>
        }
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer '
        type='language'
      />

      {/* User */}
      {isAuthenticated && (
        <Popover
          children={
            <>
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <img
                  src={getAvatarUrl(profile?.avatar)}
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <span>{profile?.email}</span>
            </>
          }
          renderPopover={
            <div className='bg-white relative shadow-md  '>
              <div className='flex flex-col  border border-gray-200 cursor-pointer'>
                <Link
                  to={path.profile}
                  className='p-3.5 hover:text-[var(--green-color)] cursor-pointer hover:bg-gray-50'
                >
                  Tài khoản của tôi
                </Link>
                <Link to='/' className='p-3.5 hover:text-[var(--green-color)] cursor-pointer hover:bg-gray-50'>
                  Đơn mua
                </Link>
                <button
                  className='p-3.5 hover:text-[var(--green-color)] cursor-pointer text-left hover:bg-gray-50'
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          }
          className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
          type='user'
        />
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-r-while/40 h-4'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </div>
  )
}
