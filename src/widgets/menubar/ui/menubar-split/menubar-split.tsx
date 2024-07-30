import { ChevronLeftIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

interface MenubarSplitProps {
  onAddOne: () => void
}

const MenubarSplit = (props: MenubarSplitProps) => {
  const { onAddOne } = props

  const path = '/'

  return (
    <div className="fixed bottom-0 left-0 z-10 w-screen border-t border-base-200/20 bg-base-200/10 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <Link to={path} className="rounded-xl p-2 text-primary">
          <ChevronLeftIcon className="size-8" />
        </Link>
        <button onClick={onAddOne} className="rounded-xl p-2 text-primary">
          <PencilSquareIcon className="size-8" />
        </button>
      </div>
    </div>
  )
}

export { MenubarSplit }
