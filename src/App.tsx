import './App.css'
import useRouteElements from './useRouteElements'
import { Bounce, ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/auth'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { resetAll } = useContext(AppContext)

  useEffect(() => {
    // Khi component được mount, đăng ký lắng nghe sự kiện 'clearLS'
    // Khi sự kiện 'clearLS' được phát (dispatch), hàm resetAll sẽ được gọi
    LocalStorageEventTarget.addEventListener('clearLS', resetAll)

    // Cleanup: Khi component unmount, gỡ bỏ listener để tránh memory leak
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetAll)
    }
  }, [resetAll]) // useEffect phụ thuộc vào resetAll

  return (
    <div>
      {routeElements}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
      />
    </div>
  )
}

export default App
