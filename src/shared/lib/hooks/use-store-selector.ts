import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'

export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector
