import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '@/shared/api'

import { generateFile, positionLimit } from '../lib'

import type { File, Position, Status } from '@/shared/api'
import type { PayloadAction } from '@reduxjs/toolkit'

const fileAdapter = createEntityAdapter<File>()

const initialState = fileAdapter.getInitialState<{
  status: Status
  positionLimit: Position
}>({
  status: 'pending',
  positionLimit: { col: 0, row: 0 },
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

        const file = generateFile(
          action.payload,
          filenames,
          positions,
          state.positionLimit
        )

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

    setPositionLimit: create.reducer(
      (state, action: PayloadAction<{ height: number; width: number }>) => {
        state.positionLimit = positionLimit(action.payload)
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
    selectPositionLimit: (state) => state.positionLimit,
  },
})

export { fileSlice }
