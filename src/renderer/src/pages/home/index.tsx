'use client'

import { useState } from 'react'

import { Label } from '@renderer/components/ui/label'
import DzButton from '@renderer/components/dzButton'
import { MenuItem, OrderItem } from './type'
import { categories, menuItems } from './data/menuData'
import DzSearchInput from '@renderer/components/dzSearchInput'
import CurrentOrder from './order/currentOrder'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Best seller menu')
  const [cart, setCart] = useState<OrderItem[]>([])
  const [search, setSearch] = useState<string>('')

  const toggleAdd = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        // if already in cart → remove it
        return prev.filter((i) => i.id !== item.id)
      } else {
        // add to cart
        return [...prev, { ...item, qty: 1 }]
      }
    })
  }

  const filteredItems: MenuItem[] = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'Best seller menu' || item.category === selectedCategory)
  )

  return (
    <div className="flex p-6 w-full mx-auto gap-6">
      <div className="p-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Label className="text-2xl font-bold mb-2">Choose Category</Label>
            <Label>+{categories ? categories.length : '0'} categories</Label>
          </div>
          <div>
            <DzSearchInput
              placeholder="Search"
              value={search}
              onClear={() => setSearch('')}
              onChange={(value: string) => setSearch(value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <DzButton
              key={cat.id}
              label={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
            />
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.some((c) => c.id === item.id)
            return (
              <div
                key={item.id}
                className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}.00</p>

                  {/* Sizes */}
                  <div className="flex gap-2 mt-3">
                    {['S', 'M', 'L'].map((size) => (
                      <DzButton
                        label={size}
                        key={size}
                        className="px-2 py-1 border rounded text-xs bg-primary-600 text-white"
                      />
                    ))}
                  </div>

                  {/* Add / Remove Button */}
                  <DzButton
                    onClick={() => toggleAdd(item)}
                    className={`mt-3 w-full py-2 rounded-lg font-medium ${
                      inCart
                        ? 'bg-primary-600 text-white'
                        : 'border border-primary-600 text-black bg-white hover:bg-primary-400'
                    }`}
                    label={inCart ? 'Added' : 'Add'}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-[20%]">
        <CurrentOrder items={cart} />
      </div>
    </div>
  )
}
