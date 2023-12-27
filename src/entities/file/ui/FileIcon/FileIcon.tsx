import { BookOpenIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'

import type { File } from '@/entities/file/model/filesSlice'

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
      className='p-4 flex flex-col items-center justify-center gap-4 hover:bg-base-200 rounded-xl cursor-pointer'
    >
      <div className='w-16 h-16 flex flex-col items-center justify-center bg-base-300 text-base rounded-xl'>
        <BookOpenIcon className='w-8 h-8 text-base' />
      </div>
      <div className='text-lg font-semibold'>{filename}</div>
    </div>
  )
}
