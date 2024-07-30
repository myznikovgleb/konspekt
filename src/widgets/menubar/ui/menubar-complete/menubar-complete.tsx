import {
  DocumentIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

interface MenubarCompleteProps {
  onAddOne: () => void
}

const MenubarComplete = (props: MenubarCompleteProps) => {
  const { onAddOne } = props

  return (
    <div className="navbar w-screen bg-base-200/50 shadow-lg shadow-base-200">
      <div className="navbar-start gap-8">
        <Link to={'/'} className="btn btn-ghost btn-lg">
          <Squares2X2Icon className="size-6" />
        </Link>
        <div className="flex items-center justify-start gap-2">
          <div className="dropdown">
            <button className="btn btn-ghost btn-lg">File</button>
            <ul className="menu dropdown-content z-10 mt-2 w-64 rounded-box bg-base-100 shadow-lg shadow-base-200">
              <li>
                <button
                  onClick={onAddOne}
                  className="flex items-center justify-start gap-4 text-base"
                >
                  <DocumentIcon className="size-6" />
                  <p>New file</p>
                </button>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button className="btn btn-ghost btn-lg">Help</button>
            <ul className="menu dropdown-content z-10 mt-2 w-64 rounded-box bg-base-100 shadow-lg shadow-base-200">
              <li>
                <button
                  onClick={() => {}}
                  className="flex items-center justify-start gap-4 text-base"
                >
                  <Square3Stack3DIcon className="size-6" />
                  <p>About</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MenubarComplete }
