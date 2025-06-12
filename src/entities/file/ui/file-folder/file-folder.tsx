import { useLayoutEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

import { Permission } from '@/shared/api'
import { FILE_FOLDER_PADDING, px } from '@/shared/config'
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

  useLayoutEffect(() => {
    const handleResize = () => {
      dispatch(
        fileSlice.actions.setPositionLimit({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      )
    }

    if (window) {
      handleResize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

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

  const onRename = (id: File['id']) => {
    const path = `/viewer/${id}`

    navigate(path)
  }

  return (
    <ul
      className="relative size-full"
      style={{ padding: px(FILE_FOLDER_PADDING) }}
    >
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
          onRename={
            permission === Permission.Write ? () => onRename(id) : undefined
          }
        />
      ))}
    </ul>
  )
}

export { FileFolder }
