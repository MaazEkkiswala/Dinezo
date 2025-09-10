import { Category, MenuItem } from '../type'

export const categories: Category[] = [
  { id: 1, name: 'Best seller menu' },
  { id: 2, name: 'Pizza' },
  { id: 3, name: 'Burger' },
  { id: 4, name: 'Rice bowl' },
  { id: 5, name: 'Ice cream' }
]

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Fried Rice',
    price: 499,
    img: 'https://source.unsplash.com/300x200/?fried-rice',
    category: 'Rice bowl'
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    price: 499,
    img: 'https://source.unsplash.com/300x200/?salmon',
    category: 'Best seller menu'
  },
  {
    id: 3,
    name: 'Chicken Salad',
    price: 499,
    img: 'https://source.unsplash.com/300x200/?salad',
    category: 'Best seller menu'
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 499,
    img: 'https://source.unsplash.com/300x200/?pizza',
    category: 'Pizza'
  }
]
