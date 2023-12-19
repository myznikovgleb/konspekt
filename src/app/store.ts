import { configureStore } from '@reduxjs/toolkit'

import filesSlice from '../entities/file/model/filesSlice'

export const store = configureStore({
  reducer: {
    files: filesSlice,
  },
})

export type StoreDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>
