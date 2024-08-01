import { FileIcon } from '../file-icon'

import type { File } from '@/shared/api'

type FileFolderProps = { files: File[] }

const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  return (
    <ul className="flex size-full flex-col justify-start px-4 py-8 md:grid md:auto-rows-[33.33%] md:grid-cols-6 md:gap-2 md:overflow-auto md:p-8">
      {files.map((file) => (
        <li key={file.id}>
          <FileIcon
            filename={file.filename}
            id={file.id}
            permission={file.permission}
          />
        </li>
      ))}
    </ul>
  )
}

export { FileFolder }
