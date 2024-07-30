import { configureStore } from '@reduxjs/toolkit'

import { fileSlice } from '@/entities/file'

export const store = configureStore({
  reducer: {
    files: fileSlice.reducer,
  },
})
