'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

interface InvoiceItem {
  name: string
  price: number
  qty: number
  discount: number
  total: number
}

interface InvoiceDetails {
  id: string
  tableNo: string
  customer: {
    name: string
    phone: string
  }
  items: InvoiceItem[]
  tip: number
  tax: number
  discount: number
  grandTotal: number
}

const sampleInvoice: InvoiceDetails = {
  id: '#215463',
  tableNo: '10',
  customer: { name: 'John Smit', phone: '+91 1234567890' },
  items: [
    { name: 'Chole Bhature', price: 210, qty: 2, discount: 98, total: 978 },
    { name: 'Paneer Tikka', price: 610, qty: 3, discount: 120, total: 1540 },
    { name: 'Dal Makhani', price: 570, qty: 4, discount: 65, total: 2200 }
  ],
  tip: 140,
  tax: 210,
  discount: 420,
  grandTotal: 5760
}

export default function InvoiceSheet() {
  return (
    <Sheet>
      {/* Trigger: You can wrap this around invoice card */}
      <SheetTrigger asChild>
        <Button variant="outline">View Invoice</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[600px] sm:w-[700px] p-6">
        <SheetHeader>
          <SheetTitle>Invoice {sampleInvoice.id}</SheetTitle>
          <p className="text-sm text-gray-500">Table No: {sampleInvoice.tableNo}</p>
        </SheetHeader>

        {/* Customer Details */}
        <div className="mt-4 flex justify-between">
          <div className="text-sm">
            <p className="font-semibold">Customer Details</p>
            <p className="text-gray-600">📞 {sampleInvoice.customer.phone}</p>
            <p className="text-gray-600">👤 {sampleInvoice.customer.name}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-6">
          <table className="w-full text-sm border-collapse">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-2">Item</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Qty</th>
                <th className="pb-2">Discount</th>
                <th className="pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {sampleInvoice.items.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">₹{item.price}</td>
                  <td className="py-2">{item.qty}</td>
                  <td className="py-2">₹{item.discount}</td>
                  <td className="py-2">₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Tip</span>
            <span className="font-semibold">₹{sampleInvoice.tip}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold">₹{sampleInvoice.tax}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-semibold">₹{sampleInvoice.discount}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span>₹{sampleInvoice.grandTotal}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Done</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
