import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@/app/page'
import { Main } from '@/app/main/page'

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
