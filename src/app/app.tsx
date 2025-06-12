import { Provider } from 'react-redux'

import { RouterProvider } from '@/pages'

import { store } from './store'

import './index.css'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  )
}

export { App }
