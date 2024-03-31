import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { store } from '@/app/store'
import { router } from '@/pages'

import './index.css'

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
