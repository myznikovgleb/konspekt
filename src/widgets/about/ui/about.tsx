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
        <Dialog.Content className="modal-box fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-0">
          <Titlebar>
            <Dialog.Close />
          </Titlebar>
          <div className="card-body flex flex-col items-center gap-6">
            <Dialog.Title className="text-xl font-semibold">
              Konspekt App
            </Dialog.Title>
            <span className="text-5xl">📝</span>
            <Dialog.Description asChild>
              <div className="flex flex-col items-center text-lg">
                <p className="font-bold">Like it?</p>
                <p>
                  Please welcome to the{' '}
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
