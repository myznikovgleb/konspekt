import { nanoid } from 'nanoid'

type File = {
  id: string
  filename: string
  date: number
  content: string
}

const contentReadme = `How to start?

1. Go back to root folder.
2. Open konspekt.md file.
3. Fill your first konspekt.`

const contentKonspekt = `Type something below.`

const payload: File[] = [
  {
    id: nanoid(),
    filename: 'readme.md',
    date: Date.now().valueOf(),
    content: contentReadme,
  },
  {
    id: nanoid(),
    filename: 'konspekt.md',
    date: Date.now().valueOf(),
    content: contentKonspekt,
  },
]

export type { File }

export { payload }
