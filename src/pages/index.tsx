import { createBrowserRouter } from 'react-router-dom'

import { Folder } from './folder'
import { Viewer } from './viewer'
import { Welcome } from './welcome'

export const router = createBrowserRouter([
  {
    path: '/folder',
    element: <Folder />,
  },
  {
    path: '/viewer/:id',
    element: <Viewer />,
  },
  {
    path: '/',
    element: <Welcome />,
  },
])
