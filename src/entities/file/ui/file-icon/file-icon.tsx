import { BookOpenIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import type { File } from '@/shared/api'

type FileIconProps = Pick<File, 'filename' | 'id'>

const FileIcon = (props: FileIconProps) => {
  const { filename, id } = props

  const path = `/viewer/${id}`

  return (
    <Link
      to={path}
      className="flex w-full cursor-pointer flex-row items-center gap-8 rounded-xl px-4 py-2 md:w-32 md:flex-col md:gap-2 md:p-4 md:hover:bg-base-200/50"
    >
      <div className="rounded-xl bg-base-200 p-4">
        <BookOpenIcon className="h-8 w-8" />
      </div>
      <div className="text-lg font-semibold">{filename}</div>
    </Link>
  )
}

export { FileIcon }
