import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { itemDBApis } from './ipc/db/item'
import { menuDBApis } from './ipc/db/menu'

const api = {
  db: {
    menu: menuDBApis(ipcRenderer),
    item: itemDBApis(ipcRenderer)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
