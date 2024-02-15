import { Link } from 'react-router-dom'

import { Layout } from '@/shared/ui'

export const Welcome = () => {
  const path = `/folder`

  return (
    <Layout>
      <Link to={path} className="btn btn-primary btn-lg btn-wide">
        Run Konspekt
      </Link>
    </Layout>
  )
}
