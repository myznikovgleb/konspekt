import { createBrowserRouter } from 'react-router-dom'

import { Home } from './page'
import { Main } from './main/page'

export const router = createBrowserRouter([
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/',
    element: <Home />,
  },
])
