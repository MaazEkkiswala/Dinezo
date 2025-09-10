const ipcChannels = {
  GET_ALL: 'menu:getAll',
  CREATE: 'menu:create',
  DELETE: 'menu:delete'
}

export const menuDBApis = (ipcRenderer: any) => ({
  getAll: () => ipcRenderer.invoke(ipcChannels.GET_ALL),
  create: (name: string) => ipcRenderer.invoke(ipcChannels.CREATE, name),
  delete: (id: number) => ipcRenderer.invoke(ipcChannels.DELETE, id)
})
