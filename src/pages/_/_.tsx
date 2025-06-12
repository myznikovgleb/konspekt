import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

import { Layout } from '@/shared/ui'

const _ = () => {
  const refLink = useRef<HTMLAnchorElement>(null)

  const path = `/folder`

  useEffect(() => {
    if (!refLink.current) {
      return
    }

    refLink.current.focus()
  }, [])

  return (
    <Layout>
      <Link ref={refLink} to={path} className="btn btn-primary btn-lg btn-wide">
        <ChevronRightIcon className="size-8" />
        <span>run konspekt</span>
      </Link>
    </Layout>
  )
}

export { _ }
