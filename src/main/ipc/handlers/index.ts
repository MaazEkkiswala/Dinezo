import { registerItemIpc } from './itemDBHandler'
import { registerMenuIpc } from './menuDBHandler'

const registerIpcHandler = () => {
  registerMenuIpc()
  registerItemIpc()
}

export default registerIpcHandler
