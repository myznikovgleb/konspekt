import { Link } from 'react-router-dom'

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

  const path = `/folder`

  return (
    <form className="modal-box flex w-4/5 max-w-none scale-100 flex-col items-center p-0">
      <Titlebar title={filename}>
        <Link to={path} />
      </Titlebar>
      <FileViewerCanvas content={content} onChange={onChange} />
    </form>
  )
}

export { FileViewer }
