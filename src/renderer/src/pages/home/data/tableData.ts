import { ITable } from '../type'

export const dummyTables: ITable[] = [
  {
    id: 1,
    tableNumber: 'T1',
    size: 6,
    status: 'Available',
    tableType: 'AC',
    isTerrace: false
  },
  {
    id: 2,
    tableNumber: 'T2',
    size: 10,
    status: 'Reserved',
    tableType: 'Non AC',
    isTerrace: true
  },
  {
    id: 3,
    tableNumber: 'T3',
    size: 12,
    status: 'Billed',
    tableType: 'AC',
    isTerrace: false
  },
  {
    id: 4,
    tableNumber: 'T4',
    size: 6,
    status: 'Available Soon',
    tableType: 'Non AC',
    isTerrace: false
  },
  {
    id: 5,
    tableNumber: 'T5',
    size: 4,
    status: 'Available',
    tableType: 'AC',
    isTerrace: true
  },
  {
    id: 6,
    tableNumber: 'T6',
    size: 4,
    status: 'Reserved',
    tableType: 'AC',
    isTerrace: false
  },
  {
    id: 7,
    tableNumber: 'T7',
    size: 12,
    status: 'Available',
    tableType: 'Non AC',
    isTerrace: true
  },
  {
    id: 8,
    tableNumber: 'T8',
    size: 10,
    status: 'Billed',
    tableType: 'AC',
    isTerrace: true
  },
  {
    id: 9,
    tableNumber: 'T9',
    size: 6,
    status: 'Available Soon',
    tableType: 'Non AC',
    isTerrace: false
  },
  {
    id: 10,
    tableNumber: 'T10',
    size: 4,
    status: 'Available',
    tableType: 'AC',
    isTerrace: false
  }
]
