import { nanoid } from 'nanoid'

import type { File } from '@/entities/file/types'

export type Status = 'Pending' | 'Fulfilled' | 'Rejected'

export const client: {
  delay: number
  data: File
  get: () => Promise<File[]>
} = {
  delay: 2000,
  data: {
    id: nanoid(),
    filename: 'README.md',
    date: Date.now().valueOf(),
    content: 'How to start?',
  },
  get: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([this.data])
      }, this.delay)
    })
  },
}
