import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { useStoreDispatch, useStoreSelector } from '@/app/hooks'
import { selectFileById, updateFile } from '@/entities/file/model'

import type { File } from '@/entities/file/types'

type FileViewerProps = {
  id: string
}

export const FileViewer = (props: FileViewerProps) => {
  const { id } = props

  const file = useStoreSelector((state) => selectFileById(state, id))
  const { content = '', filename = '' } = file ?? {}

  const dispatch = useStoreDispatch()

  const onChange = (args: Pick<File, 'content' | 'filename'>) => {
    const { content, filename } = args
    dispatch(
      updateFile({
        id: id,
        content: content,
        filename: filename,
        date: Date.now().valueOf(),
      })
    )
  }

  const path = `/folder`

  return (
    <form className="justify-top flex h-2/5 w-4/5 flex-col items-center rounded-lg md:h-4/5">
      {/* Head */}
      <div className="flex h-16 w-full flex-row-reverse items-center justify-between rounded-t-lg bg-primary px-2 md:flex-row md:px-8">
        <h2 className="px-4 font-semibold text-primary-content md:text-lg">
          {filename}
        </h2>
        <Link to={path} className="rounded-full focus:ring-primary-content">
          <span className="m-1 hidden h-4 w-4 rounded-full bg-primary-content md:block" />
          <ChevronLeftIcon className="block h-8 w-8 text-primary-content md:hidden" />
        </Link>
      </div>

      {/* Hero */}
      <textarea
        value={content}
        onChange={(e) => onChange({ content: e.target.value, filename })}
        className="h-full w-full resize-none overflow-hidden rounded-b-lg bg-base-100 p-8 md:text-lg"
      />
    </form>
  )
}
