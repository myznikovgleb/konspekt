import { createBrowserRouter } from 'react-router-dom'

import { Main } from './main/page'
import { Home } from './page'

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
