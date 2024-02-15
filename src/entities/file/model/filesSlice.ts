import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { client } from '@/shared/api/client'

import type { StoreState } from '@/app/store'
import type { File } from '@/entities/file/types'
import type { Status } from '@/shared/api/client'
import type { PayloadAction } from '@reduxjs/toolkit'

const filesAdapter = createEntityAdapter<File>({
  sortComparer: (a, b) => a.date - b.date,
})

const initialState = filesAdapter.getInitialState<{ status: Status }>({
  status: 'Pending',
})

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    updateFile(state, action: PayloadAction<File>) {
      const { id, content, date } = action.payload

      const updatedFile = state.entities[id]

      if (updatedFile) {
        updatedFile.content = content
        updatedFile.date = date
      }
    },
  },
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

export const { updateFile } = filesSlice.actions

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await client.get()
  return response
})

export const {
  selectAll: selectAllFiles,
  selectById: selectFileById,
  selectIds: selectFilesIds,
} = filesAdapter.getSelectors((state: StoreState) => state.files)

export const selectFetchingStatus = (state: StoreState) => state.files.status
