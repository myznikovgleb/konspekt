import { configureStore } from '@reduxjs/toolkit'

import { fileSlice } from '@/entities/file'

export const store = configureStore({
  reducer: {
    files: fileSlice.reducer,
  },
})

export type StoreDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>
