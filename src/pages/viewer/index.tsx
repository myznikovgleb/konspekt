import { useParams } from 'react-router-dom'

import { FileViewer } from '@/entities/file/ui'
import { Layout } from '@/shared/ui'

export const Viewer = () => {
  const { id = '' } = useParams()

  return (
    <Layout>
      <FileViewer id={id} />
    </Layout>
  )
}
