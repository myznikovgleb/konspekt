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
          <Link to={path} className="btn btn-ghost btn-neutral">
            Force Quit
          </Link>
        </li>
        <li>
          <button onClick={onAddOne} className="btn btn-ghost btn-neutral">
            <p>New File</p>
          </button>
        </li>
        <li>
          <CommandPalette rootedBy="complete">
            <button className="btn btn-ghost btn-neutral">
              <p>Command Palette</p>
            </button>
          </CommandPalette>
        </li>
        <li>
          <About>
            <button className="btn btn-ghost btn-neutral">
              <p>About This App</p>
            </button>
          </About>
        </li>
      </ul>
    </div>
  )
}

export { MenubarComplete }
