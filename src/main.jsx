import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Oil_Ghee from './pages/Oil_Ghee.jsx'
import Honey from './pages/Honey.jsx'
import Dates from './pages/Dates.jsx'
import Spices from './pages/Spices.jsx'
import Nuts from './pages/Nuts.jsx'
import Beverage from './pages/Beverage.jsx'
import Rice from './pages/Rice.jsx'
import Flours from './pages/Flours.jsx'
import Certified from './pages/Certified.jsx'
import Pickle from './pages/Pickle.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    Component:App
  },
  {
    path:"oil",
    Component: Oil_Ghee
  },
  {
    path:"honey",
    Component:Honey
  },
  {
    path:"dates",
    Component:Dates
  },
  {
    path:"spices",
    Component:Spices
  },
  {
    path:"nuts",
    Component:Nuts
  },
  {
    path:"beverage",
    Component:Beverage
  },
  {
    path:"rice",
    Component:Rice
  },
  {
    path:"flours",
    Component:Flours
  },
  {
    path:"certified",
    Component:Certified
  },
  {
    path:"pickle",
    Component:Pickle
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
