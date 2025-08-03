import { BrowserRouter, Route, Routes } from 'react-router'

import { Page as _ } from './_'
import { Page as _folder_ } from './_folder_'
import { Page as _viewer_ } from './_viewer_'

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<_ />} />
        <Route path="folder" element={<_folder_ />} />
        <Route path="viewer">
          <Route path=":id" element={<_viewer_ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { RouterProvider }
