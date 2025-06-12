import { Link } from 'react-router'

import { Permission } from '@/shared/api'
import { useStoreDispatch, useStoreSelector } from '@/shared/lib'
import { Titlebar } from '@/shared/ui'

import { fileSlice } from '../../model'

import { FileViewerCanvas } from './file-viewer-canvas'

import type { File } from '@/shared/api'

type FileViewerProps = Pick<File, 'id'>

const FileViewer = (props: FileViewerProps) => {
  const { id } = props

  const dispatch = useStoreDispatch()

  const file = useStoreSelector((state) =>
    fileSlice.selectors.selectById(state, id)
  )
  const { content, filename, permission } = file

  const onChangeContent = (nextContent: File['content']) => {
    dispatch(
      fileSlice.actions.updateOne({
        id,
        content: nextContent,
        date: Date.now().valueOf(),
      })
    )
  }

  const onChangeFilename = (nextFilename: File['filename']) => {
    dispatch(
      fileSlice.actions.updateOne({
        id,
        filename: nextFilename,
        date: Date.now().valueOf(),
      })
    )
  }

  const path = `/folder`

  return (
    <form className="flex w-4/5 max-w-none scale-100 flex-col items-center p-0">
      <Titlebar
        title={filename}
        onChangeTitle={
          permission === Permission.Write ? onChangeFilename : undefined
        }
      >
        <Link to={path} />
      </Titlebar>
      <FileViewerCanvas content={content} onChangeContent={onChangeContent} />
    </form>
  )
}

export { FileViewer }
