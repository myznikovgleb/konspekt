import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router'

import { MENUBAR_SPLIT_HEIGHT, px } from '@/shared/config'

import { CommandPalette } from '../../../command-palette'

interface MenubarSplitProps {
  onAddOne: () => void
}

const MenubarSplit = (props: MenubarSplitProps) => {
  const { onAddOne } = props

  return (
    <>
      <div className="bg-base-100/50 relative top-0 left-0 z-10 w-screen backdrop-blur-md">
        <div
          className="flex w-full items-center justify-end px-4"
          style={{ height: px(MENUBAR_SPLIT_HEIGHT) }}
        >
          <CommandPalette rootedBy="split">
            <button className="btn btn-ghost btn-neutral">
              <MagnifyingGlassIcon className="size-8" />
            </button>
          </CommandPalette>
        </div>
      </div>
      <div className="bg-base-100/50 fixed bottom-0 left-0 z-10 w-screen backdrop-blur-md">
        <div
          className="flex w-full items-center justify-between px-4"
          style={{ height: px(MENUBAR_SPLIT_HEIGHT) }}
        >
          <Link to="/" className="btn btn-ghost btn-neutral">
            <ChevronLeftIcon className="size-8" />
          </Link>
          <button onClick={onAddOne} className="btn btn-ghost btn-neutral">
            <DocumentIcon className="size-8" />
          </button>
        </div>
      </div>
    </>
  )
}

export { MenubarSplit }
