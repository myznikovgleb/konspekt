import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/pages'

import { store } from './store'

import './index.css'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export { App }
