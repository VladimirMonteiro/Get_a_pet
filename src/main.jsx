import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'


//Pages
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import Profile from './pages/user/Profile.jsx'
import MyPets from './pages/pets/MyPets.jsx'
import AddPet from './pages/pets/AddPet.jsx'
import EditPet from './pages/pets/EditPet.jsx'
import PetDetails from './pages/pets/PetDetails.jsx'
import MyAdoptions from './pages/pets/MyAdoptions.jsx'

const router = createBrowserRouter([
  {path:'/',
  element: <App/>,
  children: [
    {path: '/', element: <Home/>},
    {path: '/register', element: <Register/>},
    {path: '/login', element: <Login/>},
    {path: '/users/profile', element: <Profile/>},
    {path: '/pets/mypets', element: <MyPets/>},
    {path: '/pets/add', element: <AddPet/>},
    {path: '/pets/:id', element: <PetDetails/>},
    {path: '/pets/edit/:id', element: <EditPet/>},
    {path: 'pets/myadoptions', element: <MyAdoptions/>}
  ]
  
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
