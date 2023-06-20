import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import { StoreState } from '../store'

type AccountType = 'User' | 'Service'
type Account = {
  id: string
  firstName: string
  lastName: string
  type: AccountType
}

const initialState: Account = {
  id: '0',
  firstName: 'Gleb',
  lastName: 'Myznikov',
  type: 'User',
}

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    setType: (state, action: PayloadAction<AccountType>) => {
      state.type = action.payload
    },
  },
})

export const { setType } = accountSlice.actions

export const selectFullName = (state: StoreState) =>
  state.account.firstName + ' ' + state.account.lastName

export default accountSlice.reducer
