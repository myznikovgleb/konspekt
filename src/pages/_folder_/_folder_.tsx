import { useEffect } from 'react'

import { fileSlice, FileFolder } from '@/entities/file'
import { useStoreDispatch, useStoreSelector } from '@/shared/lib'
import { Layout, Spinner } from '@/shared/ui'
import { MenubarBottom, MenubarTop } from '@/widgets/menubar'

const Page = () => {
  const dispatch = useStoreDispatch()

  const fetchingStatus = useStoreSelector(fileSlice.selectors.selectStatus)
  const files = useStoreSelector(fileSlice.selectors.selectAll)

  const isPending = fetchingStatus === 'pending'

  useEffect(() => {
    if (isPending) {
      dispatch(fileSlice.actions.fetch())
    }
  }, [isPending, dispatch])

  return (
    <Layout>
      <section className="gradient-animated size-full">
        {isPending ? (
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex size-full flex-col">
            <MenubarTop />
            <FileFolder files={files} />
            <MenubarBottom />
          </div>
        )}
      </section>
    </Layout>
  )
}

export { Page }
