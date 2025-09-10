'use client'

import { useState } from 'react'

import { Label } from '@renderer/components/ui/label'
import DzButton from '@renderer/components/dzButton'
import { MenuItem } from './type'
import { categories, menuItems } from './data/menuData'
import DzSearchInput from '@renderer/components/dzSearchInput'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Best seller menu')
  const [cart, setCart] = useState<number[]>([])
  const [search, setSearch] = useState<string>('')

  const toggleAdd = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredItems: MenuItem[] = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'Best seller menu' || item.category === selectedCategory)
  )

  return (
    <div className="p-6 w-full mx-auto">
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

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <DzButton
            key={cat.id}
            label={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            // className={`px-4 py-2 rounded-lg text-sm font-medium ${
            //   selectedCategory === cat.name ? 'bg-purple-600 text-white' : 'bg-gray-10'
            // }`}
          />
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}.00</p>

              {/* Sizes */}
              <div className="flex gap-2 mt-3">
                {['S', 'M', 'L'].map((size) => (
                  <DzButton
                    label={size}
                    key={size}
                    className={`px-2 py-1 border rounded text-xs ${
                      size ? 'bg-purple-600 text-white' : 'border border-purple-600 text-purple-600'
                    } `}
                  />
                ))}
              </div>

              {/* Add Button */}
              <DzButton
                onClick={() => toggleAdd(item.id)}
                className={`mt-3 w-full py-2 rounded-lg font-medium bg-white hover:bg-purple-400 ${
                  cart.includes(item.id)
                    ? 'bg-purple-600 text-white'
                    : 'border border-purple-600 text-purple-600'
                }`}
                label={cart.includes(item.id) ? 'Added' : 'Add'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
