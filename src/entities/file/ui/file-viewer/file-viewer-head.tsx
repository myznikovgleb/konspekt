import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import type { File } from '@/shared/api'

type FileViewerHeadProps = Pick<File, 'filename'>

const FileViewerHead = (props: FileViewerHeadProps) => {
  const { filename } = props

  const path = `/folder`

  return (
    <div className="flex h-16 w-full flex-row-reverse items-center justify-between rounded-t-lg bg-primary px-2 md:flex-row md:px-8">
      <h2 className="px-4 font-semibold text-primary-content md:text-lg">
        {filename}
      </h2>
      <Link to={path} className="rounded-full focus:ring-base-100">
        <span className="m-1 hidden h-4 w-4 rounded-full bg-base-100 md:block" />
        <ChevronLeftIcon className="block h-8 w-8 text-primary-content md:hidden" />
      </Link>
    </div>
  )
}

export { FileViewerHead }
