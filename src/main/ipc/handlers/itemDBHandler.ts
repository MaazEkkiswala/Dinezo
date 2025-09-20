import { ipcMain } from 'electron'

// do not import that starts with 'src/...'
import ItemRepository from '../../repositories/item'

// we have to mention same channels inside /preload folder bcoz ref not allowed
const ipcChannels = {
  BULK_CREATE: 'item:bulkCreate',
  ITEM_LIST: 'item:list',
  ITEM_BY_CODE: 'item:itemByCode',
  ITEM_BY_ID: 'item:itemById'
}

export function registerItemIpc() {
  ipcMain.handle(ipcChannels.BULK_CREATE, async (_, items: any) => {
    await ItemRepository.insertItems(items)

    console.log('--------> : ', items)
    return true
  })

  ipcMain.handle(ipcChannels.ITEM_LIST, async () => {
    return await ItemRepository.getItems()
  })

  ipcMain.handle(ipcChannels.ITEM_BY_CODE, async (_, item_code: any) => {
    return await ItemRepository.getItemByCode(item_code)
  })

  ipcMain.handle(ipcChannels.ITEM_BY_ID, async (_, id: any) => {
    return await ItemRepository.getItemById(id)
  })
}
