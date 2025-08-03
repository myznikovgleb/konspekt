import * as Dialog from '@radix-ui/react-dialog'

import { Titlebar } from '@/shared/ui'

import type { ReactNode } from 'react'

interface AboutProps {
  children: ReactNode
}

const About = (props: AboutProps) => {
  const { children } = props

  const href = 'https://github.com/myznikovgleb/konspekt'

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed top-1/2 left-1/2 min-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg shadow-black/20">
          <Titlebar>
            <Dialog.Close />
          </Titlebar>
          <div className="bg-base-100 flex flex-col items-center gap-6 rounded-b-2xl p-4">
            <Dialog.Title className="text-xl font-semibold">
              Konspekt App
            </Dialog.Title>
            <span className="text-5xl">📝</span>
            <Dialog.Description asChild>
              <div className="flex flex-col items-center text-lg">
                <p className="font-bold">Like it?</p>
                <p>Please welcome</p>
                <p>
                  to the{' '}
                  <a href={href} className="underline">
                    source code page
                  </a>
                </p>
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { About }
