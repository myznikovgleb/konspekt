import { nanoid } from 'nanoid'

import { Permission } from '@/shared/api'

import type { File } from '@/shared/api'

const generateFile = (
  payload: Partial<Pick<File, 'id' | 'filename'>>
): File => {
  const { id, filename } = payload

  return {
    id: id || nanoid(),
    filename: filename || 'konspekt.md',
    content: '',
    date: Date.now().valueOf(),
    permission: Permission.Write,
  }
}

export { generateFile }
