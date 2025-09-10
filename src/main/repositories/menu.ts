import MenuModel from '../models/menuModel'

export default class MenuRepository {
  static async getAllMenus() {
    return await MenuModel.findAll({ where: { isDeleted: false } })
  }

  static async createMenu(name: string) {
    return await MenuModel.create({ name })
  }

  static async deleteMenu(id: number) {
    return await MenuModel.update({ isDeleted: true }, { where: { id } })
  }
}
