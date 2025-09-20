import ItemModel from '../models/itemModel'

export default class ItemRepository {
  static async getItems() {
    return await ItemModel.findAll({})
  }

  static async insertItems(items: any[]) {
    return await ItemModel.bulkCreate(items)
  }

  static async getItemById(id: number) {
    return await ItemModel.findByPk(id)
  }

  static async getItemByCode(item_code: string) {
    return await ItemModel.findOne({ where: { item_code } })
  }
}
