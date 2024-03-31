import { createBrowserRouter } from 'react-router-dom'

import { _ } from './_'
import { _folder_ } from './_folder_'
import { _viewer_ } from './_viewer_'

const router = createBrowserRouter([
  {
    path: '/folder',
    element: <_folder_ />,
  },
  {
    path: '/viewer/:id',
    element: <_viewer_ />,
  },
  {
    path: '/',
    element: <_ />,
  },
])

export { router }
