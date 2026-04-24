import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Oil_Ghee from './pages/Oil_Ghee.jsx'
import Honey from './pages/Honey/Honey.jsx'
import Dates from './pages/Dates/Dates.jsx'
import Spices from './pages/Spices/Spices.jsx'
import Nuts from './pages/Nuts/Nuts.jsx'
import Beverage from './pages/Beverage/Beverage.jsx'
import Rice from './pages/Rice.jsx'
import Flours from './pages/Flours/Flours.jsx'
import Certified from './pages/Certified.jsx'
import Pickle from './pages/Pickle.jsx'
import Sundar_Honey from './pages/Honey/Sundar_Honey.jsx'
import Black_Honey from './pages/Honey/Black_Honey.jsx'
import Lichu from './pages/Honey/Lichu.jsx'
import Sidr from './pages/Honey/Sidr.jsx'
import HoneyComb from './pages/Honey/HoneyComb.jsx'
import Kalmi from './pages/Dates/Kalmi.jsx'
import Medjol from './pages/Dates/Medjol.jsx'
import Sukkari from './pages/Dates/Sukkari.jsx'
import Ajwa from './pages/Dates/Ajwa.jsx'
import Mabroom from './pages/Dates/Mabroom.jsx'
import Who_Spices from './pages/Spices/Who_Spices.jsx'
import Basic_Spices from './pages/Spices/Basic_Spices.jsx'
import Mixed from './pages/Spices/Mixed.jsx'
import Nut from './pages/Nuts/Nut.jsx'
import Seeds from './pages/Nuts/Seeds.jsx'
import Tea from './pages/Beverage/Tea.jsx'
import Coffee from './pages/Beverage/Coffee.jsx'
import Flour from './pages/Flours/Flour.jsx'
import Lentils from './pages/Flours/Lentils.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    Component:App,
  },
  {
    path:"oil",
    Component: Oil_Ghee
  },
  {
    path:"honey",
    Component:Honey,
  },
  {
    path:"sundarban_hony",
    element:<Sundar_Honey/>
  },
  {
    path:"black_hony",
    element:<Black_Honey/>
  },
  {
    path:"lichu",
    element:<Lichu></Lichu>
  },
  {
    path:"sidr",
    element:<Sidr/>
  },
  {
    path:"honeycomb",
    element:<HoneyComb/>
  },
  {
    path:"dates",
    Component:Dates
  },
  {
    path:"kalmi",
    element:<Kalmi/>
  },
  {
    path:"medjool",
    Component:Medjol
  },
  {
    path:"sukkari",
    Component:Sukkari
  },
  {
    path:"ajwa",
    element:<Ajwa/>
  },
  {
    path:"mabroom",
    Component:Mabroom
  },
  {
    path:"spices",
    Component:Spices
  },
  {
    path:"whole_spices",
    Component:Who_Spices
  },
  {
    path:"basic_spices",
    Component:Basic_Spices
  },
  {
    path:"mixed_spcies",
    Component:Mixed
  },
  {
    path:"nuts",
    Component:Nuts
  },
  {
    path:"nut",
    Component:Nut
  },
  {
    path:"seeds",
    Component:Seeds
  },
  {
    path:"beverage",
    Component:Beverage
  },
  {
    path:"tea",
    Component:Tea
  },
  {
    path:"coffee",
    Component:Coffee
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
    path:"flour",
    Component:Flour
  },
  {
    path:"lentils",
    Component:Lentils
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
