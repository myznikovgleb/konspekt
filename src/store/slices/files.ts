import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'

import type { StoreState } from '@/store/store'
import { client } from '@/api/client'

export type File = {
  id: string
  filename: string
  date: number
  content: string
}

type Status = 'Pending' | 'Fulfilled' | 'Rejected'

const filesAdapter = createEntityAdapter<File>({
  sortComparer: (a, b) => a.date - b.date,
})

const initialState = filesAdapter.getInitialState<{ status: Status }>({
  status: 'Pending',
})

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'Pending'
      })
      .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<File[]>) => {
        state.status = 'Fulfilled'
        filesAdapter.upsertMany(state, action.payload)
      })
  },
})

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await client.get()
  return response
})

export const { selectAll: selectAllFiles, selectById: selectFileById } =
  filesAdapter.getSelectors((state: StoreState) => state.files)

export const selectFetchingStatus = (state: StoreState) => state.files.status

export default filesSlice.reducer
