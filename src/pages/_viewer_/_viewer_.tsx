import { useParams } from 'react-router-dom'

import { FileViewer } from '@/entities/file'
import { Layout } from '@/shared/ui'

const _viewer_ = () => {
  const { id = '' } = useParams()

  return (
    <Layout>
      <FileViewer id={id} />
    </Layout>
  )
}

export { _viewer_ }
