import { ReactNode } from 'react'
import { Label } from './ui/label'
import {
  IconCalendarWeekFilled,
  IconFileInvoice,
  IconHome,
  IconListCheck,
  IconSmartHome
} from '@tabler/icons-react'
import { map } from 'lodash'
import { useNavigate } from 'react-router'

interface IMenu {
  icon: ReactNode
  name: string
  to: string
}

const menus: IMenu[] = [
  {
    icon: <IconSmartHome />,
    name: 'Home',
    to: '/'
  },
  {
    icon: <IconHome />,
    name: 'Table',
    to: '/table'
  },
  {
    icon: <IconListCheck />,
    name: 'Order List',
    to: '/orders'
  },
  {
    icon: <IconFileInvoice />,
    name: 'Invoice',
    to: '/invoices'
  }
]

export default function Header() {
  const navigate = useNavigate()

  return (
    <>
      <header className="flex w-full h-16 flex-row shadow-md bg-white justify-between items-center top-0 fixed px-4">
        <Label className="text-2xl text-primary-500 font-mono">Logo</Label>

        <div className="flex flex-row items-center space-x-2.5">
          {map(menus, (menu: IMenu) => (
            <div
              onClick={() => navigate(menu.to)}
              key={menu.name}
              className="flex flex-row space-x-2 items-center cursor-pointer"
            >
              {menu.icon}

              <Label>{menu.name}</Label>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2">
          <IconCalendarWeekFilled />
          <Label>
            {new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}
          </Label>
          <Label>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Label>
          PROFILE
        </div>
      </header>

      {/* Shadow to avoid overlapping in dom */}
      <header className="flex w-full h-16 flex-row shadow-md bg-white justify-between items-center px-4" />
    </>
  )
}
