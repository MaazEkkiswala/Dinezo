const ipcChannels = {
  BULK_CREATE: 'item:bulkCreate',
  ITEM_LIST: 'item:list',
  ITEM_BY_CODE: 'item:itemByCode',
  ITEM_BY_ID: 'item:itemById'
}

export const itemDBApis = (ipcRenderer: any) => ({
  insertItems: (items: any[]) => ipcRenderer.invoke(ipcChannels.BULK_CREATE, items),
  getItems: () => ipcRenderer.invoke(ipcChannels.ITEM_LIST),
  getItemByCode: (item_code: string) => ipcRenderer.invoke(ipcChannels.ITEM_BY_CODE, item_code),
  getItemById: (id: string) => ipcRenderer.invoke(ipcChannels.ITEM_BY_ID, id)
})
