import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

import { fileSlice } from '@/entities/file'
import { useStoreDispatch } from '@/shared/utils'

import { MenubarComplete } from '../menubar-complete'
import { MenubarSplit } from '../menubar-split'

const Menubar = () => {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const onAddOne = () => {
    const id = nanoid()

    dispatch(
      fileSlice.actions.addOne({
        id,
        filename: 'konspekt.md',
      })
    )

    const path = `/viewer/${id}`
    navigate(path)
  }

  return (
    <>
      <div className="hidden md:block">
        <MenubarComplete onAddOne={onAddOne} />
      </div>
      <div className="block md:hidden">
        <MenubarSplit onAddOne={onAddOne} />
      </div>
    </>
  )
}

export { Menubar }
