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
        <div className="hidden size-5 items-center justify-center md:flex">
          <div className="size-4 rounded-full bg-base-100 duration-150 ease-in hover:size-5" />
        </div>
        <ChevronLeftIcon className="block size-8 text-primary-content md:hidden" />
      </Link>
    </div>
  )
}

export { FileViewerHead }
