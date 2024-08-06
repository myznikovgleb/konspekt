import { animated, config, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { clamp } from 'lodash'
import { useMemo } from 'react'

import { useStoreDispatch } from '@/shared/lib'

import { fileSlice, SIZE_ICON, ROW_NUMBER, COL_NUMBER } from '../../model'
import { FileIcon } from '../file-icon'

import type { File, Position } from '@/shared/api'

interface FileFolderProps {
  files: File[]
}

const configurationFn = (
  order: Array<Position>,
  active = false,
  indexDragged = 0,
  x = 0,
  y = 0
) => {
  return (index: number) => {
    const isActiveDragged = active && index === indexDragged

    const { row, col } = order[index]

    return isActiveDragged
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

const FileFolder = (props: FileFolderProps) => {
  const { files } = props

  const dispatch = useStoreDispatch()

  const positions = useMemo(
    () => files.map(({ position }) => position),
    [files]
  )

  const [springs, api] = useSprings(files.length, configurationFn(positions), [
    files,
  ])

  const bind = useDrag(
    ({ args, active, movement: [x, y], tap }) => {
      if (tap) {
        return
      }

      const [index] = args as [number]

      if (!active) {
        const {
          id,
          position: { row, col },
        } = files[index]

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

        const isUpdateRequired = !positions.some(
          (position) =>
            position.row === positionNext.row &&
            position.col === positionNext.col
        )

        if (isUpdateRequired) {
          const positionsNext = positions.slice()
          positionsNext[index] = positionNext

          api.start(configurationFn(positionsNext, false, index, x, y))

          dispatch(fileSlice.actions.updateOne({ id, position: positionNext }))

          return
        }
      }

      api.start(configurationFn(positions, active, index, x, y))
    },
    { filterTaps: true }
  )

  const onAfterRemove = (indexRemoved: number) => {
    for (let i = indexRemoved; i < api.current.length - 1; i++) {
      api.current[i].set(api.current[i + 1].get())
    }
  }

  return (
    <ul className="relative size-full p-5">
      {files.map((file, index) => (
        <animated.li
          key={file.id}
          {...bind(index)}
          className="absolute touch-none"
          style={springs[index]}
        >
          <FileIcon
            filename={file.filename}
            id={file.id}
            permission={file.permission}
            index={index}
            onAfterRemove={onAfterRemove}
          />
        </animated.li>
      ))}
    </ul>
  )
}

export { FileFolder }
