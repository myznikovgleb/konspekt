import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/folder`

  return (
    <Layout>
      <Link to={path} className="btn btn-primary btn-lg btn-wide">
        <ChevronRightIcon className="h-8 w-8" />
        <span>run konspekt</span>
      </Link>
    </Layout>
  )
}

export { _ }
