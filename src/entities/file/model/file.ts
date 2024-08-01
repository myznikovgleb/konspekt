import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '@/shared/api'

import { generateFile } from '../lib'

import type { File, Status } from '@/shared/api'
import type { PayloadAction } from '@reduxjs/toolkit'

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
        const file = generateFile(action.payload)

        const [name, extension] = file.filename.split('.')

        const filenames = fileAdapter
          .getSelectors()
          .selectAll(state)
          .map(({ filename }) => filename)

        for (
          let i = 1;
          filenames.some((filename) => filename === file.filename);
          i++
        ) {
          file.filename = `${name}-${i}.${extension}`
        }

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

export { fileSlice }
