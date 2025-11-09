import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useState } from 'react'

import { fileSlice } from '@/entities/file'
import { useStoreSelector } from '@/shared/lib'

import { CommandPaletteList } from './command-palette-list'

import type { ReactNode } from 'react'

interface CommandPaletteProps {
  children: ReactNode
}

const CommandPalette = (props: CommandPaletteProps) => {
  const { children } = props

  const [command, setCommand] = useState<string>('')

  const filesWithIndices = useStoreSelector((state) =>
    fileSlice.selectors.selectAllByFilename(state, command)
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <VisuallyHidden.Root>
          <Dialog.Title>Command Palette</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Content
          aria-describedby={undefined}
          className="bg-base-100 fixed top-1/3 left-1/2 min-w-xs -translate-1/2 rounded-2xl p-4 shadow-lg shadow-black/20"
        >
          <div className="flex flex-col items-center gap-6">
            <input
              type="text"
              className="input input-bordered bg-base-300 h-8 w-full min-w-0 text-sm md:text-base"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Search files by name"
            />
            <CommandPaletteList
              command={command}
              filesWithIndices={filesWithIndices}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { CommandPalette }
