declare type StoreDispatch = typeof import('./store').store.dispatch
declare type StoreState = ReturnType<typeof import('./store').store.getState>
