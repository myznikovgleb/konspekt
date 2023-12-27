import { useParams } from 'react-router-dom'

import { useStoreSelector } from '@/app/hooks'
import { selectFileById } from '@/entities/file/model/filesSlice'

export const File = () => {
  const { id = '' } = useParams()

  const file = useStoreSelector((state) => selectFileById(state, id))

  return (
    <>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-xl">{file?.content}</div>
      </main>
    </>
  )
}
