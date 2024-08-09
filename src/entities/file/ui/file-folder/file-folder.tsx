import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Permission } from '@/shared/api'
import { useStoreDispatch } from '@/shared/lib'

import { fileSlice } from '../../model'
import { FileIcon } from '../file-icon'

import type { File } from '@/shared/api'

interface FileFolderProps {
  files: File[]
}

const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const occupiedPositions = useMemo(
    () => files.map(({ position }) => position),
    [files]
  )

  const onOpen = (id: File['id']) => {
    const path = `/viewer/${id}`

    navigate(path)
  }

  const onRemove = (id: File['id']) => {
    dispatch(fileSlice.actions.removeOne({ id }))
  }

  return (
    <ul className="relative size-full p-5">
      {files.map(({ id, filename, permission, position }) => (
        <FileIcon
          key={id}
          filename={filename}
          id={id}
          position={position}
          occupiedPositions={occupiedPositions}
          onOpen={() => onOpen(id)}
          onRemove={
            permission === Permission.Write ? () => onRemove(id) : undefined
          }
        />
      ))}
    </ul>
  )
}

export { FileFolder }
