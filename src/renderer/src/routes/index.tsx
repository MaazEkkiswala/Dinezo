import { createBrowserRouter } from 'react-router'

import DefaultLayout from '@renderer/components/layout'
import Login from '@renderer/pages/auth/login'
import Home from '@renderer/pages/home'

import ErrorBoundary from '@renderer/components/errorBoundary'
import Invoices from '@renderer/pages/invoice'
import Orders from '@renderer/pages/order'
import Tables from '@renderer/pages/table'
import Users from '@renderer/pages/user'

const routes: any = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <Home />
        // children: [ // for children for any page that have either /ID or nested page
        //   {
        //     path: '/:id',
        //     element: <></>
        //   }
        // ]
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'invoices',
        element: <Invoices />
      },
      {
        path: 'table',
        element: <Tables />
      },
      {
        path: 'user',
        element: <Users />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  }
])

export default routes
