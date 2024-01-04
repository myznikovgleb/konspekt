import { useParams } from 'react-router-dom'

import { useStoreSelector } from '@/app/hooks'
import { selectFileById } from '@/entities/file/model/filesSlice'
import { Layout } from '@/shared/ui'

export const File = () => {
  const { id = '' } = useParams()

  const file = useStoreSelector((state) => selectFileById(state, id))

  return (
    <Layout>
      <div className="text-xl">{file?.content}</div>
    </Layout>
  )
}
