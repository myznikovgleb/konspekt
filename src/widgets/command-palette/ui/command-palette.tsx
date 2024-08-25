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
          <Dialog.Title>CommandPalette</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Content
          aria-describedby={undefined}
          className="modal-box fixed left-1/2 top-[5%] -translate-x-1/2 scale-100 p-0"
        >
          <div className="card-body flex flex-col items-center gap-6">
            <input
              type="text"
              className="input input-bordered h-8 w-full min-w-0 bg-base-200 text-sm focus-within:outline-0 focus:outline-none focus:ring-2 focus:ring-primary md:text-base"
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
