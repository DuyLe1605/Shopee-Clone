import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from '~/constants/path'
import { AppContext } from '~/contexts/app.context'

import { getAvatarUrl } from '~/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={getAvatarUrl(profile?.avatar)} alt='profile-img' className='h-full w-full object-cover' />
        </Link>
        <div className='ml-1'>
          <div className='font-bold'>{profile?.email || 'User'}</div>
          <div className='flex items-center '>
            <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              ></path>
            </svg>
            <Link to={path.profile} className='ml-1 capitalize text-gray-500'>
              Sửa hồ sơ
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-orange-600': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Tài khoản của tôi</div>
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-orange-600': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Đổi mật khẩu</div>
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-orange-600': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Đơn mua</div>
        </NavLink>
      </div>
    </div>
  )
}
