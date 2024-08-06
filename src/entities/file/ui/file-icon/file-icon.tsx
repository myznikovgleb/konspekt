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

interface FileIconProps extends Pick<File, 'filename' | 'id' | 'permission'> {
  index: number
  onAfterRemove: (indexRemoved: number) => void
}

const FileIcon = (props: FileIconProps) => {
  const { filename, id, permission, index, onAfterRemove } = props

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

    onAfterRemove(index)
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
          className="flex size-28 cursor-pointer select-none flex-col items-center gap-2 rounded-xl p-2 hover:bg-base-200"
        >
          <div className="rounded-xl bg-base-300 p-4">
            <BookOpenIcon className="size-8" />
          </div>
          <div className="w-full truncate text-center text-base font-semibold">
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
