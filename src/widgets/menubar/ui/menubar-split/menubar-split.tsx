import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { MENUBAR_SPLIT_HEIGHT, px } from '@/shared/config'

import { CommandPalette } from '../../../command-palette'

interface MenubarSplitProps {
  onAddOne: () => void
}

const MenubarSplit = (props: MenubarSplitProps) => {
  const { onAddOne } = props

  return (
    <>
      <div className="border-base-200/20 bg-base-200/10 relative top-0 left-0 z-10 w-screen border-b backdrop-blur-sm">
        <div
          className="flex w-full items-center justify-end px-4"
          style={{ height: px(MENUBAR_SPLIT_HEIGHT) }}
        >
          <CommandPalette rootedBy="split">
            <button className="text-primary rounded-xl p-2">
              <MagnifyingGlassIcon className="size-8" />
            </button>
          </CommandPalette>
        </div>
      </div>
      <div className="border-base-200/20 bg-base-200/10 fixed bottom-0 left-0 z-10 w-screen border-t backdrop-blur-sm">
        <div
          className="flex w-full items-center justify-between px-4"
          style={{ height: px(MENUBAR_SPLIT_HEIGHT) }}
        >
          <Link to="/" className="text-primary rounded-xl p-2">
            <ChevronLeftIcon className="size-8" />
          </Link>
          <button onClick={onAddOne} className="text-primary rounded-xl p-2">
            <PencilSquareIcon className="size-8" />
          </button>
        </div>
      </div>
    </>
  )
}

export { MenubarSplit }
