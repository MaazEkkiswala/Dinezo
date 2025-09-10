import { RouterProvider } from 'react-router'
import routes from './routes'

// window.electron.process.versions

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
