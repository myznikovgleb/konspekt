import { nanoid } from 'nanoid'

enum Permission {
  Read,
  Write,
}

type File = {
  id: string
  filename: string
  date: number
  content: string
  permission: Permission
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
    permission: Permission.Read,
  },
  {
    id: nanoid(),
    filename: 'konspekt.md',
    date: Date.now().valueOf(),
    content: contentKonspekt,
    permission: Permission.Write,
  },
]

export type { File }

export { payload, Permission }
