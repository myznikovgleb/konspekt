import type { ReactNode } from 'react'

interface TitlebarProps {
  children: ReactNode
}

const Titlebar = (props: TitlebarProps) => {
  const { children } = props

  return (
    <div className="flex h-8 w-full flex-row-reverse items-center bg-base-200 px-4">
      <div className="flex flex-row">
        <div className="flex size-8 items-center justify-center *:size-4 *:rounded-full *:bg-error *:duration-150 *:ease-in *:hover:size-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Titlebar }
