'use client'

import { useEffect, useState } from 'react'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { Label } from '@renderer/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Separator } from '@renderer/components/ui/separator'
import { OrderItem } from '../type'

interface CurrentOrderProps {
  items: OrderItem[]
}

export default function CurrentOrder({ items }: CurrentOrderProps) {
  const [orderItems, setOrderItems] = useState(items)
  // const [customerName, setCustomerName] = useState('')

  const updateQty = (id: number, change: number) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item))
    )
  }

  const removeItem = (id: number) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    console.log('items', items)
    console.log('orderItems', orderItems)
  }, [])

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const totalDiscount = orderItems.reduce((acc, item) => acc + (item.discount ?? 0) * item.qty, 0)
  const tax = subtotal * 0.18
  const grandTotal = subtotal + tax - totalDiscount

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
        {/* <Input
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        /> */}

        {/* Tabs for Dine In / Take Away */}
        <Tabs defaultValue="dinein" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="dinein">Dine In</TabsTrigger>
            <TabsTrigger value="takeaway">Take Away</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Items list */}
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <Label className="font-medium">{item.name}</Label>
                <Label className="text-xs text-gray-500">₹{item.price} each</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => updateQty(item.id, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{item.qty}</span>
                <Button size="icon" variant="outline" onClick={() => updateQty(item.id, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="text-right">
                {item.discount ? (
                  <Label className="text-success-600 text-xs">-₹{item.discount * item.qty}</Label>
                ) : null}
                <Label className="font-semibold">
                  ₹{item.qty * item.price - (item.discount ?? 0) * item.qty}
                </Label>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1 text-sm mt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>₹{tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{totalDiscount}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(0)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Button variant="outline">UPI</Button>
          <Button variant="outline">Card</Button>
          <Button variant="outline">Cash</Button>
          <Button variant="outline">Wallet</Button>
        </div>

        {/* Action Buttons */}
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
