import type { ReactNode } from 'react'

interface TitlebarProps {
  children: ReactNode
  title?: string
}

const Titlebar = (props: TitlebarProps) => {
  const { children, title } = props

  return (
    <div className="flex h-12 w-full items-center bg-base-200">
      <div className="w-1/4" />
      {title !== undefined && (
        <div className="input input-bordered h-8 w-1/2 p-1 text-center text-sm md:text-base">
          {title}
        </div>
      )}
      <div className="flex w-1/4 flex-row-reverse px-4">
        <div className="flex size-8 items-center justify-center *:size-4 *:rounded-full *:bg-error *:duration-150 *:ease-in *:hover:size-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Titlebar }
