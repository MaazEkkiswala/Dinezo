import { zodResolver } from '@hookform/resolvers/zod'
import DzButton from '@renderer/components/dzButton'
import { DzCustomDialog } from '@renderer/components/dzCommonDialog'
import { DzSelector } from '@renderer/components/dzSelector'
import DzFormInput from '@renderer/components/form/dzFormInput'
import { Form } from '@renderer/components/ui/form'
import { Separator } from '@renderer/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@renderer/components/ui/sheet'
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface ReservationSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sizeOptions = [
  { label: '4 Person', value: '4' },
  { label: '7 Person', value: '7' },
  { label: '10 Person', value: '10' },
  { label: '12 Person', value: '12' }
]

const reservationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  mobile: z.string().min(10, 'Mobile must be at least 10 digits'),
  email: z.string().email('Email address must be valid'),
  size: z.string().nonempty('Please select a table size')
})

export default function ReservationSheet({ open, onOpenChange }: ReservationSheetProps) {
  const [openReservationDialog, setOpenReservationDialog] = useState<boolean>(false)
  const dates = ['Sun 10', 'Mon 11', 'Tue 12', 'Wed 13', 'Thu 14', 'Fri 15', 'Sat 16']

  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  const rows = Array.from({ length: 15 }, (_, i) => ({
    id: `RES#00${i + 1}`,
    name: 'John Smit',
    time: '06:00 PM',
    table: 'T 13',
    size: 10
  }))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="h-screen w-full sm:max-w-[420px] flex flex-col rounded-l-2xl p-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarDays className="text-gray-700" size={20} />
              <SheetTitle className="text-lg font-semibold">Select Date</SheetTitle>
            </div>
            <span className="text-sm text-gray-600">Aug, 10 2024 ▼</span>
          </div>
        </SheetHeader>

        {/* Date Tabs */}
        <div className="flex items-center gap-2 px-6 py-4 overflow-x-auto">
          {dates.map((d, i) => (
            <button
              key={i}
              className={`px-3 py-2 text-sm rounded-md border ${
                i === 0 ? 'border-purple-500 text-purple-600' : 'border-gray-300 text-gray-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <Separator />

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-6">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2 text-left">R. ID</th>
                <th className="py-2 text-left">Customer Name</th>
                <th className="py-2 text-left">Time</th>
                <th className="py-2 text-left">Table</th>
                <th className="py-2 text-left">Size</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="py-2">{row.id}</td>
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">{row.time}</td>
                  <td className="py-2">{row.table}</td>
                  <td className="py-2">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <DzButton
            label={'New Reservation'}
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              setOpenReservationDialog(true)
            }}
          />
        </div>
        <DzCustomDialog
          open={openReservationDialog}
          onOpenChange={setOpenReservationDialog}
          title="Customer Details"
          description=""
          onSubmit={() => {
            setOpenReservationDialog(false)
          }}
          onCancel={() => {
            setOpenReservationDialog(false)
          }}
          cancelLabel="Cancel"
          submitLabel="Add Reservation"
          submitButtonClass="h-12 text-lg bg-primary-500 hover:bg-primary-600"
          cancelButtonClass="h-12 text-lg border-primary-500 text-primary-500"
        >
          <div className="flex flex-col gap-6 w-full">
            {/* Customer Fields */}
            <div className="grid grid-cols-2 items-center justify-center gap-4">
              <Form {...form}>
                <DzFormInput
                  control={form.control}
                  name="name"
                  placeholder="Customer name"
                  label="Customer name"
                  required
                />
                <DzFormInput
                  name="mobile"
                  label="Mobile no"
                  placeholder="Mobile no"
                  control={form.control}
                  required
                />
                <DzFormInput
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  control={form.control}
                  required
                />
                <DzSelector
                  placeholder="Select Table size"
                  optionLabel="Size"
                  options={sizeOptions}
                  onValueChange={(val) => console.log('Selected Size:', val)}
                  selectorClass="mt-3 w-auto"
                />
              </Form>
            </div>

            {/* Morning Time */}
            <div>
              <p className="text-gray-700 font-medium mb-2">Morning Time</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  '11:00 AM',
                  '11:30 AM',
                  '12:00 PM',
                  '12:30 PM',
                  '1:00 PM',
                  '1:30 PM',
                  '2:00 PM',
                  '2:30 PM',
                  '3:00 PM',
                  '3:30 PM'
                ].map((time) => (
                  <button
                    key={time}
                    className="border rounded-md px-3 py-2 text-sm hover:bg-primary-50 hover:border-primary-500"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening Time */}
            <div>
              <p className="text-gray-700 font-medium mb-2">Evening Time</p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  '7:00 PM',
                  '7:30 PM',
                  '8:00 PM',
                  '8:30 PM',
                  '9:00 PM',
                  '10:00 PM',
                  '10:30 PM',
                  '11:00 PM',
                  '11:30 PM',
                  '12:00 PM'
                ].map((time) => (
                  <button
                    key={time}
                    className="border rounded-md px-3 py-2 text-sm hover:bg-primary-50 hover:border-primary-500"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DzCustomDialog>
      </SheetContent>
    </Sheet>
  )
}
