export interface ICategory {
  item_group_code: string
  item_group_name: string
  parent_item_group: string
  is_group: number
  creation: string
  modified: string
}

export interface IVariant {
  item_code: string
  item_name: string
  uom: string
  barcode: string
  taxable: boolean
  tax_template: string
  tax_rate: string
  standard_rate: string
  taxable_amount: string
  tax_amount: string
  creation: string
  modified: string
  variant_id: string
  image: string
  size: string
}

export interface IProduct {
  item_code: string
  item_name: string
  description: string
  brand: string
  item_group: string
  stock_uom: string
  creation: string
  modified: string
  image: string
  is_active: boolean
  is_variant: boolean
  variants: IVariant[]
  uom: string
  barcode: string
  taxable: boolean
  tax_template: string
  tax_rate: string
  standard_rate: string
  taxable_amount: string
  tax_amount: string
}

export interface IMenuItem {
  id: string
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

export interface ITable {
  id: number
  tableNumber: string
  size: number
  status: string // It will be Available/Reserved/Billed/Available Soon
  tableType: string // It will be AC/Non AC
  isTerrace: boolean
}
