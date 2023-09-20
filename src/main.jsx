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
  {path:'/Get_a_pet/',
  element: <App/>,
  children: [
    {path: '/Get_a_pet/', element: <Home/>},
    {path: '/Get_a_pet/register', element: <Register/>},
    {path: '/Get_a_pet/login', element: <Login/>},
    {path: '/Get_a_pet/users/profile', element: <Profile/>},
    {path: '/Get_a_pet/pets/mypets', element: <MyPets/>},
    {path: '/Get_a_pet/pets/add', element: <AddPet/>},
    {path: '/Get_a_pet/pets/:id', element: <PetDetails/>},
    {path: '/Get_a_pet/pets/edit/:id', element: <EditPet/>},
    {path: '/Get_a_pet/pets/myadoptions', element: <MyAdoptions/>}
  ]
  
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}>
      <App/>
   </RouterProvider>
  </React.StrictMode>,
)
