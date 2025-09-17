import { CommonDialog } from '@renderer/components/dzCommonDialog'
import DzIconButton from '@renderer/components/dzIconButton'

import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'

import { Card, CardContent } from '@renderer/components/ui/card'
import { ChartConfig } from '@renderer/components/ui/chart'

import { Label } from '@renderer/components/ui/label'

import BestTipsCard from '@renderer/sections/user/bestTips'
import { ChartLineLinear } from '@renderer/sections/user/chart-line-linear'
import TrendingDishesCard from '@renderer/sections/user/trendingDishes'
import { IconLogout } from '@tabler/icons-react'
import { useState } from 'react'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 214 },
  { month: 'August', desktop: 300 },
  { month: 'September', desktop: 405 },
  { month: 'October', desktop: 215 },
  { month: 'November', desktop: 345 },
  { month: 'December', desktop: 320 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

export default function Users() {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
  const user = {}

  return (
    <div className="flex flex-row w-full">
      <div className="m-4 p-4 grid grid-cols-12 grow">
        <div className="col-span-4 m-5">
          <Card>
            <CardContent className="px-10 py-8 flex flex-col justify-center">
              <div className="m-2 p-2">
                <Label className="text-lg text-muted-foreground">First Name</Label>
                <Label className="p-2 border bg-secondary-100 rounded-md text-xl font-medium">
                  {user.firstName || 'Hamid'}
                </Label>
              </div>

              <div className="m-2 p-2">
                <Label className="text-lg text-muted-foreground">Last Name</Label>
                <Label className="p-2 border bg-secondary-100 rounded-md text-xl font-medium">
                  {user.lastName || 'Dinezo'}
                </Label>
              </div>

              <div className="m-2 p-2">
                <Label className="text-lg text-muted-foreground">Email</Label>
                <Label className="p-2 border bg-secondary-100 rounded-md text-xl font-medium">
                  {user.email || 'kevinshah@gmail.com'}
                </Label>
              </div>

              <div className="m-2 p-2">
                <Label className="text-lg text-muted-foreground">Phone Number</Label>
                <Label className="p-2 border bg-secondary-100 rounded-md text-xl font-medium">
                  {user.phone || '+9190765432109'}
                </Label>
              </div>

              <div className="m-2 p-2">
                <Label className="text-lg text-muted-foreground">Joining Date</Label>
                <Label className="p-2 border bg-secondary-100 rounded-md text-xl font-medium">
                  {user.joiningDate || '21 June 2024'}
                </Label>
              </div>

              <div
                className="mt-10 h-12 flex flex-row w-full items-center border border-primary-500 text-primary-500 justify-center rounded-md cursor-pointer"
                onClick={() => setOpenLogoutDialog(true)} // ← open dialog
              >
                <DzIconButton
                  icon={<IconLogout className="w-8 h-8" />}
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpenLogoutDialog(true)} // optional: also opens dialog
                />
                Logout
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-8 space-y-6">
          <div className="m-5 grid grid-cols-3 gap-4">
            <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
              <div className="flex flex-col">
                <Label className="text-md font-semibold">New Order</Label>
                <Label className="text-2xl font-bold">72</Label>
                <Label className="text-sm mt-1 ">• Updated every new order</Label>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
              <div className="flex flex-col">
                <Label className="text-md font-semibold">Total Order</Label>
                <Label className="text-2xl font-bold">72</Label>
                <Label className="text-sm mt-1  ">• Updated every new order</Label>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="rounded-2xl bg-white text-black p-6 shadow transition-colors duration-300 hover:bg-primary-700 hover:text-white">
              <div className="flex flex-col">
                <Label className="text-md font-semibold">Waiting List</Label>
                <Label className="text-2xl font-bold">72</Label>
                <Label className="text-sm mt-1 ">• Updated every new order</Label>
              </div>
            </Card>
          </div>

          <div>
            <ChartLineLinear
              title="Line Chart - Linear"
              description="January - December 2025"
              data={chartData}
              dataKey="desktop"
              xKey="month"
              chartConfig={chartConfig}
              className="m-5 p-4"
            />
          </div>

          <div className="m-5 grid grid-cols-2 gap-4">
            <TrendingDishesCard />
            <BestTipsCard />
          </div>
        </div>
      </div>
      <CommonDialog
        open={openLogoutDialog}
        onOpenChange={setOpenLogoutDialog}
        title=""
        description=""
        onSubmit={() => {
          // Handle logout
          console.log('Logging out...')
          setOpenLogoutDialog(false)
        }}
        onCancel={() => {
          setOpenLogoutDialog(false)
        }}
        cancelLabel="Cancel"
        submitLabel="Log Out"
        submitButtonClass="h-15 text-lg bg-error-500 hover:bg-error-600"
        cancelButtonClass="h-15 text-lg border-error-500 text-error-500"
      >
        {/* Custom children content */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <IconLogout className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-black">Log Out?</h2>
          <p className="text-gray-500 text-sm">Are you sure want to log out?</p>
        </div>
      </CommonDialog>
    </div>
  )
}
