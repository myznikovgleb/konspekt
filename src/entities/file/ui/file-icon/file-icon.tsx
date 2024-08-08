import { BookOpenIcon } from '@heroicons/react/24/solid'
import * as Popover from '@radix-ui/react-popover'
import { animated, config, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { clamp } from 'lodash'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { match } from 'ts-pattern'

import { Permission } from '@/shared/api'
import { useStoreDispatch } from '@/shared/lib'

import { fileSlice, SIZE_ICON, ROW_NUMBER, COL_NUMBER } from '../../model'
import { FileContext } from '../file-context'

import type { File, Position } from '@/shared/api'
import type { MouseEvent, PointerEvent } from 'react'

interface FileIconProps
  extends Pick<File, 'filename' | 'id' | 'permission' | 'position'> {
  occupiedPositions: Array<Position>
}

enum IconState {
  Idle,
  Opened,
  Dragged,
}

const LONG_PRESS_DELAY_MS = 500

const configurationFn = (
  { row, col }: Position,
  active = false,
  x = 0,
  y = 0
) => {
  return () => {
    return active
      ? {
          x: clamp(col * SIZE_ICON + x, 0, (COL_NUMBER - 1) * SIZE_ICON),
          y: clamp(row * SIZE_ICON + y, 0, (ROW_NUMBER - 1) * SIZE_ICON),
          scale: 1.1,
          zIndex: 10,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'x' || key === 'y' ? config.stiff : config.default,
        }
      : {
          x: col * SIZE_ICON,
          y: row * SIZE_ICON,
          scale: 1,
          zIndex: 0,
          immediate: false,
        }
  }
}

const FileIcon = (props: FileIconProps) => {
  const { filename, id, permission, position, occupiedPositions } = props
  const { row, col } = position

  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const [iconState, setIconState] = useState<IconState>(IconState.Idle)

  const refTrigger = useRef<HTMLButtonElement>(null)
  const refTimer = useRef<ReturnType<typeof setTimeout>>()

  const [spring, api] = useSpring(configurationFn(position), [position])

  const bind = useGesture(
    {
      onDrag: ({ active, movement: [x, y], tap }) => {
        if (tap) {
          return
        }

        match(iconState)
          .with(IconState.Dragged, () => {})
          .otherwise(() => {
            clearTimeout(refTimer.current)

            setIconState(IconState.Dragged)
          })

        if (!active) {
          const positionNext: Position = {
            row: clamp(
              Math.round((row * SIZE_ICON + y) / SIZE_ICON),
              0,
              ROW_NUMBER - 1
            ),
            col: clamp(
              Math.round((col * SIZE_ICON + x) / SIZE_ICON),
              0,
              COL_NUMBER - 1
            ),
          }

          const isUpdateRequired = !occupiedPositions.some(
            (occupiedPosition) =>
              occupiedPosition.row === positionNext.row &&
              occupiedPosition.col === positionNext.col
          )

          if (isUpdateRequired) {
            api.start(configurationFn(positionNext, false, x, y))

            dispatch(
              fileSlice.actions.updateOne({ id, position: positionNext })
            )

            return
          }
        }

        api.start(configurationFn(position, active, x, y))
      },
      onPointerDown: () => {
        refTrigger.current?.focus()

        refTimer.current = setTimeout(() => {
          setIconState(IconState.Opened)
        }, LONG_PRESS_DELAY_MS)
      },
      onPointerUp: () => {
        clearTimeout(refTimer.current)

        match(iconState)
          .with(IconState.Dragged, () => {
            setIconState(IconState.Idle)
          })
          .otherwise(() => {})
      },
    },
    { drag: { filterTaps: true } }
  )

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault()

    setIconState(IconState.Opened)
  }

  const onClick = (event: MouseEvent) => {
    const pointerEvent = event as PointerEvent
    const pointerType = pointerEvent.nativeEvent.pointerType

    if (
      pointerType === 'mouse' ||
      pointerType === 'touch' ||
      pointerType === undefined
    ) {
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

  const onOpenChange = (open: boolean) => {
    setIconState(open ? IconState.Opened : IconState.Idle)
  }

  const open = iconState === IconState.Opened
  const isWriteForbidden = permission !== Permission.Write

  return (
    <animated.li {...bind()} className="absolute touch-none" style={spring}>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Popover.Trigger asChild>
          <button
            ref={refTrigger}
            onClick={onClick}
            onDoubleClick={onOpen}
            onContextMenu={onContextMenu}
            className="flex size-28 cursor-pointer select-none flex-col items-center gap-2 rounded-xl p-2 md:hover:bg-base-200"
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
    </animated.li>
  )
}

export { FileIcon }
