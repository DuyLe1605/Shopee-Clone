export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='custom-container'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='lg:col-span-1'>
            <p>© {year} Shopee. Tất cả các quyền được bảo lưu.</p>
          </div>
          <div className='lg:col-span-2'>
            <p>
              Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam Philippines Brazil México Colombia
              Chile Đài Loan
            </p>
          </div>
        </div>
        <div className='text-center text-sm mt-10'>
          <p>Công ty TNHH Shopee</p>
          <p className='mt-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Chăm sóc khách hàng: Gọi tổng đài Shopee (miễn phí) hoặc Trò chuyện với Shopee ngay
            trên Trung tâm trợ giúp
          </p>
          <p className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</p>
          <p className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </p>
          <p className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  )
}
