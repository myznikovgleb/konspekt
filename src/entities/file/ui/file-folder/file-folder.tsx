import { useMemo } from 'react'

import { FileIcon } from '../file-icon'

import type { File } from '@/shared/api'

interface FileFolderProps {
  files: File[]
}

const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  const occupiedPositions = useMemo(
    () => files.map(({ position }) => position),
    [files]
  )

  return (
    <ul className="relative size-full p-5">
      {files.map((file) => (
        <FileIcon
          key={file.id}
          filename={file.filename}
          id={file.id}
          permission={file.permission}
          position={file.position}
          occupiedPositions={occupiedPositions}
        />
      ))}
    </ul>
  )
}

export { FileFolder }
