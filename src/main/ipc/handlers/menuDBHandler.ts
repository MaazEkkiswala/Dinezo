import { ipcMain } from 'electron'

// do not import that starts with 'src/...'
import MenuRepository from '../../repositories/menu'

// we have to mention same channels inside /preload folder bcoz ref not allowed
const ipcChannels = {
  GET_ALL: 'menu:getAll',
  CREATE: 'menu:create',
  DELETE: 'menu:delete'
}

export function registerMenuIpc() {
  ipcMain.handle(ipcChannels.GET_ALL, async () => {
    return await MenuRepository.getAllMenus()
  })

  ipcMain.handle(ipcChannels.CREATE, async (_, name: string) => {
    return await MenuRepository.createMenu(name)
  })

  ipcMain.handle(ipcChannels.DELETE, async (_, id: number) => {
    return await MenuRepository.deleteMenu(id)
  })
}
