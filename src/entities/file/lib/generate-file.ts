import { nanoid } from 'nanoid'

import { Permission } from '@/shared/api'

import type { File, Position } from '@/shared/api'

const generateFile = (
  payload: Partial<Pick<File, 'id' | 'filename'>>,
  occupiedFilenames: Array<File['filename']>,
  occupiedPositions: Array<Position>,
  positionLimit: Position
): File => {
  const { id = nanoid(), filename = 'konspekt.md' } = payload

  const file: File = {
    id,
    filename: generateFilename(filename, occupiedFilenames),
    content: '',
    date: Date.now().valueOf(),
    permission: Permission.Write,
    position: generatePosition(occupiedPositions, positionLimit),
  }

  return file
}

const generatePosition = (
  occupiedPositions: Array<Position>,
  positionLimit: Position
): Position => {
  const { col: colLimit, row: rowLimit } = positionLimit

  for (let row = 0; row < rowLimit; row++) {
    for (let col = 0; col < colLimit; col++) {
      if (
        !occupiedPositions.some(
          (occupiedPosition) =>
            occupiedPosition.col === col && occupiedPosition.row === row
        )
      ) {
        return { col, row }
      }
    }
  }

  return { col: colLimit, row: rowLimit }
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
