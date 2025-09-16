export interface ICategory {
  id: number
  name: string
}

export interface IMenuItem {
  id: number
  name: string
  uom: {
    size: string
    price: number
  }[]
  img: string
  category: number
}

export interface IOrderItem extends IMenuItem {
  qty: number
  discount?: number
  selectedSize: string
  selectedPrice: number
}

export interface ICustomer {
  id: number
  name: string
  mobile: string
  email: string
  gender: 'Male' | 'Female' | 'Other'
  birthday: string // ISO date format
}
