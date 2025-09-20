import { useEffect } from 'react'
import { RouterProvider } from 'react-router'

import DzToaster from './components/dzToaster'
import AppUtils from './helpers/appUtils'
import constants from './helpers/constants'
import routes from './routes'
import useAuthStore from './stores/auth'

function App(): React.JSX.Element {
  const { authActions } = useAuthStore()

  useEffect(() => {
    initData()
  }, [])

  const initData = () => {
    const _localAuthData = AppUtils.getValueFromStorage(constants.localstorageKey.authKey)
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
