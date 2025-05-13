import { Link } from 'react-router-dom'
import path from '~/constants/path'

export default function UserSideNav() {
  return (
    <div>
      <div className='flex py-4'>
        <Link to={path.profile} className='h-12.5 w-12.5'>
          {' '}
          <img
            src='https://i.ytimg.com/vi/iXMeLuKRS-I/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLD6ISiu7TDuKbyKr_4WCRq2_xaf7w'
            alt='profile-img'
            className='h-7.5 w-7.5 object-cover rounded-full'
          />
        </Link>
        <div className='pl-4'>
          <div className='font-bold'>duylee1231</div>
          <div className='flex items-center '>
            <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fill-rule='evenodd'
              ></path>
            </svg>
            <button className='ml-1 capitalize text-gray-500'>Sửa hồ sơ</button>
          </div>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center mb-4'>
          <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Tài khoản của tôi</div>
        </Link>
        <Link to={path.changePassword} className='flex items-center mb-4 '>
          <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Đổi mật khẩu</div>
        </Link>
        <Link to={path.historyPurchase} className='flex items-center '>
          <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' className='w-5 h-5' />
          <div className='capitalize ml-2.5'>Đơn mua</div>
        </Link>
      </div>
    </div>
  )
}
