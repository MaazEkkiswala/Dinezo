'use client'

import { useEffect, useMemo, useState } from 'react'

import DzIconButton from '@renderer/components/dzIconButton'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Label } from '@renderer/components/ui/label'
import { Separator } from '@renderer/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { cloneDeep, filter, findIndex, reduce } from 'lodash'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { IOrderItem } from '../type'
import { AutoComplete } from '@renderer/components/dzAutocomplete'
import { dummyCustomers } from '../data/customerData'

interface ICurrentOrderProps {
  items: IOrderItem[]

  onCartChange: (cart: IOrderItem[]) => void
}

export default function CurrentOrder({ items, onCartChange }: ICurrentOrderProps) {
  const [orderItems, setOrderItems] = useState(items)
  // const [customerName, setCustomerName] = useState('')
  const customerOptions = dummyCustomers.map((c) => ({
    value: c.id.toString(),
    label: `${c.name} (${c.mobile})`
  }))

  const updateQty = (id: number, change: number) => {
    const _orderItems = cloneDeep(orderItems)
    const selectedItemIndex = findIndex(_orderItems, (orderItem: any) => orderItem.id === id)
    if (selectedItemIndex > -1) {
      _orderItems[selectedItemIndex].qty += change
    }

    setOrderItems(_orderItems)
    onCartChange(_orderItems)
  }

  const removeItem = (id: number) => {
    const _orderItems = filter(orderItems, (order) => order.id !== id)
    setOrderItems(_orderItems)
    onCartChange(_orderItems)
  }

  useEffect(() => {
    console.log('Items-------------', items)
    setOrderItems(items)
  }, [items])

  const { tax, grandTotal, subtotal, totalDiscount } = useMemo(() => {
    const { subtotal, totalDiscount } = reduce(
      orderItems,
      (acc: any, currentItem: IOrderItem) => {
        acc.subtotal += currentItem.selectedPrice * currentItem.qty
        acc.totalDiscount += (currentItem.discount ?? 0) * currentItem.qty

        return acc
      },
      { subtotal: 0, totalDiscount: 0 }
    )

    const tax = subtotal * 0.18
    const grandTotal = subtotal + tax - totalDiscount

    return { tax, grandTotal, subtotal, totalDiscount }
  }, [orderItems])

  return (
    <Card className="w-full h-full rounded-2xl shadow-md flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Current Order
          <Button size="icon" variant="secondary">
            +
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow overflow-y-auto">
        {/* Customer name input */}
        <AutoComplete
          placeholder="Select Customer"
          options={customerOptions}
          // value={formValues.customerId as any}
          emptyMessage="No Customer found"
          // returnValue="id"
          onValueChange={(value) => {}}
          // errorMessage={form.formState.errors?.financeId?.message}
        />

        <Tabs defaultValue="dinein" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="dinein">Dine In</TabsTrigger>
            <TabsTrigger value="takeaway">Take Away</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="grid grid-cols-3 items-center border-b pb-2 gap-2">
              <div>
                <Label className="font-medium truncate block max-w-full">{item.name}</Label>
                <Label className="text-xs text-gray-500">₹{item.selectedPrice} each</Label>
              </div>
              <div className="flex items-center gap-2">
                <DzIconButton
                  isDisabled={item.qty === 1}
                  onClick={() => updateQty(item.id, -1)}
                  icon={<Minus className="h-4 w-4" />}
                />

                <span>{item.qty}</span>

                <DzIconButton
                  onClick={() => updateQty(item.id, 1)}
                  icon={<Plus className="h-4 w-4" />}
                />

                <DzIconButton
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  icon={<Trash2 className="h-4 w-4 text-red-500" />}
                />
              </div>
              <div className="justify-self-end text-right">
                {item.discount ? (
                  <Label className="text-success-600 text-xs">-₹{item.discount * item.qty}</Label>
                ) : null}
                <Label className="font-semibold">
                  ₹{item.qty * item.selectedPrice - (item.discount ?? 0) * item.qty}
                </Label>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1 text-sm mt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(3)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{totalDiscount}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(3)}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <Button variant="outline">UPI</Button>
          <Button variant="outline">Card</Button>
          <Button variant="outline">Cash</Button>
          <Button variant="outline">Wallet</Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            Save
          </Button>
          <Button className="flex-1">Pay</Button>
          <Button variant="secondary" className="flex-1">
            Pay Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
