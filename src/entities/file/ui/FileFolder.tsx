import { FileIcon } from '@/entities/file/ui'

import type { File } from '../model/filesSlice'

type FileFolderProps = { files: File[] }

export const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          <FileIcon filename={file.filename} id={file.id} />
        </li>
      ))}
    </ul>
  )
}
