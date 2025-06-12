import { BrowserRouter, Route, Routes } from 'react-router'

import { Page_ } from './_'
import { Page_folder_ } from './_folder_'
import { Page_viewer_ } from './_viewer_'

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Page_ />} />
        <Route path="folder" element={<Page_folder_ />} />
        <Route path="viewer">
          <Route path=":id" element={<Page_viewer_ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { RouterProvider }
