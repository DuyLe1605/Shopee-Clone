import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/'>
      <div className='bg-white rounded-md shadow hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform cursor-pointer '>
        {/* IMG */}
        <div className='w-full pt-[100%] relative '>
          <img
            src='https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/491841889_2513927372281963_1945701087108801880_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGcpuREV9II6-VcSkyeeXxX8aB21uq5z8zxoHbW6rnPzABmCWTBHZ8jjdcSvDXmYsq0vemWK3Uy7P1tHbawtiBq&_nc_ohc=rnbF96_f_4IQ7kNvwFQOXnO&_nc_oc=AdkN0jdwR7uBYgnKGcY6pKoun4EM-lxUV0rLIgpSxkO5Wm6lTWahQPxk97wzNY-pqSDf13NdI-Bp6wGKdzNaBgQc&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=-ChXwz3H6I3RdZFQiBRbzg&oh=00_AfHqgyy7uh271KEw8bPStlljTmkbz_tLRVhdHOmzGCwadA&oe=6815686E'
            alt='product-img'
            className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-t-md '
          />
          {/* Voucher */}
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134258-7ra0g-m8z4e5zabyo456'
            alt='product-img'
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        </div>
        {/* Text */}
        <div className='p-2 overflow-hidden flex flex-col flex-1 justify-between h-29'>
          {/* Name */}
          <div className='space-y-1 flex flex-col justify-between mb-2'>
            <div className='min-h-[1.75rem] text-sm line-clamp-2'>
              <img
                src='https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lyb3m8mjjmape6'
                alt='flag-label'
                className='mr-0.5 inline-block h-3.5'
              ></img>
              Túi đeo ngang Nike, em nhận chỉ vài trăm 🐟🐟🐟 Đi chơi, đi học, đi tập đều đẹp nhé ace ơi😍
            </div>
          </div>
          {/* Price */}
          <div className='flex items-center justify-between mb-2'>
            <div className='text-orange-600 '>
              <span>₫</span>
              <span>27.000</span>
            </div>
            <span className='text-xs'>Đã bán 3,2k</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
