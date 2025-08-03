import { useParams } from 'react-router'

import { FileViewer } from '@/entities/file'
import { Layout } from '@/shared/ui'

const Page = () => {
  const { id = '' } = useParams()

  return (
    <Layout>
      <section className="gradient-animated size-full">
        <div className="flex size-full items-center justify-center">
          <FileViewer id={id} />
        </div>
      </section>
    </Layout>
  )
}

export { Page }
