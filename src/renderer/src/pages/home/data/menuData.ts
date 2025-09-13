import { Category, MenuItem } from '../type'
import FriedRiceImage from '../../../assets/american-shrimp-fried-rice-served-with-chili-fish-sauce-thai-food.jpg'
import SandWitchImage from '../../../assets/side-view-club-sandwich-with-salted-cucumbers-lemon-olives-round-white-plate.jpg'
import PizzaImage from '../../../assets/crispy-mixed-pizza-with-olives-sausage.jpg'

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
    img: FriedRiceImage,
    category: 'Rice bowl'
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    price: 499,
    img: SandWitchImage,
    category: 'Best seller menu'
  },
  {
    id: 3,
    name: 'Chicken Salad',
    price: 499,
    img: PizzaImage,
    category: 'Best seller menu'
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 499,
    img: PizzaImage,
    category: 'Pizza'
  }
]
