interface TableOrder {
  id: number
  tableNo: number
  customerName: string
  orderId: string
  totalItems: number
  totalAmount: number
}

export const dummyData: TableOrder[] = [
  {
    id: 1,
    tableNo: 14,
    customerName: 'Sahil Shah',
    orderId: '#12345',
    totalItems: 48,
    totalAmount: 4875
  },
  {
    id: 2,
    tableNo: 15,
    customerName: 'John Doe',
    orderId: '#12346',
    totalItems: 32,
    totalAmount: 3890
  },
  {
    id: 3,
    tableNo: 16,
    customerName: 'Jane Smith',
    orderId: '#12347',
    totalItems: 25,
    totalAmount: 2999
  }
  // 👆 Add as many as you like…
]
