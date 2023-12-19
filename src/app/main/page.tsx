import { useEffect } from 'react'

import { useStoreDispatch, useStoreSelector } from '@/store/hooks'
import {
  fetchFiles,
  selectAllFiles,
  selectFetchingStatus,
} from '@/store/slices/files'
import { FileIcon } from '@/components'

export const Main = () => {
  const fetchingStatus = useStoreSelector(selectFetchingStatus)
  const files = useStoreSelector(selectAllFiles)

  const dispatch = useStoreDispatch()

  useEffect(() => {
    if (fetchingStatus === 'Pending') dispatch(fetchFiles())
  }, [fetchingStatus, dispatch])

  return (
    <>
      <main className='w-screen h-screen flex flex-col items-center justify-center'>
        {fetchingStatus === 'Pending' ? (
          <span className='loading loading-spinner loading-lg text-primary'></span>
        ) : (
          <div>
            {files.map((file) => (
              <FileIcon filename={file.filename} key={file.id} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
