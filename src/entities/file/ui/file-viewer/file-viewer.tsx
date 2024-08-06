import { useStoreDispatch, useStoreSelector } from '@/shared/lib'

import { fileSlice } from '../../model'

import { FileViewerCanvas } from './file-viewer-canvas'
import { FileViewerHead } from './file-viewer-head'

import type { File } from '@/shared/api'

type FileViewerProps = Pick<File, 'id'>

const FileViewer = (props: FileViewerProps) => {
  const { id } = props

  const dispatch = useStoreDispatch()

  const file = useStoreSelector((state) =>
    fileSlice.selectors.selectById(state, id)
  )
  const { content, filename } = file

  const onChange = (args: Pick<File, 'content'>) => {
    const { content: nextContent } = args

    dispatch(
      fileSlice.actions.updateOne({
        id,
        content: nextContent,
        date: Date.now().valueOf(),
      })
    )
  }

  return (
    <form className="justify-top flex h-2/5 w-4/5 flex-col items-center rounded-lg md:h-4/5">
      <FileViewerHead filename={filename} />
      <FileViewerCanvas content={content} onChange={onChange} />
    </form>
  )
}

export { FileViewer }
