import FriedRiceImage from '../../../assets/american-shrimp-fried-rice-served-with-chili-fish-sauce-thai-food.jpg'
import SandWitchImage from '../../../assets/side-view-club-sandwich-with-salted-cucumbers-lemon-olives-round-white-plate.jpg'
import PizzaImage from '../../../assets/crispy-mixed-pizza-with-olives-sausage.jpg'
import { ICategory, IMenuItem } from '../type'

export const categories: ICategory[] = [
  { id: 1, name: 'Best seller menu' },
  { id: 2, name: 'Pizza' },
  { id: 3, name: 'Burger' },
  { id: 4, name: 'Rice bowl' },
  { id: 5, name: 'Ice cream' }
]

export const menuItems: IMenuItem[] = [
  {
    id: 1,
    name: 'Fried Rice',
    uom: [
      {
        size: 'S',
        price: 200
      },
      {
        size: 'M',
        price: 250
      },
      {
        size: 'L',
        price: 400
      }
    ],
    img: FriedRiceImage,
    category: 4
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    uom: [
      {
        size: 'S',
        price: 200
      },
      {
        size: 'M',
        price: 250
      },
      {
        size: 'L',
        price: 400
      }
    ],
    img: SandWitchImage,
    category: 1
  },
  {
    id: 3,
    name: 'Chicken Salad',
    uom: [
      {
        size: 'S',
        price: 200
      },
      {
        size: 'M',
        price: 250
      },
      {
        size: 'L',
        price: 400
      }
    ],
    img: PizzaImage,
    category: 1
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    uom: [
      {
        size: 'S',
        price: 200
      },
      {
        size: 'M',
        price: 250
      },
      {
        size: 'L',
        price: 400
      }
    ],
    img: PizzaImage,
    category: 2
  }
]
