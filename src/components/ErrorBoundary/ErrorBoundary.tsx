import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className='grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center '>
            <p className='text-base font-semibold text-orange-600'>Error !!!</p>
            <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl'>
              Page đang bị lỗi
            </h1>
            <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <a
                href='/'
                className='rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              >
                Go back home
              </a>
              <a href='https://github.com/DuyLe1605' className='text-sm font-semibold text-gray-900'>
                Contact support <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
