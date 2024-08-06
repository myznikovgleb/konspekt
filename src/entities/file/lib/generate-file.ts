import { nanoid } from 'nanoid'

import { Permission } from '@/shared/api'

import { COL_NUMBER, ROW_NUMBER } from '../model'

import type { File, Position } from '@/shared/api'

const generateFile = (
  payload: Partial<Pick<File, 'id' | 'filename'>>,
  occupiedFilenames: Array<File['filename']>,
  occupiedPositions: Array<Position>
): File => {
  const { id = nanoid(), filename = 'konspekt.md' } = payload

  const file: File = {
    id,
    filename: generateFilename(filename, occupiedFilenames),
    content: '',
    date: Date.now().valueOf(),
    permission: Permission.Write,
    position: generatePosition(occupiedPositions),
  }

  return file
}

const generatePosition = (occupiedPositions: Array<Position>): Position => {
  for (let row = 0; row < ROW_NUMBER; row++) {
    for (let col = 0; col < COL_NUMBER; col++) {
      if (
        !occupiedPositions.some(
          (occupiedPosition) =>
            occupiedPosition.row === row && occupiedPosition.col === col
        )
      ) {
        return { row, col }
      }
    }
  }

  return { row: ROW_NUMBER, col: COL_NUMBER }
}

const generateFilename = (
  defaultFilename: File['filename'],
  occupiedFilenames: Array<File['filename']>
): File['filename'] => {
  let filename = defaultFilename

  const [name, extension] = filename.split('.')

  for (
    let i = 1;
    occupiedFilenames.some((occupiedFilename) => occupiedFilename === filename);
    i++
  ) {
    filename = `${name}-${i}.${extension}`
  }

  return filename
}

export { generateFile }
