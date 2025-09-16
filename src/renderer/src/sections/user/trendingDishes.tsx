import { useEffect, useState } from 'react'

import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Badge } from '@renderer/components/ui/badge'

interface Dish {
  id: number
  name: string
  category: string // Food, Drink etc.
  orders: number
  image: string
}

export default function TrendingDishesCard() {
  const [dishes, setDishes] = useState<Dish[]>([])

  useEffect(() => {
    const dummyData: Dish[] = [
      {
        id: 1,
        name: 'Cheese Burger',
        category: 'Food',
        orders: 210,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop'
      },
      {
        id: 2,
        name: 'Cold Coffee',
        category: 'Drink',
        orders: 180,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e17d?w=100&h=100&fit=crop'
      },
      {
        id: 3,
        name: 'French Fries',
        category: 'Food',
        orders: 150,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&h=100&fit=crop'
      }
    ]
    setDishes(dummyData)
    // const fetchDishes = async () => {
    //   try {
    //     const res = await axios.get('https://api.example.com/trending-dishes')
    //     setDishes(res.data)
    //   } catch (err) {
    //     console.error('Error fetching dishes:', err)
    //   }
    // }
    // fetchDishes()
  }, [])

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Trending Dishes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 text-sm font-medium text-gray-500 mb-3">
          <span>Dishes</span>
          <span className="text-center"></span>
          <span className="text-right">Orders</span>
        </div>
        <div className="space-y-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex items-center justify-between">
              {/* Left - Image + Details */}
              <div className="flex items-center gap-3">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <Badge variant="secondary" className="bg-primary-600 text-white text-xs">
                    {dish.category}
                  </Badge>
                  <div className="font-medium">{dish.name}</div>
                </div>
              </div>

              {/* Right - Orders */}
              <div className="text-lg font-semibold">{dish.orders}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
