import { ReactNode } from 'react'

type LayoutProps = { children: ReactNode }

export const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      {children}
    </main>
  )
}
