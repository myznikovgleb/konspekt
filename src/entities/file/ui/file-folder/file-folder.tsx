import { FileIcon } from '../file-icon'

import type { File } from '@/shared/api'

type FileFolderProps = { files: File[] }

const FileFolder = (props: FileFolderProps) => {
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

export { FileFolder }
