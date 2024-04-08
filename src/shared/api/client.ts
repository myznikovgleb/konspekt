import { data } from './data'

import type { File } from '@/entities/file'

const client: {
  delay: number
  data: File[]
  get: () => Promise<File[]>
} = {
  delay: 2000,
  data: data,
  get: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, this.delay)
    })
  },
}

export { client }
