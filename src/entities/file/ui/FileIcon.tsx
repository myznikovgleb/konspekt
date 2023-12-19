import { BookOpenIcon } from '@heroicons/react/24/solid'

type FileIconProps = { filename: string }

export const FileIcon = (props: FileIconProps) => {
  const { filename } = props
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='w-16 h-16 flex flex-col items-center justify-center bg-base-300 text-base rounded-xl'>
        <BookOpenIcon className='w-8 h-8 text-base' />
      </div>
      <div className='text-lg font-semibold'>{filename}</div>
    </div>
  )
}
