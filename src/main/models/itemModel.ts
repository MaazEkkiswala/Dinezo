import { DataTypes, Model } from '@sequelize/core'
import sequelize from '../configs/sequelize'

class ItemModel extends Model {}

ItemModel.init(
  {
    item_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    item_group: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock_uom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    creation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_variant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    variants: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    uom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taxable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tax_template: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tax_rate: {
      type: DataTypes.REAL, // ✅ changed from DECIMAL
      allowNull: true
    },
    standard_rate: {
      type: DataTypes.REAL, // ✅ changed from DECIMAL
      allowNull: true
    },
    taxable_amount: {
      type: DataTypes.REAL, // ✅ changed from DECIMAL
      allowNull: true
    },
    tax_amount: {
      type: DataTypes.REAL, // ✅ changed from DECIMAL
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Item',
    tableName: 'Item'
  }
)

export default ItemModel
