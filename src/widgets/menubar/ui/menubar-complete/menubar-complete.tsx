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

import { MenubarCompleteDropdown } from './menubar-complete-dropdown'

interface MenubarCompleteProps {
  onAddOne: () => void
}

const MenubarComplete = (props: MenubarCompleteProps) => {
  const { onAddOne } = props

  const path = '/'

  return (
    <div
      className="navbar bg-base-200/50 shadow-base-200 w-screen shadow-lg"
      style={{ height: px(MENUBAR_COMPLETE_HEIGHT) }}
    >
      <div className="navbar-start gap-8">
        <Link to={path} className="btn btn-ghost btn-lg">
          <Squares2X2Icon className="size-6" />
        </Link>
        <div className="flex items-center justify-start gap-2">
          <MenubarCompleteDropdown heading="File">
            <li>
              <button
                onClick={onAddOne}
                className="flex items-center justify-start gap-4 text-base"
              >
                <DocumentIcon className="size-6" />
                <p>New file</p>
              </button>
            </li>
          </MenubarCompleteDropdown>
          <MenubarCompleteDropdown heading="View">
            <li>
              <CommandPalette rootedBy="complete">
                <button className="flex items-center justify-start gap-4 text-base">
                  <CommandLineIcon className="size-6" />
                  <p>Command Palette</p>
                </button>
              </CommandPalette>
            </li>
          </MenubarCompleteDropdown>
          <MenubarCompleteDropdown heading="Help">
            <li>
              <About>
                <button className="flex items-center justify-start gap-4 text-base">
                  <Square3Stack3DIcon className="size-6" />
                  <p>About</p>
                </button>
              </About>
            </li>
          </MenubarCompleteDropdown>
        </div>
      </div>
    </div>
  )
}

export { MenubarComplete }
