import { FileIcon } from '@/entities/file/ui'

import type { File } from '@/entities/file/types'

type FileFolderProps = { files: File[] }

export const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  return (
    <ul className="flex h-full w-full flex-col justify-start px-4 py-8 md:grid md:grid-flow-col md:gap-2 md:p-8">
      {files.map((file) => (
        <li key={file.id}>
          <FileIcon filename={file.filename} id={file.id} />
        </li>
      ))}
    </ul>
  )
}
