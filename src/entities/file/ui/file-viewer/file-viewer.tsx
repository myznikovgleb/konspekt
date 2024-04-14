import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { useStoreDispatch, useStoreSelector } from '@/app/hooks'

import { fileSlice } from '../../model'

import type { File } from '@/shared/api'

type FileViewerProps = Pick<File, 'id'>

const FileViewer = (props: FileViewerProps) => {
  const { id } = props

  const dispatch = useStoreDispatch()

  const file = useStoreSelector((state) =>
    fileSlice.selectors.selectById(state, id)
  )
  const { content = '', filename = '' } = file ?? {}

  const onChange = (args: Pick<File, 'content' | 'filename'>) => {
    const { content, filename } = args

    dispatch(
      fileSlice.actions.setOne({
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
        <Link to={path} className="rounded-full focus:ring-base-100">
          <span className="m-1 hidden h-4 w-4 rounded-full bg-base-100 md:block" />
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

export { FileViewer }
