import {
  CommandLineIcon,
  DocumentIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'
import { nanoid } from 'nanoid'
import { Link, useNavigate } from 'react-router'

import { fileSlice } from '@/entities/file'
import { useStoreDispatch } from '@/shared/lib'

import { About } from '../../../about'
import { CommandPalette } from '../../../command-palette'

const MenubarTop = () => {
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
    <div className="bg-base-100/50 hidden min-h-16 w-full justify-between backdrop-blur-md md:flex">
      <ul className="flex items-center gap-4 px-4">
        <li>
          <Link
            to={path}
            className="btn btn-sm btn-ghost btn-neutral flex h-full w-32 flex-col p-2"
          >
            <Squares2X2Icon className="size-6" />
            <p>Force Quit</p>
          </Link>
        </li>
        <li>
          <button
            onClick={onAddOne}
            className="btn btn-sm btn-ghost btn-neutral flex h-full w-32 flex-col p-2"
          >
            <DocumentIcon className="size-6" />
            <p>New File</p>
          </button>
        </li>
        <li>
          <CommandPalette>
            <button className="btn btn-sm btn-ghost btn-neutral flex h-full w-32 flex-col p-2">
              <CommandLineIcon className="size-6" />
              <p>Command Palette</p>
            </button>
          </CommandPalette>
        </li>
        <li>
          <About>
            <button className="btn btn-sm btn-ghost btn-neutral flex h-full w-32 flex-col p-2">
              <Square3Stack3DIcon className="size-6" />
              <p>About This App</p>
            </button>
          </About>
        </li>
      </ul>
    </div>
  )
}

export { MenubarTop }
