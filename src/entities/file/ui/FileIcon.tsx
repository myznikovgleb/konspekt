import { BookOpenIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'

import type { File } from '@/entities/file/types'

type FileIconProps = Pick<File, 'filename' | 'id'>

export const FileIcon = (props: FileIconProps) => {
  const { filename, id } = props

  const navigate = useNavigate()

  const handlerPointerDown = () => {
    navigate(`/file/${id}`)
  }

  return (
    <div
      onPointerDown={handlerPointerDown}
      className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl p-4 hover:bg-base-200"
    >
      <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-base-300 text-base">
        <BookOpenIcon className="h-8 w-8 text-base" />
      </div>
      <div className="text-lg font-semibold">{filename}</div>
    </div>
  )
}
