import { useDispatch, useSelector } from 'react-redux'

import type { StoreState, StoreDispatch } from './store'
import type { TypedUseSelectorHook } from 'react-redux'

export const useStoreDispatch: () => StoreDispatch = useDispatch
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector
