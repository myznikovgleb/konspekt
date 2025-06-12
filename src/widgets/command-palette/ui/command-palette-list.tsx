import { BookOpenIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'

import type { File } from '@/shared/api'

interface CommandPaletteList {
  command: string
  filesWithIndices: Array<{ file: File; index: number }>
}

const CommandPaletteList = (props: CommandPaletteList) => {
  const { command, filesWithIndices } = props

  if (!filesWithIndices.length) {
    return <div>No matching results</div>
  }

  return (
    <ul className="flex w-full flex-col justify-start px-2">
      {filesWithIndices.map(({ file: { filename, id }, index }) => {
        const firstIndex = index
        const lastIndex = firstIndex + command.length

        return (
          <Link
            to={`/viewer/${id}`}
            key={id}
            className="hover:bg-base-200 flex items-center gap-2 rounded-md p-1.5"
          >
            <div className="bg-base-300 flex size-6 items-center justify-center rounded-md">
              <BookOpenIcon className="size-3" />
            </div>
            <div>
              <span>{filename.slice(0, firstIndex)}</span>
              <span className="underline">
                {filename.slice(firstIndex, lastIndex)}
              </span>
              <span>{filename.slice(lastIndex)}</span>
            </div>
          </Link>
        )
      })}
    </ul>
  )
}

export { CommandPaletteList }
