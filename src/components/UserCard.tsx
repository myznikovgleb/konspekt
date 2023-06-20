import { useStoreDispatch, useStoreSelector } from '../store/hooks'

import { selectFullName, setType } from '../store/slices/account'

export const UserCard = () => {
  const fullName = useStoreSelector(selectFullName)
  const type = useStoreSelector((state) => state.account.type)

  const dispatch = useStoreDispatch()

  return (
    <div className='card bg-neutral text-neutral-content'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{fullName}</h2>
        <p>{type}</p>
        <div className='card-actions justify-end flex flex-col'>
          <button
            onClick={() => dispatch(setType('Service'))}
            className='btn btn-wide uppercase'
          >
            Make Me Service Worker
          </button>
          <button
            onClick={() => dispatch(setType('User'))}
            className='btn btn-wide btn-outline uppercase'
          >
            Make Me Regular User
          </button>
        </div>
      </div>
    </div>
  )
}
