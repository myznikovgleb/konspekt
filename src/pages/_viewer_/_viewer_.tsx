import { useParams } from 'react-router'

import { FileViewer } from '@/entities/file'
import { Layout } from '@/shared/ui'

const Page = () => {
  const { id = '' } = useParams()

  return (
    <Layout>
      <FileViewer id={id} />
    </Layout>
  )
}

export { Page }
