import { ReactNode } from 'react'
import { Label } from './ui/label'
import {
  IconBell,
  IconCalendarWeekFilled,
  IconLicense,
  IconListCheck,
  IconMessages,
  IconPhone,
  IconSmartHome,
  IconToolsKitchen3
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
    icon: <IconSmartHome className="h-8 w-8 text-secondary-400" />,
    name: 'Home',
    to: '/'
  },
  {
    icon: <IconToolsKitchen3 className="h-8 w-8 text-secondary-400" />,
    name: 'Table',
    to: '/table'
  },
  {
    icon: (
      <IconListCheck className="h-8 w-8 text-secondary-400 border-3 border-secondary-400 rounded-lg" />
    ),
    name: 'Order List',
    to: '/orders'
  },
  {
    icon: <IconLicense className="h-8 w-8 text-secondary-400" />,
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

        <div className="flex flex-row items-center space-x-6">
          {map(menus, (menu: IMenu) => (
            <div
              onClick={() => navigate(menu.to)}
              key={menu.name}
              className="flex flex-row space-x-2 items-center cursor-pointer"
            >
              {menu.icon}

              <Label className="text-md text-secondary-400 cursor-pointer">{menu.name}</Label>
            </div>
          ))}
        </div>
        <div className="flex flex-row space-x-8">
          <div className="flex flex-row leading-tight text-right">
            <IconCalendarWeekFilled className="text-secondary-400" />
            <Label className="m-2 text-secondary-400">
              {new Date().toLocaleDateString([], {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </Label>
            <Label className="mr-2 text-secondary-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Label>
          </div>
          <div className="flex flex-row items-center space-x-4 text-secondary-400">
            <IconPhone className="cursor-pointer hover:text-primary-500" />
            <IconMessages className="cursor-pointer hover:text-primary-500" />
            <IconBell className="cursor-pointer hover:text-primary-500" />
          </div>
          <Label onClick={() => navigate('/user')} className="cursor-pointer text-blue-500">
            PROFILE
          </Label>
        </div>
      </header>

      {/* Shadow to avoid overlapping in dom */}
      <header className="flex w-full h-16 flex-row shadow-md bg-white justify-between items-center px-4" />
    </>
  )
}
