'use client'

import { useState } from 'react'

import DzButton from '@renderer/components/dzButton'
import DzSearchInput from '@renderer/components/dzSearchInput'
import { Label } from '@renderer/components/ui/label'
import { isEmpty } from 'lodash'
import { categories, menuItems } from './data/menuData'
import CurrentOrder from './order/currentOrder'
import { IMenuItem, IOrderItem } from './type'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [cart, setCart] = useState<IOrderItem[]>([])
  const [search, setSearch] = useState<string>('')
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<number, string>>({})
  // uncomment when call API to get menuItems
  // const [menuItems, setMenuItems] = useState<IMenuItem[]>([])

  const toggleAdd = (item: IMenuItem, selectedSize: string) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id && i.selectedSize === selectedSize)

      if (exists) {
        // remove if exists
        return prev.filter((i) => !(i.id === item.id && i.selectedSize === selectedSize))
      } else {
        // find price for selected size
        const selectedUom = item.uom.find((u) => u.size === selectedSize)
        return [
          ...prev,
          {
            ...item,
            qty: 1,
            selectedSize,
            selectedPrice: selectedUom ? selectedUom.price : item.uom[0].price
          }
        ]
      }
    })
  }

  const filteredItems: IMenuItem[] = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 1 || item.category === selectedCategory)
  )

  return (
    <div className="flex p-6 grow mx-auto gap-6">
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
              onClick={() => setSelectedCategory(cat.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
            />
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.some((c) => c.id === item.id)

            const selectedSize = selectedSizeMap[item.id] || 'S'
            const selectedUom = item.uom.find((u) => u.size === selectedSize) || item.uom[0]
            return (
              <div
                key={item.id}
                className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{selectedUom.price}.00</p>

                  <div className="flex gap-2 mt-3">
                    {item.uom.map((sizeObj) => (
                      <DzButton
                        label={sizeObj.size}
                        key={sizeObj.size}
                        onClick={() => {
                          setSelectedSizeMap((prev) => ({ ...prev, [item.id]: sizeObj.size }))

                          setCart((prev) =>
                            prev.map((cartItem) =>
                              cartItem.id === item.id
                                ? {
                                  ...cartItem,
                                  selectedSize: sizeObj.size,
                                  selectedPrice: sizeObj.price
                                }
                                : cartItem
                            )
                          )
                        }}
                        className={`px-2 py-1 border rounded text-xs ${selectedSize === sizeObj.size
                          ? 'bg-primary-600 text-white'
                          : 'border-primary-600 text-black bg-white hover:bg-primary-400'
                          }`}
                      />
                    ))}
                  </div>

                  <DzButton
                    onClick={() => toggleAdd(item, selectedSize)}
                    className={`mt-3 w-full py-2 rounded-lg font-medium ${inCart
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

      {!isEmpty(cart) ? (
        <div className="w-[25%]">
          <CurrentOrder items={cart} onCartChange={(_cart) => setCart(_cart)} />
        </div>
      ) : null}
    </div>
  )
}
