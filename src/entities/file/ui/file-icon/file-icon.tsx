import { BookOpenIcon } from '@heroicons/react/24/solid'
import * as Popover from '@radix-ui/react-popover'
import { animated, config, useSpring } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { clamp } from 'lodash'
import { useRef, useState } from 'react'
import { match } from 'ts-pattern'

import { FILE_ICON_SIZE } from '@/shared/config'
import { useStoreDispatch, useStoreSelector } from '@/shared/lib'

import { fileSlice } from '../../model'
import { FileContext } from '../file-context'

import type { File, Position } from '@/shared/api'
import type { MouseEvent, PointerEvent } from 'react'

interface FileIconProps extends Pick<File, 'filename' | 'id' | 'position'> {
  occupiedPositions: Array<Position>
  onOpen: () => void
  onRemove?: () => void
  onRename?: () => void
}

enum IconState {
  Idle,
  Opened,
  Dragged,
}

const LONG_PRESS_DELAY_MS = 500

const configurationFn = (
  position: Position,
  positionLimit: Position,
  active = false,
  x = 0,
  y = 0
) => {
  return () => {
    const { col, row } = position
    const { col: colLimit, row: rowLimit } = positionLimit

    return active
      ? {
          x: clamp(
            col * FILE_ICON_SIZE + x,
            0,
            (colLimit - 1) * FILE_ICON_SIZE
          ),
          y: clamp(
            row * FILE_ICON_SIZE + y,
            0,
            (rowLimit - 1) * FILE_ICON_SIZE
          ),
          scale: 1.1,
          zIndex: 10,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'x' || key === 'y' ? config.stiff : config.default,
        }
      : {
          x: col * FILE_ICON_SIZE,
          y: row * FILE_ICON_SIZE,
          scale: 1,
          zIndex: 0,
          immediate: false,
        }
  }
}

const FileIcon = (props: FileIconProps) => {
  const {
    filename,
    id,
    position,
    occupiedPositions,
    onOpen,
    onRemove,
    onRename,
  } = props

  const dispatch = useStoreDispatch()

  const positionLimit = useStoreSelector(
    fileSlice.selectors.selectPositionLimit
  )

  const [iconState, setIconState] = useState<IconState>(IconState.Idle)

  const refTrigger = useRef<HTMLButtonElement>(null)
  const refTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [spring, api] = useSpring(configurationFn(position, positionLimit), [
    position,
    positionLimit,
  ])

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
          const { col, row } = position
          const { col: colLimit, row: rowLimit } = positionLimit

          const positionNext: Position = {
            col: clamp(
              Math.round((col * FILE_ICON_SIZE + x) / FILE_ICON_SIZE),
              0,
              colLimit - 1
            ),
            row: clamp(
              Math.round((row * FILE_ICON_SIZE + y) / FILE_ICON_SIZE),
              0,
              rowLimit - 1
            ),
          }

          const isUpdateRequired = !occupiedPositions.some(
            (occupiedPosition) =>
              occupiedPosition.col === positionNext.col &&
              occupiedPosition.row === positionNext.row
          )

          if (isUpdateRequired) {
            api.start(configurationFn(positionNext, positionLimit, false, x, y))

            dispatch(
              fileSlice.actions.updateOne({ id, position: positionNext })
            )

            return
          }
        }

        api.start(configurationFn(position, positionLimit, active, x, y))
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
    { drag: { filterTaps: true, pointer: { keys: false } } }
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

  const open = iconState === IconState.Opened
  const onOpenChange = (open: boolean) => {
    setIconState(open ? IconState.Opened : IconState.Idle)
  }

  return (
    <animated.li {...bind()} className="absolute touch-none" style={spring}>
      <Popover.Root open={open} onOpenChange={onOpenChange}>
        <Popover.Trigger asChild>
          <button
            ref={refTrigger}
            onClick={onClick}
            onDoubleClick={onOpen}
            onContextMenu={onContextMenu}
            className="hover:bg-base-100/50 flex size-28 cursor-pointer flex-col items-center gap-2 rounded-xl p-2 select-none hover:backdrop-blur-md"
          >
            <div className="bg-base-100 rounded-xl p-4">
              <BookOpenIcon className="size-8" />
            </div>
            <div className="w-full truncate text-center text-base font-semibold">
              {filename}
            </div>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={4}>
            <FileContext
              onOpen={onOpen}
              onRemove={onRemove}
              onRename={onRename}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </animated.li>
  )
}

export { FileIcon }
