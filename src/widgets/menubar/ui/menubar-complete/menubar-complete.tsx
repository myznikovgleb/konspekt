import {
  CommandLineIcon,
  DocumentIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router'

import { MENUBAR_COMPLETE_HEIGHT, px } from '@/shared/config'

import { About } from '../../../about'
import { CommandPalette } from '../../../command-palette'

interface MenubarCompleteProps {
  onAddOne: () => void
}

const MenubarComplete = (props: MenubarCompleteProps) => {
  const { onAddOne } = props

  const path = '/'

  return (
    <div
      className="bg-base-100/50 flex w-full justify-between backdrop-blur-md"
      style={{ height: px(MENUBAR_COMPLETE_HEIGHT) }}
    >
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
          <CommandPalette rootedBy="complete">
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

export { MenubarComplete }
