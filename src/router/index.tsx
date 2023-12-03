import { createBrowserRouter } from 'react-router-dom'

import { Home } from '../app/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])
