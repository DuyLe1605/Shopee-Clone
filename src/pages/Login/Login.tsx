import { Link } from 'react-router-dom'
import '../Auth.scss'
export default function Login() {
  return (
    <div className='bg-[var(--primary-orange-color)] mt-4 shopee-bg-img'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py:12 lg:py-32 lg:pr-10'>
          <div className='col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl '>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  autoComplete='on'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'></div>
              </div>
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>

              <div className='flex justify-center mt-8 text-[18px]'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='text-red-400 ml-2'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
