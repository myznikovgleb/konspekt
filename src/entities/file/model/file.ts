import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '@/shared/api'

import type { File, Status } from '@/shared/api'
import type { PayloadAction } from '@reduxjs/toolkit'

const fileAdapter = createEntityAdapter<File>({
  sortComparer: (a, b) => a.date - b.date,
})

const initialState = fileAdapter.getInitialState<{ status: Status }>({
  status: 'pending',
})

const fileSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})({
  name: 'files',
  initialState,

  reducers: (create) => ({
    setOne: create.reducer((state, action: PayloadAction<File>) => {
      fileAdapter.setOne(state, action)
    }),

    fetch: create.asyncThunk(
      async () => {
        const response = await client.get()
        return response
      },
      {
        pending: (state) => {
          state.status = 'pending'
        },
        fulfilled: (state, action: PayloadAction<File[]>) => {
          state.status = 'fulfilled'
          fileAdapter.upsertMany(state, action.payload)
        },
      }
    ),
  }),

  selectors: {
    ...fileAdapter.getSelectors(),

    selectStatus: (state) => state.status,
  },
})

export { fileSlice }
