import {
  CommandLineIcon,
  DocumentIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'
import { nanoid } from 'nanoid'
import { Link, useNavigate } from 'react-router'

import { fileSlice } from '@/entities/file'
import { useStoreDispatch } from '@/shared/lib'

import { CommandPalette } from '../../../command-palette'

const MenubarBottom = () => {
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

  const path = '/'

  return (
    <div className="bg-base-100/50 flex min-h-16 w-full items-center justify-between px-4 backdrop-blur-md md:hidden">
      <Link to={path} className="btn btn-ghost btn-neutral">
        <Squares2X2Icon className="size-8" />
      </Link>
      <button onClick={onAddOne} className="btn btn-ghost btn-neutral">
        <DocumentIcon className="size-8" />
      </button>
      <CommandPalette>
        <button className="btn btn-ghost btn-neutral">
          <CommandLineIcon className="size-8" />
        </button>
      </CommandPalette>
    </div>
  )
}

export { MenubarBottom }
