import { configureStore } from '@reduxjs/toolkit'

import accountSlice from './slices/account'

export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
})

export type StoreDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>
