import DzButton from '@renderer/components/dzButton'
import { Label } from '@renderer/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import ReservationSheet from '@renderer/sections/table/reservationDrawer'
import { useState } from 'react'

export const tableStatusOptions = [
  {
    label: 'Available',
    value: 'available',
    color:
      'text-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600'
  },
  {
    label: 'Reserved',
    value: 'reserved',
    color:
      'text-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500'
  },
  {
    label: 'Billed',
    value: 'billed',
    color:
      'text-success-600 data-[state=checked]:border-success-600 data-[state=checked]:bg-success-600'
  },
  {
    label: 'Available Soon',
    value: 'soon',
    color:
      'text-warning-500 data-[state=checked]:border-warning-500 data-[state=checked]:bg-warning-500'
  }
]

const tableTypeOptions = [
  {
    label: 'AC',
    value: 'ac',
    color: 'text-black data-[state=checked]:border-black data-[state=checked]:bg-black'
  },
  {
    label: 'Non-AC',
    value: 'non-ac',
    color:
      'text-secondary-600 data-[state=checked]:border-secondary-600 data-[state=checked]:bg-secondary-600'
  },
  {
    label: 'Terrace',
    value: 'terrace',
    color:
      'text-secondary-800 data-[state=checked]:border-secondary-800 data-[state=checked]:bg-secondary-800'
  }
]

export default function Tables() {
  const [selectedStatus, setSelectedStatus] = useState('available')
  const [openReservationDrawer, setOpenReservationDrawer] = useState<boolean>(false)

  return (
    <div className="m-2 p-2 w-full flex flex-row justify-between items-center">
      <div>
        <RadioGroup
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          className="flex flex-row flex-wrap gap-6"
        >
          {tableStatusOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className={`h-5 w-5 border-2 ${option.color}`}
              />

              <Label htmlFor={option.value} className={`text-base font-medium cursor-pointer `}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <RadioGroup
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          className="flex flex-row flex-wrap gap-6"
        >
          {tableTypeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className={`h-5 w-5 border-2 ${option.color}`}
              />

              <Label htmlFor={option.value} className={`text-base font-medium cursor-pointer `}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <DzButton
        label="Reserve"
        variant="outline"
        className="text-primary-500 border-primary-500 hover:text-primary-700"
        onClick={() => {
          setOpenReservationDrawer(true)
        }}
      />
      <ReservationSheet open={openReservationDrawer} onOpenChange={setOpenReservationDrawer} />
    </div>
  )
}
