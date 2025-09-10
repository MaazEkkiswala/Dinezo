'use client'
import { DzDatePickerWithLabel } from '@renderer/components/dzDatePickerWithLabel'
import DzSearchInput from '@renderer/components/dzSearchInput'
import { Label } from '@renderer/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { useState } from 'react'

export default function Orders() {
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [search, setSearch] = useState<string>('')
  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex items-center justify-between pb-3">
        {/* Left Side - Title */}
        <Label className="text-2xl font-semibold">Order List</Label>

        {/* Right Side - Filters */}
        <div className="flex items-center gap-6">
          <div className="flex flex-row m-4 p-4 divide-x-2 divide-gray-400">
            <div className="pr-4">
              <DzDatePickerWithLabel label="From Date" date={fromDate} onChange={setFromDate} />
            </div>

            <div className="pl-4">
              <DzDatePickerWithLabel label="To Date" date={toDate} onChange={setToDate} />
            </div>
          </div>

          {/* Search */}
          <DzSearchInput
            placeholder="Search"
            value={search}
            onClear={() => setSearch('')}
            onChange={(value: string) => setSearch(value)}
          />
        </div>
      </div>
      <Tabs defaultValue="all" className="w-full">
        {/* Tab Buttons */}
        <TabsList className="flex justify-start space-x-6 border-b">
          <TabsTrigger value="all" className="relative pb-2 data-[state=active]:text-purple-600">
            All
            <span className="absolute left-0 -bottom-[1px] h-[2px] w-full rounded bg-purple-600 transition-all duration-300 opacity-0 data-[state=active]:opacity-100" />
          </TabsTrigger>

          <TabsTrigger value="dinein" className="relative pb-2 data-[state=active]:text-purple-600">
            Dine In
            <span className="absolute left-0 -bottom-[1px] h-[2px] w-full rounded bg-purple-600 transition-all duration-300 opacity-0 data-[state=active]:opacity-100" />
          </TabsTrigger>

          <TabsTrigger
            value="completed"
            className="relative pb-2 data-[state=active]:text-purple-600"
          >
            Completed
            <span className="absolute left-0 -bottom-[1px] h-[2px] w-full rounded bg-purple-600 transition-all duration-300 opacity-0 data-[state=active]:opacity-100" />
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="all" className="mt-4">
          <p>Showing all orders...</p>
        </TabsContent>

        <TabsContent value="dinein" className="mt-4">
          <p>Showing dine in orders...</p>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <p>Showing completed orders...</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
