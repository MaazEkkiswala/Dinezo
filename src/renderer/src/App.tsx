import { RouterProvider } from 'react-router'
import routes from './routes'
import DzToaster from './components/dzToaster'
import { useEffect } from 'react'
import useAuthStore from './stores/auth'
import AppUtils from './helpers/appUtils'
import constants from './helpers/constants'

// window.electron.process.versions

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const { authActions } = useAuthStore()

  useEffect(() => {
    initData();
  }, [])

  const initData = () => {
    const _localAuthData = AppUtils.getValueFromStorage(constants.localstorageKey.authKey);
    if (!_localAuthData) {
      return authActions.setIsLogin(false)
    }

    const { user, token } = JSON.parse(_localAuthData)
    authActions.setInitData({ user })
    authActions.setIsLogin(true)
    authActions.setSessionToken(token)
  }

  return (
    <>
      <RouterProvider router={routes} />

      <DzToaster />
    </>
  )
}

export default App
