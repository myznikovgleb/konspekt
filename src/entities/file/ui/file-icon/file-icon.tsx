import { BookOpenIcon } from '@heroicons/react/24/solid'
import * as Popover from '@radix-ui/react-popover'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLongPress } from 'react-use'

import { Permission } from '@/shared/api'
import { useStoreDispatch } from '@/shared/lib'

import { fileSlice } from '../../model'
import { FileContext } from '../file-context'

import type { File } from '@/shared/api'
import type { MouseEvent, PointerEvent } from 'react'

interface FileIconProps extends Pick<File, 'filename' | 'id' | 'permission'> {}

const FileIcon = (props: FileIconProps) => {
  const { filename, id, permission } = props

  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const refTrigger = useRef<HTMLButtonElement>(null)

  const longPressEvent = useLongPress(
    () => {
      refTrigger.current?.blur()

      setIsOpen(true)
    },
    {
      isPreventDefault: false,
      delay: 500,
    }
  )

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault()

    setIsOpen(true)
  }

  const onClick = (event: MouseEvent) => {
    const pointerEvent = event as PointerEvent
    const pointerType = pointerEvent.nativeEvent.pointerType

    if (pointerType === 'mouse' || pointerType === undefined) {
      event.preventDefault()
    }

    if (pointerType === undefined) {
      refTrigger.current?.focus()
    }
  }

  const onOpen = () => {
    const path = `/viewer/${id}`

    navigate(path)
  }

  const onRemove = () => {
    dispatch(fileSlice.actions.removeOne({ id }))
  }

  const isWriteForbidden = permission !== Permission.Write

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          ref={refTrigger}
          onTouchStart={(event) => {
            longPressEvent.onTouchStart(event)
          }}
          onTouchEnd={() => {
            longPressEvent.onTouchEnd()
          }}
          onClick={onClick}
          onDoubleClick={onOpen}
          onContextMenu={onContextMenu}
          className="flex w-full cursor-pointer select-none flex-row items-center gap-8 rounded-xl px-4 py-2 md:w-32 md:flex-col md:gap-2 md:px-2 md:py-4 md:hover:bg-base-200/50"
        >
          <div className="rounded-xl bg-base-200 p-4">
            <BookOpenIcon className="size-8" />
          </div>
          <div className="w-full truncate text-center text-lg font-semibold">
            {filename}
          </div>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <FileContext
            onOpen={onOpen}
            onRemove={isWriteForbidden ? undefined : onRemove}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { FileIcon }
