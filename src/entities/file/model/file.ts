import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '@/shared/api'

import { generateFile } from '../lib'

import type { File, Status } from '@/shared/api'
import type { PayloadAction } from '@reduxjs/toolkit'

const SIZE_ICON = 112
const COL_NUMBER = 3
const ROW_NUMBER = 5

const fileAdapter = createEntityAdapter<File>()

const initialState = fileAdapter.getInitialState<{ status: Status }>({
  status: 'pending',
})

const fileSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})({
  name: 'files',
  initialState,

  reducers: (create) => ({
    addOne: create.reducer(
      (
        state,
        action: PayloadAction<Partial<Pick<File, 'id' | 'filename'>>>
      ) => {
        const files = fileAdapter.getSelectors().selectAll(state)

        const filenames = files.map(({ filename }) => filename)

        const positions = files.map(({ position }) => position)

        const file = generateFile(action.payload, filenames, positions)

        fileAdapter.addOne(state, { ...action, payload: file })
      }
    ),
    removeOne: create.reducer(
      (state, action: PayloadAction<Pick<File, 'id'>>) => {
        fileAdapter.removeOne(state, action.payload.id)
      }
    ),
    updateOne: create.reducer(
      (state, action: PayloadAction<Pick<File, 'id'> & Partial<File>>) => {
        const { id, ...changes } = action.payload

        fileAdapter.updateOne(state, { id, changes })
      }
    ),

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
          fileAdapter.setAll(state, action.payload)
        },
      }
    ),
  }),

  selectors: {
    ...fileAdapter.getSelectors(),

    selectStatus: (state) => state.status,
  },
})

export { fileSlice, SIZE_ICON, COL_NUMBER, ROW_NUMBER }
