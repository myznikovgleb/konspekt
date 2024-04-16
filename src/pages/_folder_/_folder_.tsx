import { useEffect } from 'react'

import { useStoreDispatch, useStoreSelector } from '@/app/hooks'
import { fileSlice, FileFolder } from '@/entities/file'
import { Layout, Spinner } from '@/shared/ui'
import { Menubar } from '@/widgets/menu'

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
    <Layout>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <Menubar />
          <FileFolder files={files} />
        </>
      )}
    </Layout>
  )
}

export { _folder_ }
