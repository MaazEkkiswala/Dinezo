import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { useState, useEffect } from 'react'

interface Tip {
  id: number
  orderName: string
  table: string
  amount: number
}

export default function BestTipsCard() {
  const [tips, setTips] = useState<Tip[]>([])

  useEffect(() => {
    // Dummy data
    const dummyTips: Tip[] = [
      { id: 1, orderName: 'Order Number', table: 'Table 10', amount: 510 },
      { id: 2, orderName: 'Order Number', table: 'Table 12', amount: 420 },
      { id: 3, orderName: 'Order Number', table: 'Table 5', amount: 380 },
      { id: 4, orderName: 'Order Number', table: 'Table 8', amount: 600 }
    ]
    setTips(dummyTips)
  }, [])

  return (
    <Card className="w-full shadow-md rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Best Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 text-sm font-medium text-gray-500 mb-3">
          <span>Order Name</span>
          <span className="text-center"></span>
          <span className="text-right">Orders</span>
        </div>

        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-md border">
                  <span role="img" aria-label="table">
                    🍽️
                  </span>
                </div>
                <div>
                  <div className="font-medium">{tip.orderName}</div>
                  <div className="text-sm text-gray-500">{tip.table}</div>
                </div>
              </div>

              <div className="text-lg font-semibold">₹{tip.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
