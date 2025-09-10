'use client'
import DzFlatList from '@renderer/components/dzFlatList'
import { Label } from '@renderer/components/ui/label'
import { dummyData } from './data/invoiceData'
import { useState } from 'react'
import DzSearchInput from '@renderer/components/dzSearchInput'
import { DzDatePickerWithLabel } from '@renderer/components/dzDatePickerWithLabel'
import DzButton from '@renderer/components/dzButton'

export default function Invoices() {
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [search, setSearch] = useState<string>('')

  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex items-center justify-between pb-3">
        {/* Left Side - Title */}
        <Label className="text-2xl font-semibold">Invoices</Label>

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

      <DzFlatList
        data={dummyData}
        emptyDescription="No orders found"
        columns={5}
        gap={6}
        renderItem={(order, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <Label className="text-lg font-bold">Table No. {order.tableNo}</Label>
              <Label className="text-sm text-gray-500">{order.orderId}</Label>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Name:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Table No:</span>{' '}
                {String(order.tableNo).padStart(2, '0')}
              </p>
              <p>
                <span className="font-medium">Total Item:</span> {order.totalItems}
              </p>
            </div>
            <DzButton
              className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 rounded-lg"
              label={`₹${order.totalAmount.toLocaleString()}`}
            />
          </div>
        )}
      />
    </div>
  )
}
