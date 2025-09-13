export interface ICategory {
  id: number
  name: string
}

export interface IMenuItem {
  id: number
  name: string
  price: number
  img: string
  category: string
}

export interface IOrderItem extends IMenuItem {
  qty: number
  discount?: number
}
