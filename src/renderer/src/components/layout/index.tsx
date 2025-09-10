import { Outlet } from 'react-router'
import AuthGuard from '../guard/authGuard'
import Header from '../header'

export default function DefaultLayout() {
  return (
    <AuthGuard>
      <Header />

      <main className="bg-gray-50 flex-grow h-screen">
        <Outlet />
      </main>
    </AuthGuard>
  )
}
