import { createBrowserRouter } from 'react-router-dom'

import { File } from './file/page'
import { Main } from './main/page'
import { Home } from './page'

export const router = createBrowserRouter([
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/file/:id',
    element: <File />,
  },
  {
    path: '/',
    element: <Home />,
  },
])
