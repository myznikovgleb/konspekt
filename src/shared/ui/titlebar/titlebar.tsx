import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import type { MouseEvent, ReactNode } from 'react'

interface TitlebarProps {
  children: ReactNode
  title?: string
  onChangeTitle?: (nextTitle: string) => void
}

const Titlebar = (props: TitlebarProps) => {
  const { children, title, onChangeTitle } = props

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const onEditRequest = (event: MouseEvent) => {
    event.preventDefault()

    setIsEdit(true)
  }

  const onEditRelease = (event: MouseEvent) => {
    event.preventDefault()

    setIsEdit(false)
  }

  const isStaticTitle = title !== undefined && !isEdit
  const isDynamicTitle = title !== undefined && isEdit

  return (
    <div className="bg-base-200 flex h-12 w-full items-center px-4">
      <div className="w-1/4" />
      <div className="w-1/2">
        {isStaticTitle && (
          <div className="input input-bordered flex h-8 w-full items-center gap-2 focus-within:outline-0">
            <button
              onClick={onEditRequest}
              disabled={onChangeTitle === undefined}
              className="btn btn-square btn-outline btn-xs border-transparent"
            >
              <LockClosedIcon className="size-4" />
            </button>
            <p className="bg-base-100 min-w-0 grow truncate text-center text-sm md:text-base">
              {title}
            </p>
          </div>
        )}
        {isDynamicTitle && (
          <label className="input input-bordered flex h-8 w-full items-center gap-2 focus-within:outline-0">
            <button
              onClick={onEditRelease}
              className="btn btn-square btn-outline btn-xs border-transparent"
            >
              <LockOpenIcon className="text-primary size-4" />
            </button>
            <input
              type="text"
              className="bg-base-100 min-w-0 grow text-center text-sm md:text-base"
              value={title}
              onChange={(e) => onChangeTitle!(e.target.value)}
            />
          </label>
        )}
      </div>
      <div className="w-1/4">
        <div className="flex w-full flex-row-reverse">
          <div className="*:bg-error flex size-8 items-center justify-center *:size-4 *:rounded-full *:duration-150 *:ease-in hover:*:size-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Titlebar }
