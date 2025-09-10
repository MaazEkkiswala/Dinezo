import { DataTypes, Model } from '@sequelize/core'

import sequelize from '../configs/sequelize'

class MenuModel extends Model {}

MenuModel.init(
  {
    name: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Menu',
    tableName: 'Menu'
  }
)

export default MenuModel
