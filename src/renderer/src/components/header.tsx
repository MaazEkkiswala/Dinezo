import { ReactNode, useState } from 'react'
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
import { first, map } from 'lodash'
import { useNavigate } from 'react-router'
import AppUtils from '@renderer/helpers/appUtils'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from './ui/form'
import DzFormInput from './form/dzFormInput'
import DzFormTextArea from './form/dzFormTextArea'
import { DzCustomDialog } from './dzCommonDialog'

interface IMenu {
  icon: ReactNode
  name: string
  to: string
}

const menus: IMenu[] = [
  {
    icon: <IconSmartHome className="h-8 w-8" />,
    name: 'Home',
    to: '/'
  },
  {
    icon: <IconToolsKitchen3 className="h-8 w-8" />,
    name: 'Table',
    to: '/table'
  },
  {
    icon: <IconListCheck className="h-8 w-8" />,
    name: 'Order List',
    to: '/orders'
  },
  {
    icon: <IconLicense className="h-8 w-8" />,
    name: 'Invoice',
    to: '/invoices'
  }
]

const supportSchema = z.object({
  subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long')
})

export default function Header() {
  const navigate = useNavigate()
  const [openSupportDialog, setOpenSupportDialog] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<IMenu>(first(menus) as any)
  type SupportFormValues = z.infer<typeof supportSchema>

  const _navigateTo = (menu: IMenu) => {
    navigate(menu.to)
    setSelectedMenu(menu)
  }

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: '',
      message: ''
    }
  })

  const handleSupportSubmit = (values: SupportFormValues) => {
    console.log('Support Form Data:', values)
    // need to call API here when support API is available
    setOpenSupportDialog(false)
  }

  return (
    <>
      <header className="flex w-full h-16 flex-row shadow-md bg-white justify-between items-center top-0 fixed px-4">
        <Label className="text-2xl text-primary-500 font-mono">Logo</Label>

        <div className="flex flex-row items-center gap-3">
          {map(menus, (menu: IMenu) => (
            <div
              onClick={() => _navigateTo(menu)}
              key={menu.name}
              className={AppUtils.classNames(
                'flex flex-row space-x-2 items-center cursor-pointer',
                selectedMenu.to === menu.to ? 'text-primary-400' : 'text-secondary-400'
              )}
            >
              {menu.icon}

              <Label className="text-md cursor-pointer">{menu.name}</Label>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-3">
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
            <IconMessages
              className="cursor-pointer hover:text-primary-500"
              onClick={() => setOpenSupportDialog(true)}
            />
            <IconBell className="cursor-pointer hover:text-primary-500" />
          </div>
          <Label onClick={() => navigate('/user')} className="cursor-pointer text-blue-500">
            PROFILE
          </Label>
        </div>

        <DzCustomDialog
          open={openSupportDialog}
          onOpenChange={setOpenSupportDialog}
          title="Support Ticket"
          description=""
          onSubmit={() => {
            setOpenSupportDialog(false)
          }}
          onCancel={() => {
            setOpenSupportDialog(false)
          }}
          cancelLabel="Cancel"
          submitLabel="Submit"
          submitButtonClass="h-15 text-lg bg-primary-500 hover:bg-primary-600"
          cancelButtonClass="h-15 text-lg border-primary-500 text-primary-500"
        >
          {/* Custom children content */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Form {...form}>
              <div className="flex flex-col gap-4 w-full">
                <DzFormInput
                  control={form.control}
                  name="subject"
                  placeholder="Enter subject"
                  label="Subject"
                  required
                />
                <DzFormTextArea
                  control={form.control}
                  name="message"
                  placeholder="Enter your message"
                  label="Message"
                />
              </div>
            </Form>
          </div>
        </DzCustomDialog>
      </header>

      {/* Shadow to avoid overlapping in dom */}
      <header className="flex w-full h-16 flex-row shadow-md bg-white justify-between items-center px-4" />
    </>
  )
}
