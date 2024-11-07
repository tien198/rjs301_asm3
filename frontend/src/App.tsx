import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/1Root'
import Error from './pages/2Error'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'detail/:productId',
        element: <Detail />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} fallbackElement={<FallBack />} />
}

export default App


function FallBack() {
  return <div className='text-center'>Loading ...</div>
}