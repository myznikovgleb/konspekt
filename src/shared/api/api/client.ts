import { payload } from '../model'

import type { File } from '../model'

const client: {
  delay: number
  get: () => Promise<File[]>
} = {
  delay: 1000,
  get: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(payload)
      }, this.delay)
    })
  },
}

export { client }
