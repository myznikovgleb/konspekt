import { useEffect } from 'react'

import { useStoreDispatch, useStoreSelector } from '@/app/hooks'
import { fileSlice } from '@/entities/file/model'
import { FileFolder } from '@/entities/file/ui'
import { Layout, Spinner } from '@/shared/ui'

const _folder_ = () => {
  const dispatch = useStoreDispatch()

  const fetchingStatus = useStoreSelector(fileSlice.selectors.selectStatus)
  const files = useStoreSelector(fileSlice.selectors.selectAll)

  const isPending = fetchingStatus === 'pending'

  useEffect(() => {
    if (isPending) {
      dispatch(fileSlice.actions.fetch({}))
    }
  }, [isPending, dispatch])

  return (
    <Layout>{isPending ? <Spinner /> : <FileFolder files={files} />}</Layout>
  )
}

export { _folder_ }
