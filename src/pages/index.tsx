import { createBrowserRouter } from 'react-router-dom'

import { File } from './file'
import { Main } from './main'
import { Welcome } from './welcome'

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
    element: <Welcome />,
  },
])
