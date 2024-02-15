import { useEffect } from 'react'

import { useStoreDispatch, useStoreSelector } from '@/app/hooks'
import {
  fetchFiles,
  selectAllFiles,
  selectFetchingStatus,
} from '@/entities/file/model'
import { FileFolder } from '@/entities/file/ui'
import { Layout, Spinner } from '@/shared/ui'

export const Folder = () => {
  const fetchingStatus = useStoreSelector(selectFetchingStatus)
  const files = useStoreSelector(selectAllFiles)

  const dispatch = useStoreDispatch()

  const isPending = fetchingStatus === 'Pending'

  useEffect(() => {
    if (isPending) dispatch(fetchFiles())
  }, [isPending, dispatch])

  return (
    <Layout>{isPending ? <Spinner /> : <FileFolder files={files} />}</Layout>
  )
}
