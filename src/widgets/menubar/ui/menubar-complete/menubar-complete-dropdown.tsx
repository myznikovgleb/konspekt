import type { ReactNode } from 'react'

interface MenubarCompleteDropdownProps {
  children: ReactNode
  heading: string
}

const MenubarCompleteDropdown = (props: MenubarCompleteDropdownProps) => {
  const { children, heading } = props

  return (
    <div className="dropdown">
      <button className="btn btn-ghost btn-lg">{heading}</button>
      <ul className="menu dropdown-content z-10 mt-2 w-64 rounded-box bg-base-100 shadow-lg shadow-base-200">
        {children}
      </ul>
    </div>
  )
}

export { MenubarCompleteDropdown }
