export interface Category {
  id: number
  name: string
}

export interface MenuItem {
  id: number
  name: string
  price: number
  img: string
  category: string
}

export interface OrderItem extends MenuItem {
  qty: number
  discount?: number
}
