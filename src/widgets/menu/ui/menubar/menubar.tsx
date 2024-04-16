import { PlusIcon, Squares2X2Icon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const Menubar = () => {
  const path = '/'

  return (
    <div className="navbar bg-base-200/50 shadow-lg shadow-base-200">
      <div className="navbar-start gap-4">
        <Link to={path} className="btn btn-ghost btn-lg">
          <Squares2X2Icon className="size-6" />
        </Link>
        <div className="dropdown">
          <button className="btn btn-ghost btn-lg">Edit</button>
          <ul className="menu dropdown-content z-10 mt-2 w-64 rounded-box bg-base-100 shadow-lg shadow-base-200">
            <li>
              <button className="text-base">
                <PlusIcon className="size-6" />
                <p>New Konspekt</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { Menubar }
