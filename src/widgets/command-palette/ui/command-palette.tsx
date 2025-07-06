import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import { match } from 'ts-pattern'

import { fileSlice } from '@/entities/file'
import {
  MENUBAR_COMPLETE_HEIGHT,
  MENUBAR_SPLIT_HEIGHT,
  px,
} from '@/shared/config'
import { useStoreSelector } from '@/shared/lib'

import { CommandPaletteList } from './command-palette-list'

import type { ReactNode } from 'react'

interface CommandPaletteProps {
  children: ReactNode
  rootedBy: 'complete' | 'split'
}

const CommandPalette = (props: CommandPaletteProps) => {
  const { children, rootedBy } = props

  const [command, setCommand] = useState<string>('')

  const filesWithIndices = useStoreSelector((state) =>
    fileSlice.selectors.selectAllByFilename(state, command)
  )

  const top = match(rootedBy)
    .with('complete', () => MENUBAR_COMPLETE_HEIGHT)
    .with('split', () => MENUBAR_SPLIT_HEIGHT)
    .exhaustive()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <VisuallyHidden.Root>
          <Dialog.Title>Command Palette</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 -translate-x-1/2"
          style={{ top: px(top) }}
        >
          <div className="flex flex-col items-center gap-6">
            <input
              type="text"
              className="input input-bordered bg-base-200 h-8 w-full min-w-0 text-sm md:text-base"
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
