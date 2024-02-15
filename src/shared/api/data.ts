import { nanoid } from 'nanoid'

import type { File } from '@/entities/file/types'

export const data: File[] = [
  {
    id: nanoid(),
    filename: 'readme.md',
    date: Date.now().valueOf(),
    content: `How to start?

1. Go back to root folder.
2. Open konspekt.md file.
3. Fill your first konspekt.`,
  },
  {
    id: nanoid(),
    filename: 'konspekt.md',
    date: Date.now().valueOf(),
    content: `Type something below.`,
  },
]
