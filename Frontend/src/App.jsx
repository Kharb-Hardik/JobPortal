import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Shared/Navbar'
import Home from './components/Home/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Job from  './components/Job'

const approuter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/job',
    element:<Job />
  }
])

function App() {
  return (
    <div>
    <RouterProvider router={approuter} />
    </div>
  )
}

export default App
