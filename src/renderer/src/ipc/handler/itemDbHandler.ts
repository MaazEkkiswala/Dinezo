const ipcAPIs: any = window.api

export default class itemDbHandler {
  static async getItems() {
    return await ipcAPIs.db.item.getItems()
  }

  static async getItemById(id: number) {
    return await ipcAPIs.db.item.getItemById(id)
  }

  static async getItemByCode(item_code: number) {
    return await ipcAPIs.db.item.getItemByCode(item_code)
  }

  static async insertItems(items: any[]) {
    return await ipcAPIs.db.item.insertItems(items)
  }
}
