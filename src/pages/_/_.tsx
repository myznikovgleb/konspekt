import { Link } from 'react-router-dom'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/folder`

  return (
    <Layout>
      <Link to={path} className="btn btn-primary btn-lg btn-wide">
        Run Konspekt
      </Link>
    </Layout>
  )
}

export { _ }
